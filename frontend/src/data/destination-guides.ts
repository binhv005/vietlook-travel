import type { L, LList } from './types'

/**
 * Practical guide content for each destination page: how long to stay, how to get there, things to do,
 * local food and tips. General guidance only – journey times are approximate and depend on traffic,
 * season and the route chosen; specifics are confirmed in each itinerary.
 */
export interface DestinationGuide {
  stay: L
  gettingThere: L
  experiences: LList
  food: { name: L; text: L }[]
  tips: LList
}

export const destinationGuides: Record<string, DestinationGuide> = {
  // ───────────── Regions ─────────────
  'northern-vietnam': {
    stay: { en: '7–10 days for Hanoi, Ha Long Bay, Ninh Binh and one mountain area', zh: '7–10 天，可游览河内、下龙湾、宁平及一处山区' },
    gettingThere: {
      en: 'Most trips start at Noi Bai International Airport (HAN) in Hanoi. From there, Ha Long Bay and Ninh Binh are about 2–2.5 hours by road, and Sapa about 5–6 hours by expressway.',
      zh: '大多数行程从河内内排国际机场（HAN）开始。从河内出发，乘车约 2–2.5 小时可达下龙湾和宁平，经高速公路约 5–6 小时可达沙坝。',
    },
    experiences: {
      en: [
        'Spend a night on a cruise in Ha Long Bay or Lan Ha Bay',
        'Row through caves and rice fields in Tam Coc or Trang An',
        'Trek between ethnic minority villages around Sapa',
        'Drive the mountain passes of the Ha Giang Loop',
        'Explore Hanoi’s Old Quarter on foot, by cyclo or on a food walk',
        'Visit craft villages and the tea hills of Moc Chau',
      ],
      zh: [
        '在下龙湾或兰下湾的游船上过夜',
        '在三谷或长安乘小船穿越溶洞与稻田',
        '在沙坝周边少数民族村寨之间徒步',
        '驾车穿越河江环线的高山垭口',
        '步行、乘三轮车或跟随美食漫步探索河内老城区',
        '探访手工艺村与木州茶山',
      ],
    },
    food: [
      { name: { en: 'Pho', zh: '河粉' }, text: { en: 'Hanoi’s famous beef or chicken noodle soup, usually eaten for breakfast.', zh: '河内著名的牛肉或鸡肉汤粉，通常作为早餐。' } },
      { name: { en: 'Bun cha', zh: '烤肉米线' }, text: { en: 'Grilled pork with rice vermicelli, herbs and dipping sauce.', zh: '炭烤猪肉配米线、香草与蘸汁。' } },
      { name: { en: 'Mountain goat and crispy rice', zh: '山羊肉与锅巴' }, text: { en: 'Ninh Binh’s best-known specialities.', zh: '宁平最著名的特色菜。' } },
      { name: { en: 'Thang co and grilled dishes', zh: '马肉汤与烧烤' }, text: { en: 'Hearty highland food in Sapa and Ha Giang.', zh: '沙坝与河江的山地风味。' } },
    ],
    tips: {
      en: [
        'Pack layers: the mountains can be cold from December to February even when Hanoi is mild.',
        'Cruises in Ha Long Bay can be rescheduled by the authorities in stormy weather, so keep a spare day if possible.',
        'Mountain roads are slow; allow full days for transfers to Sapa and Ha Giang.',
      ],
      zh: ['请带上多层衣物：12 月至 2 月即使河内温和，山区也可能寒冷。', '下龙湾游船在风暴天气可能被有关部门调整，尽量预留一天弹性时间。', '山路行车较慢，前往沙坝和河江请预留整天交通时间。'],
    },
  },
  'central-vietnam': {
    stay: { en: '5–7 days for Hue, Da Nang and Hoi An', zh: '5–7 天，可游览顺化、岘港与会安' },
    gettingThere: {
      en: 'Da Nang International Airport (DAD) is the main gateway, with direct flights from Hanoi, Ho Chi Minh City and several Asian cities. Hue has its own airport (HUI), and the drive between Hue and Da Nang takes about 2–3 hours.',
      zh: '岘港国际机场（DAD）是主要门户，可直飞河内、胡志明市及多个亚洲城市。顺化有富牌机场（HUI），顺化与岘港之间车程约 2–3 小时。',
    },
    experiences: {
      en: [
        'Visit the Imperial Citadel and royal tombs of Hue',
        'Drive over the Hai Van Pass between Hue and Da Nang',
        'Walk Hoi An Ancient Town as the lanterns light up',
        'Take a basket-boat ride in the Bay Mau coconut forest',
        'Explore the My Son Sanctuary ruins',
        'Relax on the beaches of Da Nang and An Bang',
      ],
      zh: ['参观顺化皇城与皇陵', '驾车翻越顺化与岘港之间的海云岭', '在灯笼亮起时漫步会安古镇', '在七母椰林乘坐簸箕船', '探访美山圣地遗址', '在岘港与安邦海滩放松'],
    },
    food: [
      { name: { en: 'Bun bo Hue', zh: '顺化牛肉粉' }, text: { en: 'Spicy beef and lemongrass noodle soup from Hue.', zh: '顺化香茅辣味牛肉米粉。' } },
      { name: { en: 'Cao lau', zh: '高楼面' }, text: { en: 'Hoi An’s chewy noodles with pork and herbs.', zh: '会安特色粗面，配猪肉与香草。' } },
      { name: { en: 'Mi Quang', zh: '广南面' }, text: { en: 'Turmeric noodles with a little rich broth, from Quang Nam.', zh: '广南省的姜黄面，配少量浓汤。' } },
      { name: { en: 'Banh mi Hoi An', zh: '会安法棍' }, text: { en: 'Some of Vietnam’s most famous sandwiches.', zh: '越南最有名的法棍三明治之一。' } },
    ],
    tips: {
      en: [
        'The central coast has its heaviest rain from about October to December; keep plans flexible in autumn.',
        'Hoi An Ancient Town requires an entrance ticket for its heritage sites.',
        'Dress modestly (shoulders and knees covered) when visiting the citadel, pagodas and tombs.',
      ],
      zh: ['中部沿海大约 10 月至 12 月降雨最多，秋季出行请保持行程弹性。', '会安古镇的遗产景点需购买门票。', '参观皇城、寺庙与陵墓时请穿着得体（遮盖肩膀和膝盖）。'],
    },
  },
  'southern-vietnam': {
    stay: { en: '5–8 days for Ho Chi Minh City, the Mekong Delta and an island or beach', zh: '5–8 天，可游览胡志明市、湄公河三角洲及一处海岛或海滩' },
    gettingThere: {
      en: 'Tan Son Nhat International Airport (SGN) in Ho Chi Minh City is the main gateway. The Mekong Delta is 2–4 hours away by road, Mui Ne about 3–4 hours, and Phu Quoc about an hour by plane.',
      zh: '胡志明市新山一国际机场（SGN）是主要门户。乘车约 2–4 小时可达湄公河三角洲，约 3–4 小时可达美奈，乘飞机约 1 小时可达富国岛。',
    },
    experiences: {
      en: [
        'See the colonial landmarks and markets of Ho Chi Minh City',
        'Visit the Cu Chi Tunnels',
        'Take a boat through the canals and orchards of the Mekong Delta',
        'Watch a floating market at dawn near Can Tho',
        'Unwind on the beaches of Phu Quoc',
        'Explore the sand dunes of Mui Ne',
      ],
      zh: ['参观胡志明市的殖民时期地标与市场', '探访古芝地道', '乘船穿行湄公河三角洲的运河与果园', '在芹苴附近清晨观看水上市场', '在富国岛海滩放松', '探索美奈沙丘'],
    },
    food: [
      { name: { en: 'Com tam', zh: '碎米饭' }, text: { en: 'Broken rice with grilled pork, a Saigon classic.', zh: '碎米饭配烤猪排，西贡经典。' } },
      { name: { en: 'Hu tieu', zh: '粿条' }, text: { en: 'Clear noodle soup popular across the south.', zh: '南部流行的清汤粿条。' } },
      { name: { en: 'Banh xeo', zh: '越南煎饼' }, text: { en: 'Crispy rice pancakes wrapped with fresh herbs.', zh: '酥脆米煎饼，配新鲜香草卷食。' } },
      { name: { en: 'Tropical fruit', zh: '热带水果' }, text: { en: 'Fresh fruit from the Mekong orchards.', zh: '来自湄公河果园的新鲜水果。' } },
    ],
    tips: {
      en: [
        'The south is warm all year; the dry season runs roughly from December to April.',
        'In the rainy season showers are usually short and in the afternoon, so plan sightseeing for the morning.',
        'Traffic in Ho Chi Minh City is heavy at rush hour; allow extra time for transfers.',
      ],
      zh: ['南部全年温暖，旱季大约从 12 月到次年 4 月。', '雨季多为午后短时阵雨，观光尽量安排在上午。', '胡志明市高峰时段交通拥堵，接送请预留更多时间。'],
    },
  },

  // ───────────── North ─────────────
  hanoi: {
    stay: { en: '2–3 days, plus day trips', zh: '2–3 天，另可安排一日游' },
    gettingThere: {
      en: 'Noi Bai International Airport (HAN) is about 45–60 minutes from the Old Quarter by car. Hanoi is also connected to the rest of the country by train and expressway.',
      zh: '内排国际机场（HAN）距老城区车程约 45–60 分钟。河内亦有铁路与高速公路通往全国各地。',
    },
    experiences: {
      en: [
        'Walk the 36 streets of the Old Quarter and Hoan Kiem Lake',
        'Visit the Temple of Literature and the Ho Chi Minh Mausoleum complex',
        'Join an evening street-food walk',
        'Watch a water puppet show',
        'Cycle around West Lake and Tran Quoc Pagoda',
        'Visit nearby craft villages such as Bat Trang pottery village',
      ],
      zh: ['漫步老城区三十六行街与还剑湖', '参观文庙与胡志明陵建筑群', '参加夜间街头美食漫步', '观看水上木偶戏', '环西湖骑行，参观镇国寺', '探访钵场陶瓷村等周边手工艺村'],
    },
    food: [
      { name: { en: 'Pho', zh: '河粉' }, text: { en: 'The city’s signature noodle soup.', zh: '河内招牌汤粉。' } },
      { name: { en: 'Bun cha', zh: '烤肉米线' }, text: { en: 'Charcoal-grilled pork with noodles and herbs.', zh: '炭烤猪肉配米线与香草。' } },
      { name: { en: 'Cha ca La Vong', zh: '罗望烤鱼' }, text: { en: 'Turmeric fish fried at the table with dill.', zh: '姜黄鱼块配莳萝，桌边现煎。' } },
      { name: { en: 'Egg coffee', zh: '鸡蛋咖啡' }, text: { en: 'Coffee topped with whipped egg-yolk cream.', zh: '咖啡上覆盖打发的蛋黄奶油。' } },
    ],
    tips: {
      en: [
        'Cross streets slowly and steadily; motorbikes will flow around you.',
        'Around Hoan Kiem Lake, streets close to traffic on weekend evenings and become a walking zone.',
        'Many museums close on Mondays; check opening days when planning.',
      ],
      zh: ['过马路时请缓慢、匀速前行，摩托车会绕行。', '周末晚上还剑湖周边道路禁止车辆通行，成为步行街。', '许多博物馆周一闭馆，规划时请确认开放日。'],
    },
  },
  'halong-bay': {
    stay: { en: '1–2 days; an overnight cruise is recommended', zh: '1–2 天，推荐过夜游船' },
    gettingThere: {
      en: 'Ha Long City is about 2–2.5 hours from Hanoi by expressway; most cruise companies offer a shuttle. Van Don International Airport (VDO) is the nearest airport.',
      zh: '下龙市距河内经高速公路约 2–2.5 小时，大多数游船公司提供接驳车。最近的机场是云屯国际机场（VDO）。',
    },
    experiences: {
      en: [
        'Cruise among thousands of limestone islands',
        'Kayak or take a bamboo boat through lagoons and floating villages',
        'Visit Sung Sot Cave or Luon Cave',
        'Climb Ti Top Island for a view over the bay',
        'Explore quieter Lan Ha Bay and Cat Ba Island',
        'Join a sunrise tai chi session on deck',
      ],
      zh: ['乘游船穿行于数千座石灰岩岛屿之间', '划皮划艇或乘竹筏穿过泻湖与水上村庄', '参观惊讶洞或鳗鱼洞', '登上天堂岛俯瞰海湾', '探访更为宁静的兰下湾与吉婆岛', '在甲板上参加日出太极'],
    },
    food: [
      { name: { en: 'Fresh seafood', zh: '新鲜海鲜' }, text: { en: 'Clams, squid and prawns served on board and in Ha Long City.', zh: '游船上和下龙市供应的蛤蜊、鱿鱼和虾。' } },
      { name: { en: 'Cha muc', zh: '墨鱼饼' }, text: { en: 'Ha Long’s famous fried squid cakes.', zh: '下龙著名的炸墨鱼饼。' } },
      { name: { en: 'Sa sung', zh: '沙虫' }, text: { en: 'A local delicacy, often grilled or in soup.', zh: '当地特产，常烤制或煮汤。' } },
    ],
    tips: {
      en: [
        'Cruise departures can be suspended by the authorities in storms, mostly in summer; we suggest alternatives if this happens.',
        'Lan Ha Bay is usually less crowded than the main Ha Long routes.',
        'Bring swimwear and a light jacket; evenings on deck can be cool in winter.',
      ],
      zh: ['风暴天气（多在夏季）游船可能被有关部门暂停，届时我们会提供替代方案。', '兰下湾通常比下龙湾主航线人少。', '请带上泳衣和薄外套，冬季甲板上的夜晚可能较凉。'],
    },
  },
  'ninh-binh': {
    stay: { en: '1–2 days; staying overnight lets you see the valleys early and late', zh: '1–2 天，过夜可在清晨与傍晚欣赏山谷' },
    gettingThere: {
      en: 'Ninh Binh is about 2 hours south of Hanoi by road (around 100 km), and can also be reached by train.',
      zh: '宁平位于河内以南约 100 公里，车程约 2 小时，也可乘火车前往。',
    },
    experiences: {
      en: [
        'Take a rowing boat through the caves of Trang An or Tam Coc',
        'Climb the steps of Mua Cave for the view over the valley',
        'Visit Hoa Lu, Vietnam’s ancient capital',
        'Cycle along quiet village lanes between karst peaks',
        'See Bai Dinh Pagoda, one of Vietnam’s largest temple complexes',
        'Spot birds at Van Long Nature Reserve or Thung Nham',
      ],
      zh: ['在长安或三谷乘小船穿越溶洞', '登上舞洞台阶俯瞰山谷', '参观越南古都华闾', '在喀斯特山峰间的乡村小路骑行', '参观越南最大的寺庙群之一——拜亭寺', '在云龙自然保护区或通岩观鸟'],
    },
    food: [
      { name: { en: 'Mountain goat', zh: '山羊肉' }, text: { en: 'Grilled, steamed or in hotpot – Ninh Binh’s signature dish.', zh: '烤、蒸或火锅——宁平招牌菜。' } },
      { name: { en: 'Com chay (crispy rice)', zh: '锅巴' }, text: { en: 'Fried rice crust with a rich meat sauce.', zh: '炸锅巴配浓郁肉酱。' } },
      { name: { en: 'Eel vermicelli', zh: '鳝鱼粉丝' }, text: { en: 'Glass noodles with seasoned eel.', zh: '粉丝配调味鳝鱼。' } },
    ],
    tips: {
      en: [
        'Late May to early June is the rice harvest; lotus ponds bloom in early summer.',
        'Start boat trips early in the morning to avoid crowds and heat.',
        'Bring a hat and water for the 500 steps of Mua Cave.',
      ],
      zh: ['5 月下旬至 6 月上旬为稻谷收获季，初夏荷花盛开。', '尽量清晨乘船，避开人潮与高温。', '攀登舞洞约 500 级台阶请带上帽子和饮用水。'],
    },
  },
  sapa: {
    stay: { en: '2–3 days', zh: '2–3 天' },
    gettingThere: {
      en: 'Sapa is about 5–6 hours from Hanoi by expressway, by private car or limousine bus. Another option is the overnight train to Lao Cai, then about one hour by road.',
      zh: '从河内经高速公路乘私家车或豪华巴士约 5–6 小时可达沙坝；也可乘夜车至老街，再乘车约 1 小时。',
    },
    experiences: {
      en: [
        'Trek through the Muong Hoa Valley to Lao Chai and Ta Van villages',
        'Visit Cat Cat Village and its waterfall',
        'Take the cable car to Fansipan, the highest peak in Indochina',
        'Stay overnight in a village homestay',
        'See Silver Waterfall and the O Quy Ho Pass',
        'Browse a highland market, such as Bac Ha on Sundays',
      ],
      zh: ['沿孟花山谷徒步至老寨与达万村', '参观猫猫村及其瀑布', '乘缆车登上印度支那最高峰番西邦', '在村寨民宿过夜', '欣赏银瀑布与哀鬼垭口', '逛高原集市，如周日的北河集市'],
    },
    food: [
      { name: { en: 'Salmon and sturgeon hotpot', zh: '三文鱼与鲟鱼火锅' }, text: { en: 'Fresh fish farmed in Sapa’s cool streams.', zh: '沙坝冷水溪流养殖的鲜鱼。' } },
      { name: { en: 'Grilled skewers', zh: '烤串' }, text: { en: 'Street-side grills that warm up cool evenings.', zh: '街边烧烤，温暖凉爽的夜晚。' } },
      { name: { en: 'Thang co', zh: '马肉汤' }, text: { en: 'A traditional Hmong stew.', zh: '赫蒙族传统炖菜。' } },
    ],
    tips: {
      en: [
        'Wear trekking shoes with grip; trails can be muddy after rain.',
        'The terraces are greenest in early summer and golden in September.',
        'Ask before photographing people in the villages.',
      ],
      zh: ['请穿防滑徒步鞋，雨后山路可能泥泞。', '梯田初夏最绿，9 月呈金黄色。', '在村寨拍摄当地人前请先征得同意。'],
    },
  },
  'ha-giang': {
    stay: { en: '3–4 days for the Ha Giang Loop', zh: '河江环线 3–4 天' },
    gettingThere: {
      en: 'Ha Giang town is about 6–7 hours from Hanoi by road. Most loop itineraries start from there, by private car with driver or with an easy-rider motorbike driver.',
      zh: '河江市距河内车程约 6–7 小时。大多数环线行程从这里出发，可乘带司机的私家车或由摩托车司机搭载。',
    },
    experiences: {
      en: [
        'Drive the Ma Pi Leng Pass above the Nho Que River',
        'Visit the Dong Van Karst Plateau Geopark',
        'See the Lung Cu Flag Tower near the northern border',
        'Explore the old town of Dong Van',
        'Visit Hoang Su Phi’s terraced rice fields',
        'Stay in a local homestay with Hmong or Dao families',
      ],
      zh: ['驾车穿越俯瞰侬河的马皮冷垭口', '游览同文喀斯特高原地质公园', '参观靠近北部边境的龙古旗台', '探访同文古镇', '欣赏黄树皮梯田', '入住赫蒙族或瑶族家庭民宿'],
    },
    food: [
      { name: { en: 'Thang co', zh: '马肉汤' }, text: { en: 'A hearty highland stew sold at weekly markets.', zh: '集市上售卖的山地炖菜。' } },
      { name: { en: 'Banh cuon Ha Giang', zh: '河江卷粉' }, text: { en: 'Steamed rice rolls served with bone broth.', zh: '蒸米卷配骨头汤。' } },
      { name: { en: 'Corn wine', zh: '玉米酒' }, text: { en: 'The local spirit, offered to guests in homestays.', zh: '当地烈酒，民宿常以此待客。' } },
    ],
    tips: {
      en: [
        'Mountain roads are narrow and winding; we recommend experienced local drivers rather than self-driving.',
        'Buckwheat flowers bloom around October–November, and the terraces turn golden in September.',
        'Nights are cold in winter; bring warm layers.',
      ],
      zh: ['山路狭窄蜿蜒，建议由经验丰富的当地司机驾驶，不建议自驾。', '荞麦花约在 10–11 月盛开，梯田 9 月呈金黄色。', '冬季夜间寒冷，请带保暖衣物。'],
    },
  },

  // ───────────── Centre ─────────────
  hue: {
    stay: { en: '2 days', zh: '2 天' },
    gettingThere: {
      en: 'Phu Bai International Airport (HUI) is about 30 minutes from the city. Hue is about 2–3 hours by road from Da Nang and Hoi An, and is a stop on the north–south railway.',
      zh: '富牌国际机场（HUI）距市区约 30 分钟。顺化距岘港和会安车程约 2–3 小时，也是南北铁路的停靠站。',
    },
    experiences: {
      en: [
        'Explore the Imperial City and Forbidden Purple City',
        'Visit the tombs of Minh Mang, Tu Duc and Khai Dinh',
        'Take a dragon boat on the Perfume River to Thien Mu Pagoda',
        'Join a royal-style dinner with traditional music',
        'Cycle to Thanh Toan tile-roofed bridge and the countryside',
        'Drive the Hai Van Pass to Da Nang',
      ],
      zh: ['游览皇城与紫禁城', '参观明命、嗣德和启定皇陵', '乘龙船沿香江前往天姥寺', '享用伴有传统音乐的宫廷宴', '骑行前往清全瓦桥与乡村', '驾车翻越海云岭前往岘港'],
    },
    food: [
      { name: { en: 'Bun bo Hue', zh: '顺化牛肉粉' }, text: { en: 'The city’s spicy beef noodle soup.', zh: '顺化辣味牛肉粉。' } },
      { name: { en: 'Banh khoai', zh: '顺化煎饼' }, text: { en: 'Small crispy pancakes with shrimp and pork.', zh: '虾肉小煎饼，口感酥脆。' } },
      { name: { en: 'Royal-style dishes', zh: '宫廷菜' }, text: { en: 'Delicately presented dishes inspired by the Nguyen court.', zh: '源自阮朝宫廷、摆盘精致的菜肴。' } },
    ],
    tips: {
      en: [
        'The tombs are spread out; a car or boat makes visiting several in one day easier.',
        'Hue is hot from May to August; plan outdoor visits for early morning.',
        'Autumn brings heavy rain and occasional flooding.',
      ],
      zh: ['皇陵分布分散，乘车或乘船一天可游览多处。', '5 月至 8 月顺化炎热，户外游览请安排在清晨。', '秋季多大雨，偶有洪水。'],
    },
  },
  'da-nang': {
    stay: { en: '2–3 days, often combined with Hoi An', zh: '2–3 天，常与会安结合' },
    gettingThere: {
      en: 'Da Nang International Airport (DAD) is only about 15 minutes from the city centre and beaches, with domestic and international flights.',
      zh: '岘港国际机场（DAD）距市中心和海滩仅约 15 分钟，有国内及国际航班。',
    },
    experiences: {
      en: [
        'Relax on My Khe Beach',
        'Visit the Marble Mountains and their cave pagodas',
        'Take the cable car to Ba Na Hills and the Golden Bridge',
        'See Linh Ung Pagoda on the Son Tra Peninsula',
        'Watch the Dragon Bridge breathe fire on weekend evenings',
        'Take a day trip to the Cham Islands',
      ],
      zh: ['在美溪海滩放松', '参观五行山及其洞中寺庙', '乘缆车登巴拿山与金桥', '参观山茶半岛灵应寺', '周末晚上观看龙桥喷火', '前往占婆岛一日游'],
    },
    food: [
      { name: { en: 'Mi Quang', zh: '广南面' }, text: { en: 'The region’s turmeric noodles.', zh: '当地姜黄面。' } },
      { name: { en: 'Banh trang cuon thit heo', zh: '猪肉米纸卷' }, text: { en: 'Pork and herbs rolled in rice paper.', zh: '米纸包猪肉与香草。' } },
      { name: { en: 'Seafood', zh: '海鲜' }, text: { en: 'Seafood restaurants line the beachfront.', zh: '海滨遍布海鲜餐厅。' } },
    ],
    tips: {
      en: [
        'Beach season is roughly February to August; the sea can be rough in autumn.',
        'Ba Na Hills is cooler than the coast; bring a light layer.',
        'Da Nang is a convenient base for both Hoi An and Hue.',
      ],
      zh: ['海滩季约为 2 月至 8 月，秋季海浪较大。', '巴拿山比沿海凉爽，请带薄外套。', '岘港是前往会安和顺化的便利据点。'],
    },
  },
  'hoi-an': {
    stay: { en: '2–3 days', zh: '2–3 天' },
    gettingThere: {
      en: 'Hoi An is about 45 minutes by road from Da Nang International Airport, and about 3 hours from Hue.',
      zh: '会安距岘港国际机场车程约 45 分钟，距顺化约 3 小时。',
    },
    experiences: {
      en: [
        'Walk the Ancient Town and the Japanese Covered Bridge',
        'Release a lantern on the Thu Bon River in the evening',
        'Ride a basket boat in the Bay Mau coconut forest',
        'Join a farming or cooking class in Tra Que village',
        'Have clothes tailored by a local tailor',
        'Visit the My Son Sanctuary',
      ],
      zh: ['漫步古镇与日本廊桥', '傍晚在秋盆河放水灯', '在七母椰林乘坐簸箕船', '在茶桥村参加农耕或烹饪课', '请当地裁缝定制衣服', '参观美山圣地'],
    },
    food: [
      { name: { en: 'Cao lau', zh: '高楼面' }, text: { en: 'Noodles found only in Hoi An.', zh: '只在会安才有的面条。' } },
      { name: { en: 'Banh mi', zh: '法棍三明治' }, text: { en: 'Hoi An’s banh mi shops are famous across Vietnam.', zh: '会安的法棍店闻名全越南。' } },
      { name: { en: 'White rose dumplings', zh: '白玫瑰' }, text: { en: 'Delicate shrimp dumplings.', zh: '精致的鲜虾饺。' } },
    ],
    tips: {
      en: [
        'The Ancient Town is closed to motor traffic at set hours and is best visited early morning or after sunset.',
        'Full-moon evenings are especially atmospheric, with lanterns and cultural performances.',
        'Allow at least two days for fittings if you have clothes tailored.',
      ],
      zh: ['古镇在规定时段禁止机动车通行，清晨或日落后游览最佳。', '每逢月圆之夜，灯笼与文化表演格外有氛围。', '如需定制衣服，请预留至少两天试穿时间。'],
    },
  },
  'nha-trang': {
    stay: { en: '3 days', zh: '3 天' },
    gettingThere: {
      en: 'Cam Ranh International Airport (CXR) is about 45 minutes from the city. Nha Trang is also on the north–south railway.',
      zh: '金兰国际机场（CXR）距市区约 45 分钟。芽庄亦是南北铁路的停靠站。',
    },
    experiences: {
      en: [
        'Take a boat trip to the islands of Nha Trang Bay',
        'Snorkel or dive around Hon Mun',
        'Visit the Po Nagar Cham Towers',
        'Relax in a mud bath or hot spring',
        'Spend a day on quieter beaches such as Doc Let',
        'See Long Son Pagoda and its white Buddha',
      ],
      zh: ['乘船游览芽庄湾诸岛', '在木岛浮潜或潜水', '参观婆那加占婆塔', '体验泥浆浴或温泉', '在度乐等较安静的海滩度过一天', '参观龙山寺及白色大佛'],
    },
    food: [
      { name: { en: 'Seafood', zh: '海鲜' }, text: { en: 'Lobster, squid and fish fresh from the bay.', zh: '海湾新鲜捕捞的龙虾、鱿鱼与鱼。' } },
      { name: { en: 'Bun cha ca', zh: '鱼饼米粉' }, text: { en: 'Noodle soup with fish cakes.', zh: '配鱼饼的米粉汤。' } },
      { name: { en: 'Nem nuong Ninh Hoa', zh: '宁和烤肉卷' }, text: { en: 'Grilled pork rolls with rice paper and herbs.', zh: '烤猪肉配米纸与香草。' } },
    ],
    tips: {
      en: [
        'The driest months are usually January to August; rain peaks in October and November.',
        'Choose a licensed boat operator for island and snorkelling trips.',
        'Mornings are the best time for clear water and calm seas.',
      ],
      zh: ['通常 1 月至 8 月最干燥，10 月和 11 月降雨最多。', '海岛与浮潜行程请选择有资质的船公司。', '早晨海水最清、海面最平静。'],
    },
  },

  // ───────────── South ─────────────
  'ho-chi-minh-city': {
    stay: { en: '2–3 days, plus day trips', zh: '2–3 天，另可安排一日游' },
    gettingThere: {
      en: 'Tan Son Nhat International Airport (SGN) is about 30–45 minutes from District 1, depending on traffic.',
      zh: '新山一国际机场（SGN）距第一郡车程约 30–45 分钟，视交通情况而定。',
    },
    experiences: {
      en: [
        'See Notre-Dame Cathedral, the Central Post Office and the Opera House',
        'Visit the War Remnants Museum and the Independence Palace',
        'Explore Ben Thanh Market and Cho Lon’s Binh Tay Market',
        'Take a day trip to the Cu Chi Tunnels',
        'Join an evening street-food tour by motorbike or on foot',
        'Enjoy the skyline from a rooftop bar',
      ],
      zh: ['参观红教堂、中心邮局与歌剧院', '参观战争遗迹博物馆与独立宫', '逛滨城市场与堤岸平西市场', '前往古芝地道一日游', '乘摩托车或步行参加夜间街头美食游', '在屋顶酒吧欣赏城市天际线'],
    },
    food: [
      { name: { en: 'Com tam', zh: '碎米饭' }, text: { en: 'Broken rice with grilled pork chop.', zh: '碎米饭配烤猪排。' } },
      { name: { en: 'Banh mi Saigon', zh: '西贡法棍' }, text: { en: 'Generously filled baguette sandwiches.', zh: '馅料丰富的法棍三明治。' } },
      { name: { en: 'Hu tieu Nam Vang', zh: '金边粿条' }, text: { en: 'Noodle soup with pork and seafood.', zh: '配猪肉与海鲜的粿条汤。' } },
      { name: { en: 'Iced coffee (ca phe sua da)', zh: '越南冰咖啡' }, text: { en: 'Strong coffee with condensed milk.', zh: '浓咖啡加炼乳。' } },
    ],
    tips: {
      en: [
        'Keep phones and bags on the side away from the road when walking.',
        'Ride-hailing apps are widely used and show the fare in advance.',
        'Afternoon showers are common from May to November; carry a light rain jacket.',
      ],
      zh: ['步行时请将手机和包放在远离马路的一侧。', '网约车应用使用广泛，可提前显示车费。', '5 月至 11 月午后常有阵雨，请随身带薄雨衣。'],
    },
  },
  'mekong-delta': {
    stay: { en: '1–2 days; an overnight stay reaches the floating markets', zh: '1–2 天，过夜可前往水上市场' },
    gettingThere: {
      en: 'My Tho and Ben Tre are about 2 hours from Ho Chi Minh City by road; Can Tho is about 3–4 hours, and also has an airport (VCA).',
      zh: '美萩和槟椥距胡志明市车程约 2 小时；芹苴约 3–4 小时，并设有机场（VCA）。',
    },
    experiences: {
      en: [
        'Take a sampan through narrow coconut-palm canals',
        'Visit the Cai Rang floating market at dawn',
        'Tour fruit orchards and family workshops making coconut candy and rice paper',
        'Cycle along quiet village paths',
        'Stay overnight in a riverside homestay',
        'Listen to traditional don ca tai tu music',
      ],
      zh: ['乘小船穿行狭窄的椰林运河', '清晨参观丐冷水上市场', '参观果园以及制作椰子糖、米纸的家庭作坊', '沿宁静的乡村小路骑行', '在河边民宿过夜', '聆听传统才子弹唱'],
    },
    food: [
      { name: { en: 'Elephant ear fish', zh: '象耳鱼' }, text: { en: 'Crispy fried fish rolled with rice paper and herbs.', zh: '炸至酥脆的鱼，配米纸与香草卷食。' } },
      { name: { en: 'Hu tieu My Tho', zh: '美萩粿条' }, text: { en: 'A clear noodle soup from My Tho.', zh: '美萩清汤粿条。' } },
      { name: { en: 'Seasonal fruit', zh: '时令水果' }, text: { en: 'Rambutan, longan, durian and more, depending on the season.', zh: '红毛丹、龙眼、榴莲等，视季节而定。' } },
    ],
    tips: {
      en: [
        'Floating markets are busiest very early, around sunrise.',
        'Bring sun protection; boats are often open to the sun.',
        'Water levels are highest around September–November, when some areas are seasonally flooded.',
      ],
      zh: ['水上市场在日出前后最热闹。', '请做好防晒，小船多为露天。', '约 9 月至 11 月水位最高，部分地区会季节性被淹。'],
    },
  },
  'phu-quoc': {
    stay: { en: '3–4 days', zh: '3–4 天' },
    gettingThere: {
      en: 'Phu Quoc International Airport (PQC) has direct flights from Hanoi, Ho Chi Minh City (about one hour) and several international cities. Ferries also run from Rach Gia and Ha Tien.',
      zh: '富国国际机场（PQC）有直飞河内、胡志明市（约 1 小时）及多个国际城市的航班，亦可从迪石和河仙乘渡轮前往。',
    },
    experiences: {
      en: [
        'Relax on Sao Beach and Long Beach',
        'Take a boat trip to the southern islands to snorkel',
        'Ride the Hon Thom cable car over the sea',
        'Watch the sunset in the west-coast fishing villages',
        'Visit a pepper farm and fish-sauce factory',
        'Explore the north of the island and Phu Quoc National Park',
      ],
      zh: ['在星沙滩与长滩放松', '乘船前往南部诸岛浮潜', '乘香岛跨海缆车', '在西海岸渔村观赏日落', '参观胡椒园与鱼露厂', '探索岛北部与富国国家公园'],
    },
    food: [
      { name: { en: 'Seafood', zh: '海鲜' }, text: { en: 'Fresh at the night market and in An Thoi.', zh: '夜市与安泰港的新鲜海鲜。' } },
      { name: { en: 'Bun quay', zh: '搅拌米粉' }, text: { en: 'Fresh noodle soup with handmade fish and shrimp paste.', zh: '配手打鱼浆虾浆的鲜米粉汤。' } },
      { name: { en: 'Goi ca trich', zh: '鲱鱼沙拉' }, text: { en: 'Raw herring salad, a local speciality.', zh: '生鲱鱼沙拉，当地特色。' } },
    ],
    tips: {
      en: [
        'The best weather is usually from November to April; the west coast sees rougher seas in the rainy season.',
        'Vietnam’s visa exemption for Phu Quoc applies only when arriving directly on the island; check the current rules for your nationality.',
        'Distances on the island are long; plan transport between north and south.',
      ],
      zh: ['通常 11 月至次年 4 月天气最好，雨季西海岸风浪较大。', '富国岛免签政策仅适用于直接抵达该岛的旅客，请根据您的国籍确认现行规定。', '岛上南北距离较远，请提前规划交通。'],
    },
  },
  'mui-ne': {
    stay: { en: '2 days', zh: '2 天' },
    gettingThere: {
      en: 'Mui Ne is about 3–4 hours from Ho Chi Minh City by expressway. Phan Thiet station is also on the railway.',
      zh: '美奈距胡志明市经高速公路约 3–4 小时，潘切站亦有火车停靠。',
    },
    experiences: {
      en: [
        'Watch sunrise over the White Sand Dunes',
        'See the Red Sand Dunes at sunset',
        'Walk up the Fairy Stream',
        'Visit the fishing village and its round basket boats',
        'Try kitesurfing in the windy season',
        'See the Po Sah Inu Cham towers',
      ],
      zh: ['在白沙丘观赏日出', '在红沙丘欣赏日落', '沿仙女溪漫步', '参观渔村及圆形簸箕船', '在风季尝试风筝冲浪', '参观波沙努占婆塔'],
    },
    food: [
      { name: { en: 'Grilled seafood', zh: '烤海鲜' }, text: { en: 'Fresh catch grilled at beachside restaurants.', zh: '海滨餐厅现烤的新鲜渔获。' } },
      { name: { en: 'Banh can', zh: '小米饼' }, text: { en: 'Small rice cakes cooked in clay moulds.', zh: '用陶模烤制的小米饼。' } },
      { name: { en: 'Dragon fruit', zh: '火龙果' }, text: { en: 'Binh Thuan province is Vietnam’s main dragon-fruit region.', zh: '平顺省是越南火龙果主产区。' } },
    ],
    tips: {
      en: [
        'Visit the dunes at sunrise or sunset to avoid the midday heat.',
        'The windy season, roughly November to April, is best for kitesurfing.',
        'Bring sunglasses and closed shoes for the dunes.',
      ],
      zh: ['在日出或日落时游览沙丘，避开正午高温。', '风季约为 11 月至次年 4 月，最适合风筝冲浪。', '游览沙丘请带墨镜并穿包脚鞋。'],
    },
  },
}
