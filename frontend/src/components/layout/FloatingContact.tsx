import { Phone } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import WeChatIcon from '@/components/ui/WeChatIcon'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import WeChatButton from './WeChatButton'

/**
 * Persistent WhatsApp / WeChat / hotline shortcuts.
 * Mobile: a slim bottom bar, so the buttons never sit on top of page content.
 * Tablet/desktop: a floating stack of round icons at the bottom right; each label slides out on hover / keyboard focus.
 */
export default function FloatingContact() {
  const { t } = useI18n()
  const pill = 'group relative isolate inline-flex h-14 items-center rounded-full px-4 text-white shadow-lg transition-colors motion-safe:animate-widget-in'
  // Halo pulses one button after another (delay i * 1s) and stops while the label is open.
  const halo = (i: number) => (
    <span
      className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-inherit group-hover:hidden group-focus-visible:hidden motion-safe:animate-halo"
      style={{ animationDelay: `${1 + i}s` }}
      aria-hidden
    />
  )
  const enter = (i: number) => ({ animationDelay: `${0.15 * i}s` })
  const label = (text: string) => (
    <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-56 group-hover:pr-1 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-56 group-focus-visible:pr-1 group-focus-visible:opacity-100">
      {text}
    </span>
  )
  const barItem = 'flex flex-1 items-center justify-center gap-1.5 text-sm font-semibold'
  return (
    <>
      <div className="fixed right-4 bottom-4 z-30 hidden flex-col items-end gap-3 md:flex print:hidden">
        <a href={site.phoneHref} aria-label={`${t.common.callUs} ${site.phone}`} className={`${pill} bg-accent-500 hover:bg-accent-600`} style={enter(0)}>
          {halo(0)}
          <Phone className="size-6 shrink-0 motion-safe:animate-ring" aria-hidden />
          {label(site.phone)}
        </a>
        <WeChatButton className={`${pill} bg-[#07c160] hover:bg-[#06a853]`} label="WeChat" style={enter(1)}>
          {halo(1)}
          <WeChatIcon className="size-6 shrink-0" aria-hidden />
          {label('WeChat')}
        </WeChatButton>
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={t.common.chatWhatsapp} className={`${pill} bg-[#1f9d55] hover:bg-[#188049]`} style={enter(2)}>
          {halo(2)}
          <WhatsAppIcon className="size-6 shrink-0" aria-hidden />
          {label(t.common.chatWhatsapp)}
        </a>
      </div>

      <nav
        aria-label={t.contact.infoTitle}
        className="fixed inset-x-0 bottom-0 z-30 flex h-14 divide-x divide-white/20 bg-brand-900 pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] md:hidden print:hidden"
      >
        <a href={site.phoneHref} className={`${barItem} bg-accent-500`} aria-label={`${t.common.callUs} ${site.phone}`}>
          <Phone className="size-4" aria-hidden /> {t.common.call}
        </a>
        <WeChatButton className={barItem} label="WeChat">
          <WeChatIcon className="size-4" aria-hidden /> WeChat
        </WeChatButton>
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${barItem} bg-[#1f9d55]`} aria-label={t.common.chatWhatsapp}>
          <WhatsAppIcon className="size-4" aria-hidden /> WhatsApp
        </a>
      </nav>
    </>
  )
}
