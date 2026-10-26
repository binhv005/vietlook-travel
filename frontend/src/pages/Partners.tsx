import { useForm } from 'react-hook-form'
import { Building2, CarFront, Handshake, Layers, Route, SlidersHorizontal, UsersRound } from 'lucide-react'
import { useI18n } from '@/i18n'
import { useSubmit } from '@/hooks/useSubmit'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { buttonClass } from '@/components/ui/Button'
import { ChoiceGroup, Chip, Field, FormAlert, Honeypot, SubmitBar } from '@/components/forms/Field'
import ContactFields, { type ContactValues } from '@/components/forms/ContactFields'
import { makeRules } from '@/components/forms/rules'

interface PartnerValues extends ContactValues {
  company: string
  website: string
  country: string
  role: string
  businessType: string
  interests: string[]
  volume: string
  message: string
}

/** Background photo per "What we offer" card, in the order of t.partners.why. */
const OFFER_IMAGES = [
  '/images/tours/old-quarter-ta-hien-1.webp',
  '/images/tours/khamphadanhthangvietnam.webp',
  '/images/cars/minivan-golf.webp',
  '/images/tours/emperor-cruises.webp',
  '/images/tours/the-best-lotus-viewing-spots-in-ninh-binh.webp',
  '/images/tours/hanoi-bicycle-sunset-tour-1.webp',
]

export default function Partners() {
  const { t, l, lang } = useI18n()
  const r = makeRules(t)
  const { submit, sending, errorMessage, honeypot } = useSubmit('partner')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<PartnerValues>({ mode: 'onTouched', defaultValues: { businessType: 'agency', interests: [], language: lang } })
  const err = (k: keyof PartnerValues) => errors[k]?.message as string | undefined
  const icons = [Building2, Route, CarFront, Layers, SlidersHorizontal, UsersRound]

  return (
    <>
      <Seo title={t.partners.eyebrow} description={t.partners.intro} path="/travel-trade-partners" image="/images/tours/hanoicitytour01daytrip.webp" />
      <PageHero
        image="/images/tours/hanoicitytour01daytrip.webp"
        imageAlt={l({ en: 'Temple gate in Hanoi', zh: '河内寺庙大门' })}
        eyebrow={t.partners.eyebrow}
        title={t.partners.title}
        text={t.partners.intro}
        crumbs={[{ label: t.nav.partners }]}
        size="lg"
      >
        <a href="#partner-form" className={buttonClass('primary', 'lg')}>
          <Handshake className="size-5" aria-hidden /> {t.home.b2bCta}
        </a>
      </PageHero>

      {/* Split layout: heading, photo and CTA held on the left; the offers as numbered tiles in two columns on the right. */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="lg:sticky lg:top-44 lg:h-fit">
            <p className="eyebrow mb-3">{t.partners.eyebrow}</p>
            <h2 className="h-section">{t.partners.whyTitle}</h2>
            <Img src="/images/tours/welcome-vietlook.webp" alt="" className="mt-8 hidden aspect-[4/3] w-full rounded-2xl object-cover shadow-lg lg:block" />
            <div className="mt-8 flex justify-center">
              <a href="#partner-form" className={buttonClass('primary', 'lg')}>
                <Handshake className="size-5" aria-hidden /> {t.home.b2bCta}
              </a>
            </div>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2">
            {t.partners.why.map((w, i) => {
              const Icon = icons[i]
              return (
                <li key={w.t} className="group relative isolate overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-lg">
                  {/* Faint photo behind each offer, a little clearer on hover; a white wash keeps the text readable. */}
                  <Img src={OFFER_IMAGES[i % OFFER_IMAGES.length]} alt="" className="absolute inset-0 -z-20 size-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-white/88 to-white/75 transition group-hover:from-white/92 group-hover:to-white/60" aria-hidden />
                  <span className="absolute top-4 right-5 font-display text-4xl font-semibold text-brand-300/80 transition group-hover:text-accent-500/70" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-xl bg-accent-50 text-accent-500 transition group-hover:bg-accent-500 group-hover:text-white">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{w.t}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{w.d}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="bg-brand-900 py-20 text-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h-section text-white">{t.partners.howTitle}</h2>
            <ol className="mt-8 space-y-6">
              {t.partners.how.map((h, i) => (
                <li key={h.t} className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sun font-bold text-brand-950">{i + 1}</span>
                  <div>
                    <h3 className="font-bold">{h.t}</h3>
                    <p className="mt-1 text-white/75">{h.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-white/60">{t.partners.note}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Img src="/images/tours/coktail-crusie.webp" alt="" className="aspect-[3/4] w-full rounded-2xl object-cover" />
            <Img src="/images/cars/van16-white.webp" alt="" className="mt-10 aspect-[3/4] w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* Paper-and-ink-hills backdrop (the site's decorative bg) behind the form card; sand base set as an arbitrary value
          so the automatic sand/mist decoration in ScrollEffects doesn't add a second photo. */}
      <section id="partner-form" className="relative isolate overflow-hidden bg-[var(--color-sand)] py-20">
        <img src="/images/bg-hills.webp" alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-bottom opacity-60 mix-blend-multiply" />
        <div className="container-x max-w-5xl">
          <form onSubmit={handleSubmit((v) => submit({ ...v, locale: lang }))} noValidate className="card relative space-y-6 p-6 md:p-10">
            <h2 className="h-section">{t.partners.formTitle}</h2>
            <Honeypot inputRef={honeypot} />
            {isSubmitted && !isValid && <FormAlert message={t.form.errSummary} />}
            <FormAlert message={errorMessage} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="pt-company" label={t.partners.company} required error={err('company')}>
                <input className="field-input" autoComplete="organization" {...register('company', r.text(150))} />
              </Field>
              <Field id="pt-website" label={t.partners.website} error={err('website')}>
                <input type="url" className="field-input" placeholder="https://" {...register('website', r.optionalText(200))} />
              </Field>
              <Field id="pt-country" label={t.partners.country} error={err('country')}>
                <input className="field-input" autoComplete="country-name" {...register('country', r.optionalText(100))} />
              </Field>
              <Field id="pt-role" label={t.partners.role} error={err('role')}>
                <input className="field-input" autoComplete="organization-title" {...register('role', r.optionalText(100))} />
              </Field>
              <Field id="pt-type" label={t.partners.businessType} error={err('businessType')} className="sm:col-span-2">
                <select className="field-input" {...register('businessType')}>
                  {(Object.keys(t.partners.businessTypes) as Array<keyof typeof t.partners.businessTypes>).map((k) => (
                    <option key={k} value={k}>
                      {t.partners.businessTypes[k]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <ChoiceGroup legend={t.partners.interests} error={err('interests')} oneLine>
              {(Object.keys(t.partners.interestOpts) as Array<keyof typeof t.partners.interestOpts>).map((k) => (
                <Chip key={k} value={k} label={t.partners.interestOpts[k]} {...register('interests')} />
              ))}
            </ChoiceGroup>
            <Field id="pt-volume" label={t.partners.volume} error={err('volume')}>
              <input className="field-input" {...register('volume', r.optionalText(200))} />
            </Field>
            <Field id="pt-message" label={t.partners.message} required error={err('message')}>
              <textarea rows={5} className="field-input" {...register('message', r.text(3000))} />
            </Field>
            <ContactFields<PartnerValues> register={register} errors={errors} idPrefix="pt" />
            <SubmitBar sending={sending} label={t.partners.submit} center />
          </form>
        </div>
      </section>
    </>
  )
}
