import type { L } from './types'

/**
 * Visa types and fast-track packages ("Quản lý loại visa, gói fast-track và
 * phí dịch vụ" in the CMS). Processing times and fees are null until Vietlook
 * confirms them; the UI then shows "Confirmed on request".
 */
export interface VisaType {
  key: string
  name: L
  description: L
  processing: L | null
  fee: string | null
}

export interface FastTrackPackage {
  key: string
  name: L
  description: L
}

export interface AirportService {
  code: string
  name: L
  packages: string[]
  fee: string | null
}

export const visaTypes: VisaType[] = [
  {
    key: 'evisa-single',
    name: { en: 'Tourist e-visa – single entry', zh: '旅游电子签证——单次入境' },
    description: { en: 'For one entry into Vietnam within the validity period shown on the visa.', zh: '在签证注明的有效期内入境越南一次。' },
    processing: null,
    fee: null,
  },
  {
    key: 'evisa-multiple',
    name: { en: 'Tourist e-visa – multiple entry', zh: '旅游电子签证——多次入境' },
    description: { en: 'For travellers leaving and re-entering Vietnam during their trip, e.g. to Cambodia or Laos.', zh: '适合行程中需出入境越南的旅客，例如往返柬埔寨或老挝。' },
    processing: null,
    fee: null,
  },
  {
    key: 'group',
    name: { en: 'Group visa support for tour programmes', zh: '旅游团队签证协助' },
    description: { en: 'Handling of group requests from travel partners with a full passenger list.', zh: '为提交完整名单的旅行社合作伙伴办理团队申请。' },
    processing: null,
    fee: null,
  },
]

export const fastTrackPackages: FastTrackPackage[] = [
  {
    key: 'arrival',
    name: { en: 'Arrival fast-track', zh: '入境快速通道' },
    description: { en: 'Meet at the arrival hall and assistance through immigration.', zh: '在入境大厅迎接，并协助办理入境手续。' },
  },
  {
    key: 'departure',
    name: { en: 'Departure fast-track', zh: '离境快速通道' },
    description: { en: 'Assistance with check-in, security and exit procedures.', zh: '协助办理值机、安检与出境手续。' },
  },
  {
    key: 'arrival-transfer',
    name: { en: 'Arrival fast-track + transfer', zh: '入境快速通道 + 接送' },
    description: { en: 'Fast-track on arrival followed by a private car to your hotel.', zh: '入境快速通道后，由私人专车送往酒店。' },
  },
]

export const airportServices: AirportService[] = [
  { code: 'HAN', name: { en: 'Hanoi – Noi Bai', zh: '河内内排' }, packages: ['arrival', 'departure', 'arrival-transfer'], fee: null },
  { code: 'SGN', name: { en: 'Ho Chi Minh City – Tan Son Nhat', zh: '胡志明市新山一' }, packages: ['arrival', 'departure', 'arrival-transfer'], fee: null },
  { code: 'DAD', name: { en: 'Da Nang', zh: '岘港' }, packages: ['arrival', 'departure', 'arrival-transfer'], fee: null },
  { code: 'CXR', name: { en: 'Nha Trang – Cam Ranh', zh: '芽庄金兰' }, packages: ['arrival', 'arrival-transfer'], fee: null },
  { code: 'PQC', name: { en: 'Phu Quoc', zh: '富国岛' }, packages: ['arrival', 'arrival-transfer'], fee: null },
]
