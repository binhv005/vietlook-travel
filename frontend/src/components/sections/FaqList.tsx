import { useState } from 'react'
import type { Faq } from '@/data/types'
import { useI18n } from '@/i18n'
import Accordion from '../ui/Accordion'

/** FAQ accordion with FAQPage structured data. */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const { l } = useI18n()
  const [open, setOpen] = useState<Set<string>>(new Set(['0']))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: l(f.q), acceptedAnswer: { '@type': 'Answer', text: l(f.a) } })),
  }
  return (
    <>
      <Accordion
        variant="plain"
        open={open}
        onToggle={(k) =>
          setOpen((s) => {
            const n = new Set(s)
            if (n.has(k)) n.delete(k)
            else n.add(k)
            return n
          })
        }
        items={faqs.map((f, i) => ({ key: String(i), title: l(f.q), content: <p className="leading-relaxed text-muted">{l(f.a)}</p> }))}
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  )
}
