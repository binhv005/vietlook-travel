import { Compass } from 'lucide-react'
import { useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  const { t, to } = useI18n()
  return (
    <>
      <Seo title={t.notFound.title} path="/404" noindex />
      <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <Compass className="size-14 text-brand-400" aria-hidden />
        <p className="mt-6 font-display text-6xl font-semibold text-brand-700">404</p>
        <h1 className="mt-3 text-2xl font-bold">{t.notFound.title}</h1>
        <p className="mt-2 max-w-md text-muted">{t.notFound.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to={to()}>{t.notFound.home}</ButtonLink>
          <ButtonLink to={to('/tours')} variant="outline">
            {t.notFound.tours}
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
