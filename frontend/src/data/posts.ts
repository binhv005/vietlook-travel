import type { Post } from './types'
import { vietlookPosts } from './posts-vietlook'
import { blogCategories, categoryFamily, getCategory } from './blogCategories'

export { blogCategories, categoryFamily, getCategory }

const img = (name: string) => `/images/tours/${name}.webp`

export const EDITOR = { en: 'Vietlook Editorial Team', zh: 'Vietlook 编辑部' }

/*
 * DEMO ARTICLES — sample guide content to demonstrate the blog templates.
 * Dates are placeholders. Replace via the CMS / import (see /data-import).
 */
export const posts: Post[] = [
  {
    slug: 'best-time-to-visit-vietnam',
    category: 'travel-tips',
    title: { en: 'When Is the Best Time to Visit Vietnam?', zh: '什么时候去越南最好？' },
    excerpt: {
      en: 'Vietnam stretches over 1,600 km, so the weather varies by region. Here is how the seasons work in the north, centre and south.',
      zh: '越南南北绵延逾 1600 公里，各地区气候差异明显。本文介绍北部、中部和南部的季节特点。',
    },
    cover: img('du-lich-tay-bac'),
    published: '2026-01-15',
    updated: '2026-09-01',
    destinations: ['northern-vietnam', 'central-vietnam', 'southern-vietnam'],
    themes: [],
    relatedTours: ['vietnam-classic-14-days', 'vietnam-grand-journey-21-days', 'northern-vietnam-highlights-7-days'],
    featured: true,
    isDemo: true,
    sections: [
      {
        heading: { en: 'Three regions, three climates', zh: '三个地区，三种气候' },
        body: {
          en: [
            'There is no single best month for the whole country. While it is cool and dry in Hanoi, it may be raining in Hoi An and hot and sunny in Ho Chi Minh City.',
            'That is good news for travellers: with a little planning, there is somewhere pleasant to visit at any time of year.',
          ],
          zh: ['越南并没有一个适合全国的最佳月份。河内凉爽干燥时，会安可能正在下雨，而胡志明市则炎热晴朗。', '这对旅客来说是好消息：只要稍加规划，一年四季都能找到气候宜人的目的地。'],
        },
      },
      {
        heading: { en: 'Northern Vietnam', zh: '越南北部' },
        body: {
          en: ['The north has four seasons. Spring and autumn are usually the most comfortable for sightseeing and cruises. Winters can be chilly, especially in the mountains around Sapa and Ha Giang.'],
          zh: ['北部四季分明。春秋两季通常最适合观光和乘坐游船。冬季较冷，沙坝和河江一带山区尤甚。'],
        },
        image: img('doi-che-moc-chau'),
      },
      {
        heading: { en: 'Central Vietnam', zh: '越南中部' },
        body: {
          en: ['The central coast is generally drier from February to August, which is the classic beach season in Da Nang and Hoi An. Autumn brings the heaviest rain.'],
          zh: ['中部沿海 2 月至 8 月通常较为干燥，是岘港和会安的传统海滩季节。秋季降雨最多。'],
        },
        image: img('hoi-an-9-copy'),
      },
      {
        heading: { en: 'Southern Vietnam', zh: '越南南部' },
        body: {
          en: ['The south is warm all year, with a dry season from around December to April and a rainy season that usually brings short afternoon showers.'],
          zh: ['南部全年温暖，旱季约为 12 月至次年 4 月，雨季通常是午后短时阵雨。'],
        },
      },
      {
        heading: { en: 'Planning a multi-region trip', zh: '规划跨区域行程' },
        body: {
          en: ['For a north-to-south journey, we adjust the order and length of each stop to the season. Tell us your travel dates and we will suggest a route that makes the most of the weather.'],
          zh: ['对于南北纵贯行程，我们会根据季节调整各站的顺序与停留时间。告诉我们您的出行日期，我们将推荐最适合当季天气的路线。'],
        },
      },
    ],
  },
  {
    slug: 'ha-long-bay-cruise-guide',
    category: 'northern-vietnam',
    title: { en: 'Choosing a Ha Long Bay Cruise: Day Trip or Overnight?', zh: '如何选择下龙湾游船：一日游还是过夜？' },
    excerpt: {
      en: 'Day cruises, one-night and two-night cruises each suit different travellers. Here is what to consider before you book.',
      zh: '一日游、一晚游和两晚游船分别适合不同旅客。预订前需要考虑以下几点。',
    },
    cover: img('tourduthuyenhalong1ngay1-2'),
    published: '2026-02-10',
    destinations: ['halong-bay', 'northern-vietnam'],
    themes: ['classic-tours'],
    relatedTours: ['halong-bay-overnight-cruise-2-days', 'northern-vietnam-highlights-7-days'],
    featured: true,
    isDemo: true,
    sections: [
      {
        heading: { en: 'Day cruises', zh: '一日游船' },
        body: {
          en: ['A day cruise is the quickest way to see the bay from Hanoi. It is a long day with several hours on the road, but suits travellers with limited time.'],
          zh: ['一日游船是从河内出发游览海湾最快捷的方式。虽然需要较长车程，但适合时间有限的旅客。'],
        },
      },
      {
        heading: { en: 'One night on board', zh: '船上一晚' },
        body: {
          en: ['An overnight cruise lets you see the bay at sunset and sunrise, when it is at its most atmospheric. Most programmes include kayaking and a cave visit.'],
          zh: ['过夜游船可以欣赏海湾最迷人的日落与日出时分。大多数行程包括皮划艇与溶洞游览。'],
        },
        image: img('coktail-crusie'),
      },
      {
        heading: { en: 'Two nights and quieter routes', zh: '两晚游船与清静航线' },
        body: {
          en: ['Longer cruises reach areas such as Lan Ha Bay that see fewer boats. They are a good choice for honeymooners and travellers who want to slow down.'],
          zh: ['较长的游船行程可前往兰夏湾等船只较少的区域，适合蜜月旅客和想放慢节奏的旅客。'],
        },
      },
    ],
  },
  {
    slug: 'ninh-binh-travel-guide',
    category: 'northern-vietnam',
    title: { en: 'Ninh Binh Travel Guide: Tam Coc, Trang An and Beyond', zh: '宁平旅游攻略：三谷、长安及更多' },
    excerpt: {
      en: 'How to spend one or two days in Ninh Binh, from boat rides to viewpoints and temples.',
      zh: '如何在宁平度过一到两天：乘船、观景台与寺庙。',
    },
    cover: img('the-best-lotus-viewing-spots-in-ninh-binh'),
    published: '2026-03-05',
    destinations: ['ninh-binh', 'northern-vietnam'],
    themes: ['photography-tours'],
    relatedTours: ['ninh-binh-day-trip', 'halong-ninh-binh-danang-hoi-an-10-days'],
    isDemo: true,
    sections: [
      {
        heading: { en: 'Tam Coc or Trang An?', zh: '三谷还是长安？' },
        body: {
          en: ['Both offer rowing-boat trips between karst peaks. Tam Coc follows a river through rice fields; Trang An passes through a series of caves and temples.'],
          zh: ['两地都提供在喀斯特山峰间乘手划船的体验。三谷沿河穿过稻田，长安则穿越一系列溶洞和庙宇。'],
        },
        image: img('tam-coc-bich-dong'),
      },
      {
        heading: { en: 'Viewpoints and temples', zh: '观景台与寺庙' },
        body: {
          en: ['Climb the steps at Mua Cave for a panoramic view, and visit the temples of Hoa Lu, Vietnam’s capital in the 10th century.'],
          zh: ['登上舞洞石阶俯瞰全景，并参观 10 世纪越南古都华闾的庙宇。'],
        },
        image: img('mua-cave'),
      },
      {
        heading: { en: 'Day trip or overnight?', zh: '一日游还是过夜？' },
        body: {
          en: ['A day trip from Hanoi covers the highlights. Staying overnight allows early-morning boat rides and cycling when it is cooler and quieter.'],
          zh: ['从河内出发的一日游即可游览精华。若住一晚，则可在清晨更凉爽、更安静时乘船或骑行。'],
        },
      },
    ],
  },
  {
    slug: 'hoi-an-travel-guide',
    category: 'central-vietnam',
    title: { en: 'Hoi An Travel Guide: Old Town, Countryside and Beaches', zh: '会安旅游攻略：古镇、乡村与海滩' },
    excerpt: {
      en: 'What to see in Hoi An’s ancient town and the villages around it, and how many days to plan.',
      zh: '会安古镇及周边村落有哪些看点，以及需要安排几天。',
    },
    cover: img('khamphavedepvietnamhuehoiansapa'),
    published: '2026-03-28',
    destinations: ['hoi-an', 'central-vietnam'],
    themes: ['culture-heritage', 'family-holidays'],
    relatedTours: ['hoi-an-countryside-day', 'central-vietnam-heritage-5-days'],
    featured: true,
    isDemo: true,
    sections: [
      {
        heading: { en: 'The ancient town', zh: '古镇' },
        body: {
          en: ['Hoi An’s old town is compact and best explored on foot. Merchant houses, assembly halls and the Japanese Bridge can be seen in a morning, leaving the evening for the lantern-lit riverside.'],
          zh: ['会安古镇小巧紧凑，最适合步行游览。一个上午即可参观古老商铺、会馆和日本桥，晚上则留给灯笼映照的河畔。'],
        },
      },
      {
        heading: { en: 'Into the countryside', zh: '走进乡村' },
        body: {
          en: ['Just outside town, Tra Que village offers hands-on gardening, and the Bay Mau coconut forest is known for basket-boat rides.'],
          zh: ['古镇外不远处，茶桂村可体验种菜，七亩椰林则以簸箕船闻名。'],
        },
        image: img('bay-mau-coconut-forest'),
      },
      {
        heading: { en: 'How long to stay', zh: '停留多久' },
        body: {
          en: ['Two or three nights allow time for the old town, a countryside experience and a visit to My Son or the beach.'],
          zh: ['安排两到三晚即可游览古镇、体验乡村，并前往美山或海滩。'],
        },
      },
    ],
  },
  {
    slug: 'getting-around-vietnam',
    category: 'transportation',
    title: { en: 'Getting Around Vietnam: Car, Train, Plane or Boat', zh: '越南出行指南：汽车、火车、飞机还是船' },
    excerpt: {
      en: 'An overview of the main ways to travel between Vietnam’s regions and when a private car makes sense.',
      zh: '越南各地区之间主要出行方式概览，以及何时适合包车。',
    },
    cover: img('du-lich'),
    published: '2026-04-12',
    destinations: [],
    themes: [],
    relatedTours: ['vietnam-classic-14-days', 'ha-giang-cao-bang-6-days'],
    featured: true,
    isDemo: true,
    sections: [
      {
        heading: { en: 'Domestic flights', zh: '国内航班' },
        body: {
          en: ['Flights connect Hanoi, Da Nang, Ho Chi Minh City, Phu Quoc and other cities, and are the practical choice for long north–south legs.'],
          zh: ['国内航班连接河内、岘港、胡志明市、富国岛等城市，是南北长途段的实用选择。'],
        },
      },
      {
        heading: { en: 'Private car with driver', zh: '包车含司机' },
        body: {
          en: ['For distances of a few hours, a private car gives flexibility to stop at viewpoints and villages along the way. It is also the most comfortable option for families and groups with luggage.'],
          zh: ['对于几小时车程的距离，包车可灵活地在沿途观景点和村落停靠，也是携带行李的家庭和团体最舒适的选择。'],
        },
        image: img('silver-waterfall-1'),
      },
      {
        heading: { en: 'Trains and boats', zh: '火车与船' },
        body: {
          en: ['The north–south railway is a scenic option on some sections. Boats are used for Ha Long Bay, the Mekong Delta and island trips.'],
          zh: ['南北铁路部分路段风景优美。乘船则用于下龙湾、湄公河三角洲和海岛游。'],
        },
      },
    ],
  },
  {
    slug: 'airport-transfers-in-vietnam',
    category: 'transportation',
    title: { en: 'Airport Transfers in Vietnam: What to Know', zh: '越南接送机须知' },
    excerpt: {
      en: 'How pre-booked airport pick-ups work and what information your driver needs.',
      zh: '预订接机服务如何运作，以及司机需要哪些信息。',
    },
    cover: img('airport-pick-up-one-way'),
    published: '2026-05-02',
    destinations: [],
    themes: [],
    relatedTours: [],
    isDemo: true,
    sections: [
      {
        heading: { en: 'Why pre-book', zh: '为什么要提前预订' },
        body: {
          en: ['After a long flight, having a driver waiting removes the need to find transport on arrival, which is especially useful for families and groups.'],
          zh: ['长途飞行后有司机等候，无需在抵达时另找交通工具，对家庭和团队尤为方便。'],
        },
      },
      {
        heading: { en: 'Information to share', zh: '需要提供的信息' },
        body: {
          en: ['Share your flight number, arrival time, number of passengers and pieces of luggage, plus the address of your hotel.'],
          zh: ['请提供航班号、抵达时间、乘客人数、行李件数以及酒店地址。'],
        },
        image: img('welcome-vietlook'),
      },
    ],
  },
  {
    slug: 'vietnamese-food-guide',
    category: 'culture-food',
    title: { en: 'A Beginner’s Guide to Vietnamese Food', zh: '越南美食入门指南' },
    excerpt: {
      en: 'From noodle soups to fresh spring rolls: dishes to look out for in each region.',
      zh: '从汤粉到鲜春卷：各地区不可错过的美食。',
    },
    cover: img('vietnamese-1'),
    published: '2026-05-20',
    destinations: ['hanoi'],
    themes: ['culture-heritage'],
    relatedTours: ['hanoi-street-food-evening', 'hoi-an-countryside-day'],
    isDemo: true,
    sections: [
      {
        heading: { en: 'Northern flavours', zh: '北部风味' },
        body: {
          en: ['Hanoi is known for clear, aromatic noodle soups and grilled pork with rice noodles. Flavours are balanced and less sweet than in the south.'],
          zh: ['河内以清香的汤粉和烤肉米线闻名，口味平衡，比南部少甜。'],
        },
        image: img('pho-chien-phong'),
      },
      {
        heading: { en: 'Central specialities', zh: '中部特色' },
        body: {
          en: ['Hue cuisine has royal origins and more chilli; Hoi An has its own noodle dishes and banh mi.'],
          zh: ['顺化菜源于宫廷，偏辣；会安则有独特的面食和法棍面包。'],
        },
      },
      {
        heading: { en: 'Southern abundance', zh: '南部丰饶' },
        body: {
          en: ['In the south, fresh herbs, tropical fruit and Mekong produce feature in many dishes.'],
          zh: ['在南部，新鲜香草、热带水果和湄公河物产出现在许多菜肴中。'],
        },
        image: img('nem-1'),
      },
    ],
  },
  {
    slug: 'mekong-delta-guide',
    category: 'southern-vietnam',
    title: { en: 'Visiting the Mekong Delta: Day Trip or Overnight', zh: '游览湄公河三角洲：一日游还是过夜' },
    excerpt: {
      en: 'What to expect on a Mekong Delta trip from Ho Chi Minh City, and why staying a night is worth it.',
      zh: '从胡志明市出发游览湄公河三角洲可以期待什么，以及为何值得住一晚。',
    },
    cover: img('dulichmientay5ngay4dem'),
    published: '2026-06-08',
    destinations: ['mekong-delta', 'southern-vietnam'],
    themes: ['culture-heritage'],
    relatedTours: ['southern-vietnam-mekong-5-days'],
    isDemo: true,
    sections: [
      {
        heading: { en: 'Life on the water', zh: '水上生活' },
        body: {
          en: ['Boats are part of everyday life in the delta, carrying produce to market and children to school.'],
          zh: ['在三角洲，船是日常生活的一部分，用来运送农产品去市场、送孩子上学。'],
        },
      },
      {
        heading: { en: 'Staying overnight', zh: '过夜体验' },
        body: {
          en: ['An overnight stay makes it possible to visit a floating market early in the morning, when it is busiest.'],
          zh: ['住一晚便可在清晨最热闹的时候前往水上市场。'],
        },
        image: img('cuc-huong'),
      },
    ],
  },
  {
    slug: 'vietnam-visa-overview',
    category: 'visa-entry',
    title: { en: 'Vietnam Visa: A General Overview for Travellers', zh: '越南签证：旅客一般须知' },
    excerpt: {
      en: 'General points to check before travelling to Vietnam. Always confirm the current rules with official sources.',
      zh: '前往越南前需要确认的一般事项。请始终以官方最新规定为准。',
    },
    cover: img('welcome-vietlook'),
    published: '2026-06-30',
    destinations: [],
    themes: [],
    relatedTours: [],
    isDemo: true,
    sections: [
      {
        heading: { en: 'Check the current rules', zh: '确认最新规定' },
        body: {
          en: [
            'Entry requirements depend on your nationality and the purpose and length of your stay, and they can change. Check the latest information from official Vietnamese government sources before you travel.',
          ],
          zh: ['入境要求取决于您的国籍、出行目的和停留时间，并可能发生变化。出行前请查阅越南政府官方渠道的最新信息。'],
        },
      },
      {
        heading: { en: 'Passport validity', zh: '护照有效期' },
        body: {
          en: ['Make sure your passport meets the validity and blank-page requirements in force at the time of travel.'],
          zh: ['请确保护照符合出行时有效期和空白页的要求。'],
        },
      },
      {
        heading: { en: 'How we can help', zh: '我们能提供的帮助' },
        body: {
          en: ['Vietlook can assist with visa requests and airport fast-track after reviewing your case. Visa decisions are made by the competent authorities.'],
          zh: ['Vietlook 在审核您的情况后，可协助办理签证申请与机场快速通道。签证审批由主管部门决定。'],
        },
      },
    ],
  },
  {
    slug: 'sapa-trekking-tips',
    category: 'northern-vietnam',
    title: { en: 'Sapa Trekking: Tips for Village Walks', zh: '沙坝徒步：村寨漫步小贴士' },
    excerpt: {
      en: 'What to pack and how to choose a trekking route around Sapa.',
      zh: '沙坝周边徒步需要带什么，以及如何选择路线。',
    },
    cover: img('tips-to-sapa-moana'),
    published: '2026-07-18',
    destinations: ['sapa', 'northern-vietnam'],
    themes: ['photography-tours', 'culture-heritage'],
    relatedTours: ['northern-vietnam-highlights-7-days', 'vietnam-grand-journey-21-days'],
    isDemo: true,
    sections: [
      {
        heading: { en: 'Choosing a route', zh: '选择路线' },
        body: {
          en: ['Routes range from short walks near town to full-day treks across the valley. Your guide can adapt the route to fitness and weather.'],
          zh: ['路线从镇附近的短途漫步到穿越山谷的全天徒步不等。导游可根据体能和天气调整路线。'],
        },
        image: img('didulichsapathang4cogidep5'),
      },
      {
        heading: { en: 'What to pack', zh: '装备清单' },
        body: {
          en: ['Comfortable walking shoes with grip, a light rain jacket and layers for cooler mornings are recommended.'],
          zh: ['建议携带防滑舒适的徒步鞋、轻便雨衣以及应对清晨凉意的衣物。'],
        },
      },
    ],
  },
]

posts.push(
  {
    slug: 'vietnam-money-currency-guide',
    category: 'money-currency',
    title: { en: 'Money in Vietnam: Dong, Cash and Cards', zh: '越南的钱：越南盾、现金与银行卡' },
    excerpt: { en: 'A practical overview of paying for things in Vietnam.', zh: '在越南付款的实用概览。' },
    cover: img('cho-dong-xuan-ha-noi'),
    published: '2026-08-02',
    destinations: [],
    themes: [],
    relatedTours: ['hanoi-street-food-evening'],
    isDemo: true,
    sections: [
      {
        heading: { en: 'The Vietnamese dong', zh: '越南盾' },
        body: {
          en: ['Vietnam’s currency is the dong (VND). Notes come in large denominations, so take a moment to check each one when paying.'],
          zh: ['越南货币为越南盾（VND）。纸币面额较大，付款时请仔细核对。'],
        },
      },
      {
        heading: { en: 'Cash or card?', zh: '现金还是刷卡？' },
        body: {
          en: ['Hotels, larger restaurants and shops in cities usually accept cards, while markets, street food and small shops are mostly cash. ATMs are common in towns and cities.'],
          zh: ['城市中的酒店、较大的餐厅和商店通常可刷卡，而市场、街头小吃和小店多以现金为主。城镇中取款机较为常见。'],
        },
      },
    ],
  },
  {
    slug: 'vietnam-sim-card-guide',
    category: 'sim-internet',
    title: { en: 'Staying Connected: SIM Cards and eSIMs in Vietnam', zh: '保持联网：越南电话卡与 eSIM' },
    excerpt: { en: 'Options for mobile data during your trip.', zh: '旅行期间的移动数据选择。' },
    cover: img('hanoi-2-2'),
    published: '2026-08-20',
    destinations: [],
    themes: [],
    relatedTours: [],
    isDemo: true,
    sections: [
      {
        heading: { en: 'Local SIM or eSIM', zh: '本地电话卡或 eSIM' },
        body: {
          en: ['Tourist SIM cards are sold at major airports and phone shops; registration requires your passport. Many phones also support eSIM plans bought before departure.'],
          zh: ['主要机场和手机店均有旅游电话卡出售，办理时需出示护照登记。许多手机也支持出发前购买的 eSIM 套餐。'],
        },
      },
      {
        heading: { en: 'Wi-Fi', zh: '无线网络' },
        body: {
          en: ['Hotels, cafés and most cruises offer Wi-Fi, though coverage at sea and in the mountains can be limited.'],
          zh: ['酒店、咖啡馆和大多数游船提供无线网络，但海上和山区信号可能有限。'],
        },
      },
    ],
  },
  {
    slug: 'staying-safe-in-vietnam',
    category: 'safety-health',
    title: { en: 'Staying Safe and Healthy in Vietnam', zh: '在越南安全健康地旅行' },
    excerpt: { en: 'Common-sense advice on traffic, belongings and health.', zh: '关于交通、财物与健康的常识性建议。' },
    cover: img('old-quarter-ta-hien-1'),
    published: '2026-09-05',
    destinations: [],
    themes: [],
    relatedTours: [],
    isDemo: true,
    sections: [
      {
        heading: { en: 'Crossing the road', zh: '过马路' },
        body: {
          en: ['Traffic in big cities is busy. Walk at a steady pace when crossing so drivers can anticipate your movement.'],
          zh: ['大城市交通繁忙。过马路时请保持匀速行走，方便司机预判。'],
        },
      },
      {
        heading: { en: 'Health and insurance', zh: '健康与保险' },
        body: {
          en: ['Drink bottled or filtered water, use sun protection and take out travel insurance before you leave. Check vaccination advice with your doctor.'],
          zh: ['饮用瓶装或过滤水，做好防晒，出发前购买旅游保险。请向医生咨询疫苗建议。'],
        },
      },
    ],
  },
  {
    slug: 'vietnam-in-october',
    category: 'vietnam-by-month',
    title: { en: 'Vietnam in October: Where to Go', zh: '十月的越南：去哪里' },
    excerpt: { en: 'Autumn in the north and what to expect in the centre and south.', zh: '北部的秋天，以及中部和南部的天气特点。' },
    cover: img('doi-che-moc-chau'),
    published: '2026-09-25',
    destinations: ['northern-vietnam', 'central-vietnam', 'southern-vietnam'],
    themes: [],
    relatedTours: ['northern-vietnam-highlights-7-days', 'ha-giang-cao-bang-6-days'],
    isDemo: true,
    sections: [
      {
        heading: { en: 'The north', zh: '北部' },
        body: {
          en: ['October is often one of the most pleasant months in Hanoi and the northern mountains, with milder temperatures.'],
          zh: ['十月通常是河内和北部山区最舒适的月份之一，气温较为温和。'],
        },
      },
      {
        heading: { en: 'The centre and south', zh: '中部与南部' },
        body: {
          en: ['The central coast can see heavy rain in autumn, so keep plans flexible. The south is nearing the end of its rainy season.'],
          zh: ['中部沿海秋季可能有强降雨，行程宜保持弹性。南部雨季则接近尾声。'],
        },
      },
    ],
  },
)

// Real articles first so they lead the featured block.
posts.unshift(...vietlookPosts)

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
export const postsByDestination = (slug: string) =>
  posts.filter((p) => p.destinations.includes(slug) || p.category === slug)
