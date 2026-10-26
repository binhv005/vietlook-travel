import type { ReactNode } from 'react'

const badges: { name: string; logo: ReactNode }[] = [
  {
    name: 'PayPal',
    logo: (
      <span className="text-[0.8rem] font-extrabold italic">
        <span className="text-[#003087]">Pay</span>
        <span className="text-[#009cde]">Pal</span>
      </span>
    ),
  },
  {
    name: 'Mastercard',
    logo: (
      <svg viewBox="0 0 32 20" className="h-5 w-8" aria-hidden>
        <circle cx="12" cy="10" r="8" fill="#eb001b" />
        <circle cx="20" cy="10" r="8" fill="#f79e1b" />
        <path d="M16 3.07a8 8 0 0 1 0 13.86 8 8 0 0 1 0-13.86z" fill="#ff5f00" />
      </svg>
    ),
  },
  {
    name: 'Visa',
    logo: <span className="text-[1rem] font-black tracking-tight text-[#1a1f71] italic">VISA</span>,
  },
  {
    name: 'Maestro',
    logo: (
      <svg viewBox="0 0 32 20" className="h-5 w-8" aria-hidden>
        <circle cx="12" cy="10" r="8" fill="#eb001b" />
        <circle cx="20" cy="10" r="8" fill="#00a2e5" />
        <path d="M16 3.07a8 8 0 0 1 0 13.86 8 8 0 0 1 0-13.86z" fill="#7375cf" />
      </svg>
    ),
  },
  {
    name: 'American Express',
    logo: (
      <span className="rounded-sm bg-[#2e77bc] px-1.5 py-1 text-[0.6rem] font-black tracking-tight text-white">AMEX</span>
    ),
  },
  {
    name: 'JCB',
    logo: (
      <span className="flex gap-px text-[0.6rem] font-black text-white">
        <span className="rounded-l-sm bg-[#0e4c96] px-1 py-1">J</span>
        <span className="bg-[#e21836] px-1 py-1">C</span>
        <span className="rounded-r-sm bg-[#00973a] px-1 py-1">B</span>
      </span>
    ),
  },
  {
    name: 'Google Pay',
    logo: (
      <span className="text-[0.8rem] font-medium text-[#5f6368]">
        <span className="font-bold text-[#4285f4]">G</span> Pay
      </span>
    ),
  },
  {
    name: 'Apple Pay',
    logo: (
      <span className="flex items-center text-[0.8rem] font-semibold text-black">
        <svg viewBox="0 0 384 512" className="mr-0.5 size-3" fill="currentColor" aria-hidden>
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        Pay
      </span>
    ),
  },
]

export default function PaymentBadges({ className = '' }: { className?: string }) {
  return (
    <ul className={`grid w-fit grid-cols-4 gap-1.5 ${className}`} aria-label="Payment methods">
      {badges.map((b) => (
        <li key={b.name} title={b.name} className="flex h-7 w-11 items-center justify-center rounded-md bg-white [&>:first-child]:scale-75">
          {b.logo}
          <span className="sr-only">{b.name}</span>
        </li>
      ))}
    </ul>
  )
}
