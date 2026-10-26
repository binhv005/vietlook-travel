import type { Faq, L, Vehicle } from './types'

const car = (name: string) => `/images/cars/${name}.webp`

/**
 * Vehicle categories ("Quản lý loại xe"). Model names and "from" prices
 * follow the layout sample provided; prices are flagged `priceIsSample`
 * and must be confirmed by Vietlook before publishing. Prices are in USD, converted
 * from the sample's VND amounts at 26,000 VND/USD and rounded. Final vehicle, luggage
 * capacity and price are confirmed in each quotation.
 */
export const vehicles: Vehicle[] = [
  {
    slug: 'sedan',
    seats: '4',
    name: { en: 'Sedan', zh: '轿车' },
    models: 'Toyota Vios, Hyundai Accent',
    priceFromUsd: 13,
    priceIsSample: true,
    suitable: { en: 'Solo travellers, couples and small families', zh: '个人、情侣与小家庭' },
    uses: { en: ['Airport transfers', 'City sightseeing', 'Short intercity trips'], zh: ['接送机', '城市观光', '短途城际'] },
    image: car('sedan-studio'),
    gallery: [car('sedan-white-1'), car('sedan-white-2')],
  },
  {
    slug: 'suv',
    seats: '7',
    name: { en: 'SUV', zh: 'SUV' },
    models: 'Toyota Innova, Mitsubishi Xpander',
    priceFromUsd: 17,
    priceIsSample: true,
    suitable: { en: 'Families and small groups', zh: '家庭与小团体' },
    uses: { en: ['Airport transfers with more luggage', 'Day trips', 'Multi-day private touring'], zh: ['行李较多的接送机', '一日游', '多日私人包车'] },
    image: car('mpv-studio'),
    gallery: [car('mpv-silver-1'), car('mpv-white-1'), car('mpv-interior'), car('minivan-premium')],
  },
  {
    slug: 'limousine',
    seats: '9',
    name: { en: 'Limousine', zh: '豪华商务车' },
    models: 'Dcar Limousine, Ford Transit Limousine',
    priceFromUsd: 38,
    priceIsSample: true,
    suitable: { en: 'VIP guests and small groups wanting extra comfort', zh: '贵宾及追求舒适的小团体' },
    uses: { en: ['VIP airport transfers', 'Intercity trips in comfort', 'Business travel'], zh: ['贵宾接送机', '舒适城际出行', '商务出行'] },
    image: car('limo-studio'),
    gallery: [car('limo-interior'), car('limo-dark')],
  },
  {
    slug: 'van',
    seats: '16',
    name: { en: 'Van', zh: '商务车' },
    models: 'Ford Transit, Hyundai Solati',
    priceFromUsd: 27,
    priceIsSample: true,
    suitable: { en: 'Small tour groups and business teams', zh: '小型旅游团与商务团队' },
    uses: { en: ['Group transfers', 'Day excursions', 'Intercity transport'], zh: ['团队接送', '一日游', '城际交通'] },
    image: car('van16-studio'),
    gallery: [car('van16-white'), car('van16-interior'), car('van16-interior-blue')],
  },
  {
    slug: '29-seat',
    seats: '29',
    name: { en: '29-seat coach', zh: '29 座中巴' },
    suitable: { en: 'Medium-sized tour groups', zh: '中型旅游团' },
    uses: { en: ['Group tours', 'Event transport', 'Intercity transfers'], zh: ['团队游', '活动用车', '城际接送'] },
    image: car('28cho'),
    gallery: [],
  },
  {
    slug: '45-seat',
    seats: '45',
    name: { en: '45-seat coach', zh: '45 座大巴' },
    models: 'Hyundai Universe, Thaco',
    suitable: { en: 'Large groups, MICE and incentive trips', zh: '大型团队、会奖旅游' },
    uses: { en: ['Large group tours', 'Conference and event transport', 'Airport group transfers'], zh: ['大型团队游', '会议及活动用车', '团队接送机'] },
    image: car('45cho'),
    gallery: [],
  },
]

/** Service areas shown on the car page ("Quản lý khu vực phục vụ"). Exact coverage is confirmed per quote. */
export const serviceAreas: { region: L; image: string; places: L[] }[] = [
  {
    region: { en: 'Northern Vietnam', zh: '越南北部' },
    image: '/images/tours/ha-long.webp',
    places: [
      { en: 'Hanoi & Noi Bai Airport', zh: '河内及内排机场' },
      { en: 'Ha Long Bay', zh: '下龙湾' },
      { en: 'Ninh Binh', zh: '宁平' },
      { en: 'Sapa', zh: '沙坝' },
      { en: 'Ha Giang & Cao Bang', zh: '河江与高平' },
    ],
  },
  {
    region: { en: 'Central Vietnam', zh: '越南中部' },
    image: '/images/tours/hoi-an-9-copy.webp',
    places: [
      { en: 'Hue', zh: '顺化' },
      { en: 'Da Nang & airport', zh: '岘港及机场' },
      { en: 'Hoi An', zh: '会安' },
      { en: 'Nha Trang & Cam Ranh', zh: '芽庄与金兰' },
    ],
  },
  {
    region: { en: 'Southern Vietnam', zh: '越南南部' },
    image: '/images/tours/phu-quoc.webp',
    places: [
      { en: 'Ho Chi Minh City & Tan Son Nhat', zh: '胡志明市及新山一机场' },
      { en: 'Mekong Delta', zh: '湄公河三角洲' },
      { en: 'Mui Ne', zh: '美奈' },
      { en: 'Phu Quoc', zh: '富国岛' },
    ],
  },
]

export const carServices = [
  { key: 'airport', image: car('minivan-golf') },
  { key: 'daily', image: car('mpv-silver-2') },
  { key: 'intercity', image: car('road-hero') },
  { key: 'groups', image: car('van16-white') },
] as const

export const carFaqs: Faq[] = [
  {
    q: { en: 'How do I get a quote for a private car?', zh: '如何获取包车报价？' },
    a: {
      en: 'Send us the quote form with your route, dates, number of passengers and luggage. We reply with available vehicles and a quotation.',
      zh: '请填写报价表，注明路线、日期、乘客人数和行李数量。我们会回复可用车型及报价。',
    },
  },
  {
    q: { en: 'Can you meet me at the airport?', zh: '可以接机吗？' },
    a: {
      en: 'Yes. Include your flight number and arrival time in the form so the pick-up can be planned around your arrival.',
      zh: '可以。请在表单中填写航班号与抵达时间，以便根据您的到达时间安排接机。',
    },
  },
  {
    q: { en: 'Are the drivers tour guides?', zh: '司机是导游吗？' },
    a: {
      en: 'Drivers focus on driving. If you need commentary or help at sites, ask for a guide to be added to your quote.',
      zh: '司机专注于驾驶。如需讲解或景点陪同，请在询价时要求增加导游。',
    },
  },
  {
    q: { en: 'Which vehicle should I choose?', zh: '我该选择哪种车型？' },
    a: {
      en: 'It depends on passengers and luggage. If you are unsure, select “Not sure” and we will recommend a suitable vehicle.',
      zh: '这取决于乘客和行李数量。如不确定，请选择“不确定”，我们会为您推荐合适的车型。',
    },
  },
  {
    q: { en: 'Can I add stops on an intercity trip?', zh: '城际行程可以中途停靠吗？' },
    a: {
      en: 'Yes. Add the stops in the quote form; they are reflected in the itinerary and the quotation.',
      zh: '可以。请在报价表中添加停靠点，我们会在行程与报价中体现。',
    },
  },
]

export const visaFaqs: Faq[] = [
  {
    q: { en: 'Can you guarantee my visa?', zh: '你们能保证签证一定获批吗？' },
    a: {
      en: 'No. Visa decisions are made by the Vietnamese authorities. We help you prepare and submit requests according to the current rules.',
      zh: '不能。签证由越南主管部门审批。我们协助您按照现行规定准备并提交申请。',
    },
  },
  {
    q: { en: 'How long does a visa take?', zh: '签证需要多长时间？' },
    a: {
      en: 'Processing times are set by the authorities and can change. We will advise the current expected timing when you contact us; please apply well before travel.',
      zh: '办理时间由主管部门决定，并可能调整。联系我们时会告知当前预计时间，请务必提前申请。',
    },
  },
  {
    q: { en: 'What is airport fast-track?', zh: '什么是机场快速通道？' },
    a: {
      en: 'A staff member meets you at the airport and assists you through arrival procedures. Availability depends on the airport and your flight.',
      zh: '工作人员在机场迎接，并协助您办理入境手续。是否可提供取决于机场和您的航班。',
    },
  },
  {
    q: { en: 'Can you help groups?', zh: '可以为团队办理吗？' },
    a: {
      en: 'Yes. Travel partners can send group requests with the full passenger list for review.',
      zh: '可以。旅行社合作伙伴可提交团队申请及完整名单供我们审核。',
    },
  },
]
