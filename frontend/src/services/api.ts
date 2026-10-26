/**
 * Form submission service.
 *
 * - With VITE_API_URL set, requests are POSTed to `${VITE_API_URL}/api/requests/:kind`
 *   and the server is expected to answer `{ reference: string }` (201).
 * - Without it (frontend-only phase), requests are saved to localStorage so the
 *   confirmation flow can be tested end to end. The UI states this clearly.
 *
 * A request is only reported as successful once it has actually been stored.
 */

export type RequestKind = 'booking' | 'tailor' | 'car' | 'visa' | 'contact' | 'partner'

export interface StoredRequest {
  reference: string
  kind: RequestKind
  createdAt: string
  status: 'new'
  data: Record<string, unknown>
}

export type SubmitErrorCode = 'network' | 'duplicate' | 'spam' | 'server'

export class SubmitError extends Error {
  code: SubmitErrorCode
  constructor(code: SubmitErrorCode) {
    super(code)
    this.code = code
  }
}

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
export const isDemoMode = !API_URL

const STORAGE_KEY = 'vietlook:requests'
const PREFIX: Record<RequestKind, string> = { booking: 'BK', tailor: 'TM', car: 'CQ', visa: 'VF', contact: 'CT', partner: 'PT' }
/** Minimum time a human needs to fill a form; faster submissions are treated as bots. */
const MIN_FILL_MS = 2500
const DUPLICATE_WINDOW_MS = 60_000

const recent = new Map<string, number>()

function makeReference(kind: RequestKind) {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, '0')
  return `VL-${PREFIX[kind]}-${ymd}-${rand}`
}

function readAll(): StoredRequest[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as StoredRequest[]
  } catch {
    return []
  }
}

export function getStoredRequest(reference: string): StoredRequest | undefined {
  return readAll().find((r) => r.reference === reference)
}

interface Guard {
  /** Timestamp when the form was first rendered. */
  startedAt: number
  /** Value of the hidden honeypot field; must be empty. */
  honeypot?: string
}

export async function submitRequest(kind: RequestKind, data: Record<string, unknown>, guard: Guard): Promise<{ reference: string }> {
  if (guard.honeypot || Date.now() - guard.startedAt < MIN_FILL_MS) throw new SubmitError('spam')

  const fingerprint = `${kind}:${JSON.stringify(data)}`
  const last = recent.get(fingerprint)
  if (last && Date.now() - last < DUPLICATE_WINDOW_MS) throw new SubmitError('duplicate')

  let reference: string
  if (API_URL) {
    let res: Response
    try {
      res = await fetch(`${API_URL}/api/requests/${kind}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {
      throw new SubmitError('network')
    }
    if (res.status === 429) throw new SubmitError('duplicate')
    if (!res.ok) throw new SubmitError('server')
    const body = (await res.json().catch(() => null)) as { reference?: string } | null
    if (!body?.reference) throw new SubmitError('server')
    reference = body.reference
  } else {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new SubmitError('network')
    await new Promise((r) => setTimeout(r, 700))
    reference = makeReference(kind)
    const entry: StoredRequest = { reference, kind, createdAt: new Date().toISOString(), status: 'new', data }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...readAll(), entry]))
    } catch {
      throw new SubmitError('server')
    }
    // Only report success once the record can be read back.
    if (!getStoredRequest(reference)) throw new SubmitError('server')
  }

  recent.set(fingerprint, Date.now())
  return { reference }
}
