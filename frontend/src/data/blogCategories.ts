import type { BlogCategory } from './types'

// Kept apart from posts.ts so the site menu can list categories without pulling every article into the main bundle.

/** Multi-level guide categories. `parent` builds the tree (e.g. Destinations › Northern Vietnam). */
export const blogCategories: BlogCategory[] = [
  { slug: 'destinations', name: { en: 'Destinations', zh: '目的地' }, description: { en: 'Region and city guides across Vietnam.', zh: '越南各地区与城市攻略。' } },
  { slug: 'northern-vietnam', parent: 'destinations', name: { en: 'Northern Vietnam', zh: '越南北部' }, description: { en: 'Hanoi, Ha Long Bay, Ninh Binh, Sapa and the far north.', zh: '河内、下龙湾、宁平、沙坝及最北部地区。' } },
  { slug: 'central-vietnam', parent: 'destinations', name: { en: 'Central Vietnam', zh: '越南中部' }, description: { en: 'Hue, Da Nang, Hoi An and Nha Trang.', zh: '顺化、岘港、会安与芽庄。' } },
  { slug: 'southern-vietnam', parent: 'destinations', name: { en: 'Southern Vietnam', zh: '越南南部' }, description: { en: 'Ho Chi Minh City, the Mekong Delta and the islands.', zh: '胡志明市、湄公河三角洲与海岛。' } },
  { slug: 'essential-guide', name: { en: 'Essential Guide', zh: '必备指南' }, description: { en: 'What to know before you go: visa, money, SIM cards, safety and practical tips.', zh: '出行前须知：签证、货币、电话卡、安全与实用贴士。' } },
  { slug: 'visa-entry', parent: 'essential-guide', name: { en: 'Visa & Entry', zh: '签证与入境' }, description: { en: 'General information on visas and arrival.', zh: '签证与入境的一般信息。' } },
  { slug: 'money-currency', parent: 'essential-guide', name: { en: 'Money & Currency', zh: '货币与支付' }, description: { en: 'Vietnamese dong, cash, cards and ATMs.', zh: '越南盾、现金、银行卡与取款机。' } },
  { slug: 'sim-internet', parent: 'essential-guide', name: { en: 'SIM Cards & Internet', zh: '电话卡与网络' }, description: { en: 'Staying connected while travelling in Vietnam.', zh: '在越南旅行期间保持联网。' } },
  { slug: 'safety-health', parent: 'essential-guide', name: { en: 'Safety & Health', zh: '安全与健康' }, description: { en: 'Practical advice for a safe and healthy trip.', zh: '安全健康出行的实用建议。' } },
  { slug: 'travel-tips', parent: 'essential-guide', name: { en: 'Travel Tips', zh: '旅行贴士' }, description: { en: 'Practical advice for planning a trip to Vietnam.', zh: '规划越南之旅的实用建议。' } },
  { slug: 'vietnam-by-month', name: { en: 'Vietnam by Month', zh: '越南月度指南' }, description: { en: 'Where to go and what to expect in each month of the year.', zh: '一年中每个月适合去哪里、有什么值得期待。' } },
  { slug: 'transportation', name: { en: 'Transportation', zh: '交通出行' }, description: { en: 'Getting around Vietnam by car, train, plane and boat.', zh: '乘车、火车、飞机与船在越南出行。' } },
  { slug: 'culture-food', name: { en: 'Culture & Food', zh: '文化与美食' }, description: { en: 'Customs, festivals and Vietnamese cuisine.', zh: '风俗、节庆与越南美食。' } },
]

export const getCategory = (slug: string) => blogCategories.find((c) => c.slug === slug)
/** A category plus all of its descendants. */
export const categoryFamily = (slug: string): string[] => [
  slug,
  ...blogCategories.filter((c) => c.parent === slug).flatMap((c) => categoryFamily(c.slug)),
]
