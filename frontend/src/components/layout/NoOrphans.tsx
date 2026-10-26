import { useEffect } from 'react'

/**
 * Keeps a single word from wrapping onto its own last line.
 * CSS does this where supported (`text-wrap: balance` / `pretty`, see index.css). For browsers without
 * `text-wrap: pretty` (e.g. Firefox), the last space of each text block is turned into a non-breaking
 * space so the final word always travels with the one before it.
 */
const BLOCKS = 'h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, blockquote, td, th, label, legend, summary'
const NBSP = ' '
// Only glue short endings; very long final words are left free to wrap.
const MAX_TAIL = 14

function lastTextNode(el: Element): Text | null {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
  })
  let last: Text | null = null
  while (walker.nextNode()) last = walker.currentNode as Text
  return last
}

function glue(root: ParentNode) {
  root.querySelectorAll(BLOCKS).forEach((el) => {
    if (el.closest('[contenteditable], input, textarea, select, svg')) return
    const node = lastTextNode(el)
    const text = node?.nodeValue
    if (!node || !text) return
    const trimmed = text.replace(/\s+$/, '')
    const i = trimmed.lastIndexOf(' ')
    // Needs at least two words in this text node, and a short last word.
    if (i <= 0 || trimmed.length - i - 1 > MAX_TAIL || !trimmed.slice(0, i).trim()) return
    node.nodeValue = trimmed.slice(0, i) + NBSP + trimmed.slice(i + 1) + text.slice(trimmed.length)
  })
}

export default function NoOrphans() {
  useEffect(() => {
    if (typeof CSS !== 'undefined' && CSS.supports('text-wrap', 'pretty')) return
    let frame = 0
    const run = () => {
      frame = 0
      glue(document.body)
    }
    // Re-run when React renders new content (route changes, filters, language switch).
    const mo = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(run)
    })
    run()
    mo.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
    }
  }, [])
  return null
}
