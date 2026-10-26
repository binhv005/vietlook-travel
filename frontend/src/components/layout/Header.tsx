import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Facebook, Menu, Phone, Users } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import LanguageSwitcher from './LanguageSwitcher'
import MobileMenu from './MobileMenu'
import WeChatButton from './WeChatButton'
import { buildNav, type NavItem } from './navigation'
import { buttonClass } from '../ui/Button'
import { useHasHeaderOverlay } from '@/lib/headerOverlay'

export default function Header() {
  const { t, l, to } = useI18n()
  const nav = useMemo(() => buildNav(t, l), [t, l])
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const closeTimer = useRef<number | undefined>(undefined)
  const hasHero = useHasHeaderOverlay()

  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const enter = (key: string) => {
    window.clearTimeout(closeTimer.current)
    setOpen(key)
  }
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 120)
  }

  // On pages with a full-bleed hero the main bar floats transparently over it until the visitor scrolls or opens a menu.
  const overHero = hasHero && !scrolled && !open && !mobile
  const navTone = overHero ? 'text-white' : 'text-ink'

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${overHero ? 'bg-transparent' : 'bg-white'} ${scrolled ? 'shadow-[0_4px_20px_rgba(15,40,70,0.08)]' : ''}`}
    >
      <a href="#main" className="sr-only z-50 rounded bg-brand-700 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2">
        {t.nav.skip}
      </a>

      {/* Top bar */}
      <div className="hidden bg-brand-900 text-white md:block">
        <div className="container-x flex h-10 max-w-[96rem] items-center justify-between text-sm">
          <div className="flex items-center gap-5">
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/85 hover:text-white">
              <WhatsAppIcon className="size-4" aria-hidden /> WhatsApp {site.phone}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-1.5 text-white/85 hover:text-white">
              <Phone className="size-4" aria-hidden /> {t.common.callUs}
            </a>
            <WeChatButton className="flex items-center gap-1.5 text-white/85 hover:text-white" />
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/85 hover:text-white" aria-label="Facebook">
              <Facebook className="size-4" aria-hidden /> Facebook
            </a>
          </div>
          <div className="flex items-center gap-5">
            <Link to={to('/travel-trade-partners')} className="flex items-center gap-1.5 font-semibold text-sun hover:text-white">
              <Users className="size-4" aria-hidden /> {t.nav.partners}
            </Link>
            <LanguageSwitcher tone="light" />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={`relative border-b transition-colors duration-300 ${overHero ? 'border-white/15' : 'border-line'}`}>
        <div className="container-x flex h-24 max-w-[96rem] items-center justify-between gap-3 sm:h-28 sm:gap-4 2xl:gap-6">
          <Link to={to()} className="flex shrink-0 items-center gap-2" aria-label={site.name}>
            <img src={site.logo} alt={site.name} width={545} height={340} className="h-20 w-auto sm:h-24" />
          </Link>

          <nav aria-label="Main" className="hidden min-w-0 xl:block">
            <ul className="flex items-center whitespace-nowrap">
              {nav.map((item) => (
                <li key={item.key} onMouseEnter={() => item.panel && enter(item.key)} onMouseLeave={leave} className="static">
                  {item.panel ? (
                    <button
                      type="button"
                      aria-expanded={open === item.key}
                      aria-controls={`panel-${item.key}`}
                      onClick={() => setOpen(open === item.key ? null : item.key)}
                      className={`flex items-center gap-0.5 rounded-md px-2 py-2 text-[0.88rem] font-semibold 2xl:gap-1 2xl:px-3 2xl:text-[0.95rem] transition hover:text-brand-600 ${
                        location.pathname.startsWith(to(item.path)) ? 'text-brand-600' : navTone
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`size-4 transition-transform ${open === item.key ? 'rotate-180' : ''}`} aria-hidden />
                    </button>
                  ) : (
                    <NavLink
                      to={to(item.path)}
                      className={({ isActive }) => `block rounded-md px-2 py-2 text-[0.88rem] font-semibold 2xl:px-3 2xl:text-[0.95rem] transition hover:text-brand-600 ${isActive ? 'text-brand-600' : navTone}`}
                    >
                      {item.label}
                    </NavLink>
                  )}
                  {item.panel && open === item.key && <Panel item={item} />}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-3">
            <div className="md:hidden">
              <LanguageSwitcher tone={overHero ? 'light' : 'dark'} />
            </div>
            {/* Wrapper owns the visibility: `hidden` on the link itself loses to the button's `inline-flex`. */}
            <div className="hidden md:block">
              <Link to={to('/tailor-made-tour')} className={buttonClass('primary', 'md')}>
                {t.nav.plan}
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobile(true)}
              className={`inline-flex size-11 items-center justify-center rounded-full border xl:hidden ${overHero ? 'border-white/40 text-white' : 'border-line text-ink'}`}
              aria-label={t.nav.menu}
              aria-expanded={mobile}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobile} onClose={() => setMobile(false)} nav={nav} />
    </header>
  )
}

function Panel({ item }: { item: NavItem }) {
  const { to } = useI18n()
  const panel = item.panel!
  if (panel.kind === 'list') {
    return (
      <div id={`panel-${item.key}`} className="absolute top-full z-30 mt-px min-w-64 animate-fade-up rounded-b-xl border border-line bg-white p-2 shadow-xl">
        {panel.columns[0].links.map((ln) => (
          <Link key={ln.path} to={to(ln.path)} className="block rounded-lg px-4 py-2.5 text-[0.93rem] font-medium text-ink hover:bg-brand-50 hover:text-brand-700">
            {ln.label}
          </Link>
        ))}
      </div>
    )
  }
  return (
    <div id={`panel-${item.key}`} className="absolute inset-x-0 top-full z-30 animate-fade-up border-t border-line bg-white whitespace-normal shadow-2xl">
      {/* Never taller than the space left below the header; scrolls inside on short screens. */}
      <div className="container-x max-h-[calc(100dvh-170px)] overflow-y-auto overscroll-contain py-6">
        {panel.kind === 'tiles' ? (
          // Image tiles with the theme name centred on top (Aurora-style tour styles menu).
          <div className="grid grid-cols-4 gap-2.5">
            {panel.columns[0].links.map((ln) => (
              <Link key={ln.path} to={to(ln.path)} className="group relative flex aspect-[2/1] items-center justify-center overflow-hidden rounded-md">
                <img src={ln.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute inset-0 bg-black/35 transition group-hover:bg-black/50" aria-hidden />
                <span className="relative px-3 text-center text-base leading-tight font-bold tracking-wide text-balance text-white uppercase [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] xl:text-lg">
                  {ln.label}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`grid gap-8 ${panel.columns.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
            {panel.columns.map((col, i) => (
              <div key={i}>
                {col.image && (
                  <Link to={to(col.path ?? item.path)} className="mb-4 block overflow-hidden rounded-xl">
                    <img src={col.image} alt="" loading="lazy" className="aspect-[16/7] max-h-36 w-full object-cover transition duration-500 hover:scale-105" />
                  </Link>
                )}
                {col.title &&
                  (col.path ? (
                    <Link to={to(col.path)} className="mb-3 block text-xs font-bold tracking-[0.14em] text-accent-500 uppercase hover:underline">
                      {col.title}
                    </Link>
                  ) : (
                    <p className="mb-3 text-xs font-bold tracking-[0.14em] text-accent-500 uppercase">{col.title}</p>
                  ))}
                <ul className={col.image && col.links.length > 4 ? 'grid grid-cols-2 gap-x-4' : 'space-y-1'}>
                  {col.links.map((ln) => (
                    <li key={ln.path}>
                      <Link to={to(ln.path)} className="block py-1 text-[0.93rem] text-ink hover:text-brand-700">
                        {ln.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
