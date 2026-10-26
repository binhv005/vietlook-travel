import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { useI18n } from '@/i18n'
import { Field } from './Field'
import { makeRules } from './rules'

export interface ContactValues {
  name: string
  email: string
  whatsapp: string
  language: 'en' | 'zh' | 'other'
}

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  idPrefix: string
  withLanguage?: boolean
}

/** Name / email / WhatsApp / language block reused by every request form. Only name and WhatsApp are required. */
export default function ContactFields<T extends FieldValues & ContactValues>({ register, errors, idPrefix, withLanguage = true }: Props<T>) {
  const { t } = useI18n()
  const r = makeRules(t)
  const err = (k: keyof ContactValues) => errors[k]?.message as string | undefined
  const p = (k: keyof ContactValues) => k as Path<T>
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id={`${idPrefix}-name`} label={t.form.name} required error={err('name')} className="sm:col-span-2">
        <input className="field-input" autoComplete="name" {...register(p('name'), r.text(120))} />
      </Field>
      <Field id={`${idPrefix}-email`} label={t.form.email} error={err('email')}>
        <input type="email" className="field-input" autoComplete="email" inputMode="email" {...register(p('email'), r.optionalEmail)} />
      </Field>
      <Field id={`${idPrefix}-whatsapp`} label={t.form.whatsapp} required error={err('whatsapp')}>
        <input type="tel" className="field-input" autoComplete="tel" inputMode="tel" placeholder="+44 20 1234 5678" {...register(p('whatsapp'), r.phone)} />
      </Field>
      {withLanguage && (
        <Field id={`${idPrefix}-language`} label={t.form.language} error={err('language')} className="sm:col-span-2">
          <select className="field-input" {...register(p('language'))}>
            {(Object.keys(t.form.languages) as Array<keyof typeof t.form.languages>).map((k) => (
              <option key={k} value={k}>
                {t.form.languages[k]}
              </option>
            ))}
          </select>
        </Field>
      )}
    </div>
  )
}
