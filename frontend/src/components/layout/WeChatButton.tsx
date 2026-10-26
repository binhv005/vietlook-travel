import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Phone, X } from 'lucide-react'
import WeChatIcon from '@/components/ui/WeChatIcon'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'

/**
 * WeChat has no universal web link, so the button opens a dialog with the
 * WeChat ID / QR code. Until Vietlook supplies them, the dialog says so and
 * offers WhatsApp and hotline instead — never a dead button.
 */
export default function WeChatButton({ className, children, label, style }: { className: string; children?: ReactNode; label?: string; style?: CSSProperties }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} style={style} aria-haspopup="dialog" aria-label={label}>
        {children ?? (
          <>
            <WeChatIcon className="size-4" aria-hidden /> WeChat
          </>
        )}
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="wechat-title">
          <div className="absolute inset-0 bg-brand-950/60" onClick={() => setOpen(false)} aria-hidden />
          <div className="relative w-full max-w-sm animate-fade-up rounded-2xl bg-white p-6 text-center text-ink shadow-2xl">
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full hover:bg-slate-100" aria-label={t.common.close}>
              <X className="size-5" aria-hidden />
            </button>
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-[#07c160] text-white">
              <WeChatIcon className="size-7" aria-hidden />
            </span>
            <h2 id="wechat-title" className="mt-4 text-xl font-bold">
              {t.common.wechatTitle}
            </h2>
            {site.wechatId ? (
              <>
                {site.wechatQr && <img src={site.wechatQr} alt="WeChat QR" className="mx-auto mt-4 size-44 rounded-lg border border-line" />}
                <p className="mt-4 text-sm text-muted">{t.common.wechatId}</p>
                <p className="font-mono text-lg font-bold select-all">{site.wechatId}</p>
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.common.wechatPending}</p>
            )}
            <div className="mt-6 grid grid-cols-2 gap-2">
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1f9d55] px-3 py-2.5 text-sm font-semibold text-white">
                <WhatsAppIcon className="size-4" aria-hidden /> WhatsApp
              </a>
              <a href={site.phoneHref} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line px-3 py-2.5 text-sm font-semibold">
                <Phone className="size-4" aria-hidden /> {t.common.call}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
