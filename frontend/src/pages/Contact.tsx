import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, ExternalLink, Lock, Mail, MapPin, Phone, Star } from 'lucide-react'
import WeChatIcon from '@/components/ui/WeChatIcon'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import WeChatButton from '@/components/layout/WeChatButton'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import { useSubmit } from '@/hooks/useSubmit'
import Seo from '@/components/ui/Seo'
import Img from '@/components/ui/Img'
import PageIntro from '@/components/sections/PageIntro'
import { ButtonLink } from '@/components/ui/Button'
import { Field, FormAlert, Honeypot, SubmitBar } from '@/components/forms/Field'
import ContactFields, { type ContactValues } from '@/components/forms/ContactFields'
import { makeRules } from '@/components/forms/rules'

interface ContactFormValues extends ContactValues {
  heardFrom: string[]
  message: string
}

export default function Contact() {
  const { t, lang, to } = useI18n()
  const c = t.contact
  const r = makeRules(t)
  const { submit, sending, errorMessage, honeypot } = useSubmit('contact')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<ContactFormValues>({ mode: 'onTouched', defaultValues: { language: lang, heardFrom: [] } })


  return (
    <>
      <Seo title={c.title} description={c.intro} path="/contact" />
      <PageIntro crumbs={[{ label: t.nav.contact }]} title={c.title} intro={c.intro} image="/images/tours/hanoi-12.webp" />

      <div className="bg-mist">
        <div className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="card">
            <div className="bg-brand-700 px-6 py-4 text-white md:px-8">
              <h2 className="text-lg font-bold tracking-wide uppercase">{c.aboutYou}</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/80">
                <Lock className="size-3.5" aria-hidden /> {c.keptPrivate}
              </p>
            </div>

            <form onSubmit={handleSubmit((v) => submit({ ...v, subject: 'tour', locale: lang }))} noValidate className="relative space-y-6 p-6 md:p-8">
              <Honeypot inputRef={honeypot} />
              {isSubmitted && !isValid && <FormAlert message={t.form.errSummary} />}
              <FormAlert message={errorMessage} />
              <ContactFields<ContactFormValues> register={register} errors={errors} idPrefix="ct" withLanguage={false} />
              <fieldset>
                <legend className="field-label">
                  {c.heardFrom} <span className="ml-1 text-xs font-normal text-muted">({t.form.optional})</span>
                </legend>
                <div className="mt-1 grid gap-x-4 gap-y-2.5 sm:grid-cols-3">
                  {(Object.keys(c.heardOptions) as Array<keyof typeof c.heardOptions>).map((k) => (
                    <label key={k} className="flex cursor-pointer items-center gap-2 text-[0.95rem]">
                      <input type="checkbox" value={k} className="size-4 accent-brand-600" {...register('heardFrom')} />
                      {c.heardOptions[k]}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-4">
                <Field id="ct-message" label={c.message} required error={errors.message?.message}>
                  <textarea rows={8} className="field-input" {...register('message', r.text(3000))} />
                </Field>
                <div className="rounded-xl bg-brand-50 p-4 text-sm">
                  <p className="font-bold text-brand-800">{c.suggestions}</p>
                  <ul className="mt-2 grid list-disc gap-x-8 gap-y-1.5 pl-5 text-muted marker:text-brand-500 sm:grid-cols-2">
                    {c.suggestionList.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <SubmitBar sending={sending} label={c.submit} center />
            </form>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-32">
            <div className="card p-6">
              <h2 className="text-lg font-bold">{c.noFormTitle}</h2>
              <p className="mt-1 text-sm text-muted">{c.noFormText}</p>
              <ul className="mt-4 space-y-3 text-[0.95rem]">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-brand-600" aria-hidden />
                  <a href={site.phoneHref} className="font-semibold hover:text-brand-700">
                    {site.phone}
                  </a>
                </li>
                {site.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-brand-600" aria-hidden />
                    <a href={`mailto:${site.email}`} className="font-semibold break-all hover:text-brand-700">
                      {site.email}
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <WeChatIcon className="size-4 shrink-0 text-brand-600" aria-hidden />
                  <WeChatButton className="font-semibold hover:text-brand-700">{site.wechatId ?? t.common.wechatTitle}</WeChatButton>
                </li>
                <li className="flex items-start gap-3 text-muted">
                  <Clock className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                  {c.hours}
                </li>
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <ButtonLink href={site.whatsappHref} variant="whatsapp" size="sm">
                  <WhatsAppIcon className="size-4" aria-hidden /> WhatsApp
                </ButtonLink>
                <ButtonLink href={site.phoneHref} variant="outline" size="sm">
                  <Phone className="size-4" aria-hidden /> {t.common.call}
                </ButtonLink>
              </div>
            </div>

            <div className="card overflow-hidden">
              <iframe title={c.address} src={site.mapsEmbed} className="aspect-[4/3] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="p-5">
                <p className="flex gap-2 text-sm">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden /> {site.address[lang]}
                </p>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline">
                  {c.map} <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>

            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 p-5 transition hover:shadow-md">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-sun/20 text-amber-500">
                <Star className="size-6 fill-current" aria-hidden />
              </span>
              <span>
                <span className="block font-bold">{c.reviewsTitle}</span>
                <span className="block text-sm text-muted">{c.reviewsText}</span>
              </span>
            </a>

            <Link to={to('/travel-trade-partners')} className="group relative isolate block overflow-hidden rounded-2xl bg-brand-900 p-6 text-white">
              <Img src="/images/tours/welcome-vietlook.webp" alt="" className="absolute inset-0 -z-10 size-full object-cover object-[50%_30%] transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/95 via-brand-900/80 to-brand-900/55" aria-hidden />
              <h3 className="pt-16 font-bold">{c.b2bTitle}</h3>
              <p className="mt-1 text-sm text-white/75">{c.b2bText}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-sun">
                {t.home.b2bCta} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </aside>
        </div>
      </div>
    </>
  )
}
