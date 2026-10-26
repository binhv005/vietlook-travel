import { Phone } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import WeChatIcon from '@/components/ui/WeChatIcon'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import WeChatButton from './WeChatButton'

/**
 * Persistent WhatsApp / WeChat / hotline shortcuts.
 * A floating stack of round icons at the bottom right (slightly smaller on phones); each label slides out on hover / keyboard focus.
 */
export default function FloatingContact() {
  const { t } = useI18n()
  const pill = 'group relative isolate inline-flex h-11 items-center rounded-full px-2.5 md:h-14 md:px-4 text-white shadow-lg transition-colors motion-safe:animate-widget-in'
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
  return (
    <div className="fixed right-2 bottom-3 z-30 flex flex-col items-end gap-2 md:right-4 md:bottom-4 md:gap-3 print:hidden">
      <a href={site.phoneHref} aria-label={`${t.common.callUs} ${site.phone}`} className={`${pill} bg-accent-500 hover:bg-accent-600`} style={enter(0)}>
        {halo(0)}
        <Phone className="size-6 shrink-0 max-md:size-5 motion-safe:animate-ring" aria-hidden />
        {label(site.phone)}
      </a>
      <WeChatButton className={`${pill} bg-[#07c160] hover:bg-[#06a853]`} label="WeChat" style={enter(1)}>
        {halo(1)}
        <WeChatIcon className="size-6 shrink-0 max-md:size-5" aria-hidden />
        {label('WeChat')}
      </WeChatButton>
      <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={t.common.chatWhatsapp} className={`${pill} bg-[#1f9d55] hover:bg-[#188049]`} style={enter(2)}>
        {halo(2)}
        <WhatsAppIcon className="size-6 shrink-0 max-md:size-5" aria-hidden />
        {label(t.common.chatWhatsapp)}
      </a>
    </div>
  )
}
