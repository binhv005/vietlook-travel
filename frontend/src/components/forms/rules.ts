import type { RegisterOptions } from 'react-hook-form'
import type { Dict } from '@/i18n/en'
import { fmt } from '@/i18n'

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_RE = /^\+?[0-9][0-9\s\-().]{6,19}$/

export const todayISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Localised validation rules shared by every form (mirrored server-side when the API is added). */
export function makeRules(t: Dict) {
  const required = { value: true, message: t.form.errRequired }
  return {
    required: { required } satisfies RegisterOptions,
    text: (max = 200) => ({ required, maxLength: { value: max, message: fmt(t.form.errMax, { n: max }) } }) satisfies RegisterOptions,
    optionalText: (max = 2000) => ({ maxLength: { value: max, message: fmt(t.form.errMax, { n: max }) } }) satisfies RegisterOptions,
    email: { required, pattern: { value: EMAIL_RE, message: t.form.errEmail } } satisfies RegisterOptions,
    optionalEmail: { pattern: { value: EMAIL_RE, message: t.form.errEmail } } satisfies RegisterOptions,
    phone: { required, pattern: { value: PHONE_RE, message: t.form.errPhone } } satisfies RegisterOptions,
    int: (min: number, max: number, isRequired = true) =>
      ({
        ...(isRequired ? { required } : {}),
        valueAsNumber: true,
        min: { value: min, message: fmt(t.form.errMin, { n: min }) },
        max: { value: max, message: fmt(t.form.errMax, { n: max }) },
      }) satisfies RegisterOptions,
    futureDate: (isRequired = true) =>
      ({
        ...(isRequired ? { required } : {}),
        validate: (v: string) => !v || v >= todayISO() || t.form.errDate,
      }) satisfies RegisterOptions,
  }
}
