import type { TourTheme } from './types'

const img = (name: string) => `/images/tours/${name}.webp`
/** Large (1440–1600px) destination photos, sharp even on the big home-page tile and full-width theme banners. */
const large = (name: string) => `/images/hero/${name}.webp`

/**
 * Tour styles (8): Luxury, Signature, Cultural, Family, Honeymoon, Classic, Photography, Tailor-made
 * (Cao cấp, Tuyển chọn, Văn hóa, Gia đình, Trăng mật, Kinh điển, Nhiếp ảnh, Thiết kế riêng).
 * Slugs that existed before are kept so their URLs keep working.
 */
export const themes: TourTheme[] = [
  {
    slug: 'luxury-private-tours',
    name: { en: 'Luxury Tours', zh: '高端之旅' },
    short: { en: 'Private guides, cars and hand-picked hotels', zh: '私人导游、专车与精选酒店' },
    intro: {
      en: [
        'Luxury tours are built entirely around your schedule, with a dedicated guide and car, upscale hotels and resorts, and experiences arranged privately for you.',
        'Hotel categories, cabins and services are agreed with you and confirmed in each quotation.',
      ],
      zh: [
        '高端之旅完全依照您的时间安排，配备专属导游与车辆，入住高档酒店与度假村，并为您私人安排各项体验。',
        '酒店等级、舱位与服务均与您商定，并在每份报价中确认。',
      ],
    },
    image: large('phu-quoc'),
    seo: {
      title: { en: 'Luxury Tours in Vietnam', zh: '越南高端之旅' },
      description: { en: 'Private luxury journeys across Vietnam with dedicated guides, cars and upscale hotels.', zh: '越南全境私人高端之旅，配备专属导游、专车与高档酒店。' },
    },
  },
  {
    slug: 'signature-tours',
    name: { en: 'Signature Tours', zh: '精选之旅' },
    short: { en: 'Our hand-picked, most-requested programmes', zh: '我们精心挑选、最受欢迎的行程' },
    intro: {
      en: [
        'Signature tours are the programmes our team recommends most often: well-paced routes that combine Vietnam’s highlights with experiences we know travellers remember.',
        'Each one is a proven starting point that can be adjusted to your dates, group and hotel category.',
      ],
      zh: [
        '精选之旅是我们团队最常推荐的行程：节奏合理，将越南精华与旅客难忘的体验相结合。',
        '每条线路都是成熟的起点，可根据您的日期、人数与酒店等级进行调整。',
      ],
    },
    image: large('halong-bay'),
    seo: {
      title: { en: 'Signature Vietnam Tours', zh: '越南精选之旅' },
      description: { en: 'Hand-picked Vietnam itineraries recommended by our local team.', zh: '由我们本地团队推荐的越南精选行程。' },
    },
  },
  {
    slug: 'culture-heritage',
    name: { en: 'Cultural Tours', zh: '文化之旅' },
    short: { en: 'Heritage sites, craft villages and local life', zh: '遗产古迹、手工艺村与在地生活' },
    intro: {
      en: [
        'Vietnam’s history is visible in its citadels, temples, old towns and craft villages, and in everyday life at markets and family kitchens. Cultural tours are built around these places, with local guides who can explain what you see.',
        'Itineraries can focus on one region or follow the country from Hanoi to Hue, Hoi An and Ho Chi Minh City.',
      ],
      zh: [
        '越南的历史体现在皇城、寺庙、古镇与手工艺村中，也体现在市场与家庭厨房的日常生活里。文化之旅围绕这些地方设计，并由能深入讲解的当地导游陪同。',
        '行程可专注于某一地区，也可从河内一路经顺化、会安到胡志明市。',
      ],
    },
    image: large('hue'),
    seo: {
      title: { en: 'Cultural Tours in Vietnam', zh: '越南文化之旅' },
      description: { en: 'Heritage, craft villages and local life tours across Vietnam.', zh: '越南遗产古迹、手工艺村与在地生活之旅。' },
    },
  },
  {
    slug: 'family-holidays',
    name: { en: 'Family Tours', zh: '家庭之旅' },
    short: { en: 'Easy pacing and hands-on activities', zh: '节奏轻松，互动体验丰富' },
    intro: {
      en: [
        'Family itineraries balance sightseeing with free time, shorter transfers and activities children enjoy, such as basket-boat rides, farming experiences and beach days.',
        'Tell us the ages of your children and we will suggest a suitable pace and accommodation.',
      ],
      zh: [
        '家庭行程在观光与自由时间之间取得平衡，减少长途车程，并安排孩子们喜爱的活动，如簸箕船、农耕体验和海滩时光。',
        '请告诉我们孩子的年龄，我们会推荐合适的节奏与住宿。',
      ],
    },
    image: large('hoi-an'),
    seo: {
      title: { en: 'Family Tours in Vietnam', zh: '越南家庭之旅' },
      description: { en: 'Family-friendly Vietnam itineraries with easy pacing.', zh: '节奏轻松的越南家庭行程。' },
    },
  },
  {
    slug: 'honeymoon',
    name: { en: 'Honeymoon Tours', zh: '蜜月之旅' },
    short: { en: 'Cruises, old towns and island sunsets', zh: '游船、古镇与海岛落日' },
    intro: {
      en: [
        'Honeymoon itineraries combine a night on Ha Long Bay, lantern-lit evenings in Hoi An and quiet beach time on the islands.',
        'We can arrange private transfers and special touches on request, subject to availability.',
      ],
      zh: [
        '蜜月行程结合下龙湾游船之夜、会安灯笼之夜以及海岛上的静谧海滩时光。',
        '如有需要，我们可安排私人接送及特别惊喜，视供应情况而定。',
      ],
    },
    image: img('sunset-1'),
    seo: {
      title: { en: 'Honeymoon Tours in Vietnam', zh: '越南蜜月之旅' },
      description: { en: 'Romantic Vietnam itineraries for couples and honeymooners.', zh: '为情侣与蜜月旅客打造的越南浪漫行程。' },
    },
  },
  {
    slug: 'classic-tours',
    name: { en: 'Classic Tours', zh: '经典之旅' },
    short: { en: 'Vietnam’s essential sights, north to south', zh: '由北至南的越南必游景点' },
    intro: {
      en: [
        'Classic tours cover the places most first-time visitors want to see: Hanoi, Ha Long Bay, Ninh Binh, Hue, Hoi An, Ho Chi Minh City and the Mekong Delta.',
        'They are a good choice for a first trip to Vietnam and can be shortened, extended or combined with a beach stay.',
      ],
      zh: [
        '经典之旅涵盖大多数首次到访的旅客最想去的地方：河内、下龙湾、宁平、顺化、会安、胡志明市与湄公河三角洲。',
        '适合首次到访越南，可缩短、延长或结合海滩度假。',
      ],
    },
    image: large('ninh-binh'),
    seo: {
      title: { en: 'Classic Vietnam Tours', zh: '越南经典之旅' },
      description: { en: 'Classic Vietnam itineraries covering the country’s essential sights.', zh: '涵盖越南必游景点的经典行程。' },
    },
  },
  {
    slug: 'photography-tours',
    name: { en: 'Photography Tours', zh: '摄影之旅' },
    short: { en: 'Rice terraces, karst landscapes and golden light', zh: '梯田、喀斯特地貌与黄金光线' },
    intro: {
      en: [
        'Photography tours are timed for the light and the seasons: rice terraces in Ha Giang and Mu Cang Chai, karst scenery in Ninh Binh, markets at dawn and lantern-lit streets after dark.',
        'We plan early starts, viewpoints and enough time at each stop, and can arrange a guide who knows the best angles.',
      ],
      zh: [
        '摄影之旅依据光线与季节安排：河江与木江界的梯田、宁平的喀斯特风光、清晨的集市以及夜晚的灯笼街道。',
        '我们会安排清晨出发、观景点及充足的停留时间，并可安排熟悉最佳拍摄角度的导游。',
      ],
    },
    image: large('ha-giang'),
    seo: {
      title: { en: 'Photography Tours in Vietnam', zh: '越南摄影之旅' },
      description: { en: 'Vietnam tours planned for photographers: landscapes, people and light.', zh: '为摄影爱好者规划的越南行程：风光、人文与光影。' },
    },
  },
  {
    slug: 'tailor-made',
    name: { en: 'Tailor-made Tours', zh: '私人定制之旅' },
    short: { en: 'Your trip, designed around you', zh: '为您量身设计的旅程' },
    intro: {
      en: [
        'Tailor-made tours start from a blank page: tell us your dates, interests, budget and travel style, and our team designs a route, hotels and experiences around them.',
        'The programmes below are examples we often adapt. Send us your ideas through the tailor-made form and we will reply with a proposal.',
      ],
      zh: [
        '私人定制之旅从零开始：告诉我们您的日期、兴趣、预算与旅行方式，我们的团队会据此设计路线、酒店与体验。',
        '以下行程是我们经常调整的示例。请通过定制表单发送您的想法，我们将回复行程建议。',
      ],
    },
    image: img('lonely-tree'),
    seo: {
      title: { en: 'Tailor-made Tours in Vietnam', zh: '越南私人定制之旅' },
      description: { en: 'Private Vietnam tours designed around your dates, interests and budget.', zh: '根据您的日期、兴趣与预算设计的越南私人行程。' },
    },
  },
]

/** Theme slugs that were merged into the current styles; old URLs redirect to these. */
export const legacyThemes: Record<string, string> = {
  'nature-adventure': 'photography-tours',
  'food-culinary': 'culture-heritage',
  cruises: 'classic-tours',
  'local-life': 'culture-heritage',
}

export const getTheme = (slug: string) => themes.find((t) => t.slug === slug)
