import { cloneElement, isValidElement, type ComponentProps, type ReactElement, type ReactNode, type RefObject } from 'react'
import { AlertCircle, Loader2, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n'

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: ReactElement<Record<string, unknown>>
}

/** Label + control + hint/error, wiring ids and aria attributes onto the child control. */
export function Field({ id, label, error, hint, required, className = '', children }: FieldProps) {
  const { t } = useI18n()
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  const control = isValidElement(children)
    ? cloneElement(children, { id, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': describedBy, 'aria-required': required || undefined })
    : children
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="ml-0.5 text-accent-500" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted">({t.form.optional})</span>
        )}
      </label>
      {control}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

/** Group of checkboxes / radios rendered as selectable chips. */
/** `oneLine`: keep the chips on a single row from md up (the container must be wide enough for them). */
export function ChoiceGroup({ legend, error, hint, required, oneLine, children }: { legend: string; error?: string; hint?: string; required?: boolean; oneLine?: boolean; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="field-label">
        {legend}
        {required && (
          <span className="ml-0.5 text-accent-500" aria-hidden>
            *
          </span>
        )}
      </legend>
      {hint && <p className="-mt-1 mb-2 text-sm text-muted">{hint}</p>}
      <div className={`flex flex-wrap gap-2 ${oneLine ? 'md:flex-nowrap' : ''}`}>{children}</div>
      {error && <p className="field-error">{error}</p>}
    </fieldset>
  )
}

export function Chip({ type = 'checkbox', label, ...input }: { type?: 'checkbox' | 'radio'; label: string } & ComponentProps<'input'>) {
  return (
    <label className="cursor-pointer">
      <input type={type} className="peer sr-only" {...input} />
      <span className="inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-sm whitespace-nowrap font-medium text-ink transition peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500 hover:border-brand-400">
        {label}
      </span>
    </label>
  )
}

/** Hidden field that real users never fill. */
export function Honeypot({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input ref={inputRef} type="text" name="website_url" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

export function FormAlert({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div role="alert" className="flex gap-3 rounded-lg border border-accent-100 bg-accent-50 p-4 text-sm text-accent-700">
      <AlertCircle className="size-5 shrink-0" aria-hidden />
      <p>{message}</p>
    </div>
  )
}

export function SubmitBar({ sending, label, center = true }: { sending: boolean; label: string; center?: boolean }) {
  const { t, to } = useI18n()
  return (
    <div className={`space-y-4${center ? ' text-center' : ''}`}>
      <button
        type="submit"
        disabled={sending}
        aria-busy={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-accent-600 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {sending ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {sending ? t.form.sending : label}
      </button>
      <p className="text-sm text-muted">
        {t.form.privacy}{' '}
        <Link to={to('/privacy-policy')} className="font-medium text-brand-700 underline">
          {t.form.privacyLink}
        </Link>
      </p>
    </div>
  )
}
