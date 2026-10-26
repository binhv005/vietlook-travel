import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitRequest, SubmitError, type RequestKind, type SubmitErrorCode } from '@/services/api'
import { useI18n } from '@/i18n'

/** Shared submit flow: guards, sending state, error mapping and redirect to the confirmation page. */
export function useSubmit(kind: RequestKind) {
  const navigate = useNavigate()
  const { to, t } = useI18n()
  const startedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<SubmitErrorCode | null>(null)

  const messages: Record<SubmitErrorCode, string> = {
    network: t.form.errNetwork,
    duplicate: t.form.errDuplicate,
    spam: t.form.errSpam,
    server: t.form.errServer,
  }

  async function submit(data: Record<string, unknown>) {
    if (sending) return
    setSending(true)
    setError(null)
    try {
      const { reference } = await submitRequest(kind, data, { startedAt: startedAt.current, honeypot: honeypot.current?.value })
      navigate(to(`/request-received/${reference}`))
    } catch (e) {
      setError(e instanceof SubmitError ? e.code : 'server')
      // Allow a retry after a spam-timing rejection.
      startedAt.current = Date.now() - 2500
    } finally {
      setSending(false)
    }
  }

  return { submit, sending, error, errorMessage: error ? messages[error] : null, honeypot }
}
