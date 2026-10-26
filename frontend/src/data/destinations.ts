import type { Destination, RegionSlug } from './types'

const img = (name: string) => `/images/tours/${name}.webp`

export const destinations: Destination[] = [
  // ───────────── Regions ─────────────
  {
    slug: 'northern-vietnam',
    kind: 'region',
    name: { en: 'Northern Vietnam', zh: '越南北部' },
    tagline: {
      en: 'Limestone bays, terraced mountains and a thousand-year-old capital',
      zh: '石灰岩海湾、梯田山脉与千年古都',
    },
    intro: {
      en: [
        'Northern Vietnam combines the country’s capital, Hanoi, with some of its most photographed landscapes: the karst seascapes of Ha Long Bay, the river valleys of Ninh Binh and the terraced highlands around Sapa and Ha Giang.',
        'For partners and private travellers, the north works well as a stand-alone week or as the starting point of a longer north-to-south journey. Distances are manageable by private car, and overnight cruises or mountain homestays add variety to an itinerary.',
      ],
      zh: [
        '越南北部既有首都河内，也有越南最具代表性的自然风光：下龙湾的喀斯特海景、宁平的河谷田园，以及沙坝、河江一带的高山梯田。',
        '无论是旅行社合作伙伴还是私人旅客，北部都适合作为一周的独立行程，或作为纵贯南北长线行程的起点。私家车即可轻松串联各地，过夜游船与山区民宿也能为行程增添层次。',
      ],
    },
    hero: img('cao-bang'),
    image: img('didulichsapathang4cogidep5'),
    highlights: [
      {
        name: { en: 'Ha Long Bay', zh: '下龙湾' },
        text: { en: 'Thousands of limestone islets best seen from a day or overnight cruise.', zh: '数千座石灰岩小岛，最适合乘坐一日或过夜游船欣赏。' },
        image: img('ha-long'),
      },
      {
        name: { en: 'Ninh Binh', zh: '宁平' },
        text: { en: 'Rowing boats through caves and rice fields between karst peaks.', zh: '乘小船穿行于溶洞与稻田之间，四周群峰环绕。' },
        image: img('tam-coc'),
      },
      {
        name: { en: 'Sapa & Ha Giang', zh: '沙坝与河江' },
        text: { en: 'Mountain passes, terraced valleys and ethnic minority villages.', zh: '高山垭口、层层梯田与少数民族村落。' },
        image: img('hoang-su-phi-ha-giang'),
      },
      {
        name: { en: 'Hanoi Old Quarter', zh: '河内老城区' },
        text: { en: 'Lakes, temples and street food in the capital.', zh: '首都的湖泊、寺庙与街头美食。' },
        image: img('old-quarter-ta-hien-1'),
      },
    ],
    bestTime: {
      en: 'Spring (March–April) and autumn (September–November) usually bring mild, drier weather. Winters can be cool in the mountains; summers are hot with more rain.',
      zh: '春季（3–4 月）与秋季（9–11 月）通常气候温和、较为干燥。山区冬季偏冷，夏季炎热多雨。',
    },
    seo: {
      title: { en: 'Northern Vietnam Tours & Travel Guide', zh: '越南北部旅游线路与攻略' },
      description: {
        en: 'Plan tailor-made tours in Northern Vietnam: Hanoi, Ha Long Bay, Ninh Binh, Sapa and Ha Giang with a local operator.',
        zh: '与本地地接社一起定制越南北部行程：河内、下龙湾、宁平、沙坝与河江。',
      },
    },
  },
  {
    slug: 'central-vietnam',
    kind: 'region',
    name: { en: 'Central Vietnam', zh: '越南中部' },
    tagline: { en: 'Imperial heritage, lantern-lit old towns and long sandy beaches', zh: '皇城遗产、灯笼古镇与绵长沙滩' },
    intro: {
      en: [
        'Central Vietnam is where history and coastline meet. The former imperial capital of Hue, the trading port of Hoi An and the modern city of Da Nang sit within a short drive of each other.',
        'The region suits culture-focused programmes, family holidays and beach extensions alike, and is easily linked to the north or south by domestic flight.',
      ],
      zh: [
        '越南中部是历史与海岸线交汇之地。昔日皇城顺化、古老商港会安与现代都市岘港彼此车程不远。',
        '这里既适合以文化为主题的行程，也适合亲子度假和海滨延伸游，并可通过国内航班便捷连接北部或南部。',
      ],
    },
    hero: img('hue-tour'),
    image: img('hoi-an-9-copy'),
    highlights: [
      {
        name: { en: 'Hue Imperial City', zh: '顺化皇城' },
        text: { en: 'Citadel, royal tombs and the Perfume River.', zh: '皇城、帝陵与香江。' },
        image: img('imperial-citadel'),
      },
      {
        name: { en: 'Hoi An Ancient Town', zh: '会安古镇' },
        text: { en: 'Merchant houses, lantern streets and nearby craft villages.', zh: '古老商铺、灯笼街巷与周边手工艺村。' },
        image: img('khamphavedepvietnamhuehoiansapa'),
      },
      {
        name: { en: 'Da Nang', zh: '岘港' },
        text: { en: 'Beaches, the Marble Mountains and the Ba Na Hills.', zh: '海滩、五行山与巴拿山。' },
        image: img('da-nang'),
      },
      {
        name: { en: 'My Son Sanctuary', zh: '美山圣地' },
        text: { en: 'Ruined Cham temples in a jungle valley near Hoi An.', zh: '会安附近丛林山谷中的占婆寺庙遗址。' },
        image: img('my-son-holy-land-1'),
      },
    ],
    bestTime: {
      en: 'February to August is generally the drier period on the central coast. Heavier rain is common from about October to December.',
      zh: '中部沿海 2 月至 8 月通常较为干燥，10 月至 12 月前后降雨较多。',
    },
    seo: {
      title: { en: 'Central Vietnam Tours: Hue, Da Nang, Hoi An', zh: '越南中部线路：顺化、岘港、会安' },
      description: {
        en: 'Tailor-made Central Vietnam itineraries covering Hue, Da Nang, Hoi An and Nha Trang, organised by a local tour operator.',
        zh: '由本地地接社打造的越南中部定制行程，涵盖顺化、岘港、会安与芽庄。',
      },
    },
  },
  {
    slug: 'southern-vietnam',
    kind: 'region',
    name: { en: 'Southern Vietnam', zh: '越南南部' },
    tagline: { en: 'A dynamic city, the Mekong Delta and tropical islands', zh: '活力都市、湄公河三角洲与热带海岛' },
    intro: {
      en: [
        'Southern Vietnam is anchored by Ho Chi Minh City, the country’s largest and busiest city. A short drive away, the waterways and orchards of the Mekong Delta show a slower side of daily life.',
        'Island and coastal stays on Phu Quoc or in Mui Ne make the south a natural place to end a longer journey.',
      ],
      zh: [
        '越南南部以越南最大、最繁忙的城市胡志明市为中心。驱车不远即可抵达湄公河三角洲，水道纵横、果园遍布，展现另一种悠闲的生活节奏。',
        '富国岛或美奈的海岛与海滨住宿，让南部成为长线行程的理想终点。',
      ],
    },
    hero: img('dulichmientay5ngay4dem'),
    image: img('hcm-tour-1'),
    highlights: [
      {
        name: { en: 'Ho Chi Minh City', zh: '胡志明市' },
        text: { en: 'Colonial landmarks, markets and a lively food scene.', zh: '殖民时期建筑、市场与热闹的美食文化。' },
        image: img('hcm-tour-2-1'),
      },
      {
        name: { en: 'Mekong Delta', zh: '湄公河三角洲' },
        text: { en: 'Boat rides, floating markets and village life.', zh: '乘船游览、水上市场与乡村生活。' },
        image: img('cho-lon-binh-tay-market'),
      },
      {
        name: { en: 'Phu Quoc Island', zh: '富国岛' },
        text: { en: 'Beaches, island hopping and sunset views.', zh: '海滩、跳岛游与落日美景。' },
        image: img('phu-quoc'),
      },
      {
        name: { en: 'Mui Ne & Phan Thiet', zh: '美奈与潘切' },
        text: { en: 'Sand dunes, beaches and the Ke Ga lighthouse.', zh: '沙丘、海滩与鸡岬灯塔。' },
        image: img('dulichmuine3ngay2demtuhcm'),
      },
    ],
    bestTime: {
      en: 'The dry season usually runs from around December to April. May to November is the rainy season, often with short afternoon showers.',
      zh: '旱季一般为 12 月至次年 4 月前后；5 月至 11 月为雨季，常见午后短时阵雨。',
    },
    seo: {
      title: { en: 'Southern Vietnam Tours: Saigon, Mekong & Phu Quoc', zh: '越南南部线路：西贡、湄公河与富国岛' },
      description: {
        en: 'Private and group tours in Southern Vietnam: Ho Chi Minh City, the Mekong Delta, Phu Quoc and Mui Ne.',
        zh: '越南南部私人团与团队行程：胡志明市、湄公河三角洲、富国岛与美奈。',
      },
    },
  },

  // ───────────── Cities & areas ─────────────
  {
    slug: 'hanoi',
    kind: 'city',
    region: 'northern-vietnam',
    name: { en: 'Hanoi', zh: '河内' },
    tagline: { en: 'Old Quarter lanes, lakes and the gateway to the north', zh: '老城区街巷、湖泊与北部门户' },
    intro: {
      en: [
        'Vietnam’s capital is a city of lakes, tree-lined boulevards and the busy streets of the Old Quarter. Temples, museums and markets sit side by side with cafés and street-food stalls.',
        'Hanoi is the usual arrival point for programmes in the north, and a good base for day trips to Ninh Binh, Ha Long Bay and nearby craft villages.',
      ],
      zh: [
        '越南首都河内湖泊众多，林荫大道纵横，老城区街巷热闹非凡。寺庙、博物馆和市场与咖啡馆、街边小吃比邻而立。',
        '河内通常是北部行程的抵达城市，也是前往宁平、下龙湾及周边手工艺村一日游的理想据点。',
      ],
    },
    hero: img('tourcityhanoi1ngay'),
    image: img('old-quarter-ta-hien-1'),
    highlights: [
      {
        name: { en: 'Old Quarter', zh: '老城区' },
        text: { en: 'Historic trading streets best explored on foot or by cyclo.', zh: '历史悠久的商业街区，适合步行或乘三轮车游览。' },
        image: img('old-quarter-ta-hien-1'),
      },
      {
        name: { en: 'Ho Chi Minh Mausoleum', zh: '胡志明陵' },
        text: { en: 'Ba Dinh Square and the surrounding historic complex.', zh: '巴亭广场及周边历史建筑群。' },
        image: img('lang-chu-tich-ho-chi-minh-2'),
      },
      {
        name: { en: 'West Lake', zh: '西湖' },
        text: { en: 'The city’s largest lake and Tran Quoc Pagoda.', zh: '河内最大的湖泊与镇国寺。' },
        image: img('west-lake-hanoi'),
      },
      {
        name: { en: 'Dong Xuan Market', zh: '同春市场' },
        text: { en: 'The Old Quarter’s largest covered market.', zh: '老城区最大的室内市场。' },
        image: img('cho-dong-xuan-ha-noi'),
      },
    ],
    bestTime: {
      en: 'October to December is often pleasant and dry. Spring is mild but can be misty; June to August is hot and humid.',
      zh: '10 月至 12 月通常天气舒适干燥；春季温和但多雾；6 月至 8 月炎热潮湿。',
    },
    seo: {
      title: { en: 'Hanoi Tours & Day Trips', zh: '河内旅游线路与一日游' },
      description: {
        en: 'Explore Hanoi with private city tours, food walks and day trips to Ninh Binh and Ha Long Bay.',
        zh: '河内私人城市游、美食漫步，以及前往宁平与下龙湾的一日游。',
      },
    },
  },
  {
    slug: 'halong-bay',
    kind: 'city',
    region: 'northern-vietnam',
    name: { en: 'Ha Long Bay', zh: '下龙湾' },
    tagline: { en: 'Emerald water and limestone islands', zh: '翡翠海水与石灰岩群岛' },
    intro: {
      en: [
        'Ha Long Bay is famous for its limestone islands rising from emerald water. Most visitors explore the bay by boat, either on a day cruise or with one or two nights on board.',
        'Cruise itineraries typically include kayaking or small-boat visits to caves and floating villages. The choice of route and vessel shapes the experience, so we match cruises to each group’s needs.',
      ],
      zh: [
        '下龙湾以翡翠色海面上林立的石灰岩岛屿闻名。大多数游客乘船游览，可选择一日游船或在船上过夜一至两晚。',
        '游船行程通常包括皮划艇或小船游览溶洞和水上渔村。航线和船只的选择直接影响体验，我们会根据每个团队的需求匹配合适的游船。',
      ],
    },
    hero: img('tourduthuyenhalong1ngay1-2'),
    image: img('ha-long'),
    highlights: [
      {
        name: { en: 'Overnight cruises', zh: '过夜游船' },
        text: { en: 'Sleep on the bay and wake up among the islands.', zh: '夜宿海湾，清晨在群岛间醒来。' },
        image: img('emperor-cruises'),
      },
      {
        name: { en: 'Kayaking & caves', zh: '皮划艇与溶洞' },
        text: { en: 'Paddle into sheltered lagoons and visit caves.', zh: '划入幽静的泻湖，探访溶洞。' },
        image: img('tourdulichhanoi-daoquanlan3ngay'),
      },
      {
        name: { en: 'Sunset on deck', zh: '甲板落日' },
        text: { en: 'Evening views from the sundeck.', zh: '在日光甲板上欣赏傍晚景色。' },
        image: img('coktail-crusie'),
      },
      {
        name: { en: 'Limestone islands', zh: '石灰岩群岛' },
        text: { en: 'Thousands of karst islets rising from emerald water.', zh: '数千座喀斯特小岛耸立于碧绿海面。' },
        image: img('ha-long'),
      },
    ],
    bestTime: {
      en: 'Cruises operate year-round, subject to weather. Spring and autumn usually offer the most comfortable conditions.',
      zh: '游船全年运营，具体视天气而定。春秋两季通常最为舒适。',
    },
    seo: {
      title: { en: 'Ha Long Bay Cruises & Tours', zh: '下龙湾游船与线路' },
      description: {
        en: 'Day and overnight Ha Long Bay cruises, combined with Hanoi and Ninh Binh in a tailor-made itinerary.',
        zh: '下龙湾一日及过夜游船，可与河内、宁平组合成定制行程。',
      },
    },
  },
  {
    slug: 'ninh-binh',
    kind: 'city',
    region: 'northern-vietnam',
    name: { en: 'Ninh Binh', zh: '宁平' },
    tagline: { en: '“Ha Long Bay on land”', zh: '“陆上下龙湾”' },
    intro: {
      en: [
        'About two hours from Hanoi, Ninh Binh is known for karst peaks rising from rice fields and rivers. Boat rides at Tam Coc or Trang An pass through caves and quiet valleys.',
        'Temples at Hoa Lu and Bai Dinh, viewpoints such as Mua Cave and cycling routes through the countryside make Ninh Binh suitable for a day trip or a relaxed overnight stay.',
      ],
      zh: [
        '宁平距河内约两小时车程，以稻田和河流间拔地而起的喀斯特山峰著称。在三谷或长安乘船，可穿过溶洞与幽静山谷。',
        '华闾古都、拜顶寺、舞洞观景台以及乡村骑行路线，使宁平既适合一日游，也适合悠闲地住上一晚。',
      ],
    },
    hero: img('dam-van-long-ninh-binh'),
    image: img('tam-coc'),
    highlights: [
      {
        name: { en: 'Tam Coc', zh: '三谷' },
        text: { en: 'Rowing boats along the Ngo Dong River.', zh: '乘手划船游览吴同江。' },
        image: img('tam-coc-bich-dong'),
      },
      {
        name: { en: 'Mua Cave viewpoint', zh: '舞洞观景台' },
        text: { en: 'Stone steps to a panoramic view of the valley.', zh: '沿石阶登顶，俯瞰山谷全景。' },
        image: img('mua-cave'),
      },
      {
        name: { en: 'Bai Dinh Pagoda', zh: '拜顶寺' },
        text: { en: 'A large Buddhist complex on the hillside.', zh: '依山而建的大型佛教建筑群。' },
        image: img('bai-dinh'),
      },
      {
        name: { en: 'Hoa Lu Ancient Capital', zh: '华闾古都' },
        text: { en: 'Temples of Vietnam’s 10th-century capital.', zh: '越南 10 世纪古都的庙宇遗址。' },
        image: img('hoa-lu'),
      },
    ],
    bestTime: {
      en: 'Late May to early June is rice-harvest season; spring and autumn are usually comfortable for cycling and boat trips.',
      zh: '5 月下旬至 6 月初为稻谷收获季；春秋两季通常适合骑行和乘船游览。',
    },
    seo: {
      title: { en: 'Ninh Binh Tours: Tam Coc, Trang An & Mua Cave', zh: '宁平线路：三谷、长安与舞洞' },
      description: {
        en: 'Day trips and overnight stays in Ninh Binh, including boat rides, temples and countryside cycling.',
        zh: '宁平一日游与过夜行程，包括乘船、寺庙参观与乡村骑行。',
      },
    },
  },
  {
    slug: 'sapa',
    kind: 'city',
    region: 'northern-vietnam',
    name: { en: 'Sapa', zh: '沙坝' },
    tagline: { en: 'Terraced valleys and mountain villages', zh: '梯田山谷与山间村寨' },
    intro: {
      en: [
        'Sapa sits high in the mountains of Lao Cai province, surrounded by terraced rice fields and villages of the Hmong, Dao and other communities.',
        'Gentle walks between villages, homestays and mountain viewpoints are the main experiences. Sapa is reached from Hanoi by road or overnight train.',
      ],
      zh: [
        '沙坝位于老街省的高山之中，四周环绕着层层梯田以及苗族、瑶族等民族的村寨。',
        '村寨间的轻徒步、民宿体验与高山观景是这里的主要体验。从河内可乘车或乘夜车前往沙坝。',
      ],
    },
    hero: img('du-lich-sa-pa-mua-he'),
    image: img('didulichsapathang4cogidep5'),
    highlights: [
      {
        name: { en: 'Cat Cat Village', zh: '猫猫村' },
        text: { en: 'A Hmong village a short walk from town.', zh: '距镇中心步行不远的苗族村落。' },
        image: img('where-is-cat-cat-village-1'),
      },
      {
        name: { en: 'Silver Waterfall', zh: '银瀑布' },
        text: { en: 'On the road to the O Quy Ho pass.', zh: '位于前往鸟归湖垭口的路上。' },
        image: img('silver-waterfall-1'),
      },
      {
        name: { en: 'Local culture', zh: '民族文化' },
        text: { en: 'Markets, crafts and daily life of mountain communities.', zh: '山区民族的集市、手工艺与日常生活。' },
        image: img('exploring-the-culture-and-traditions-of-the-hmong-people-in-vietnam'),
      },
      {
        name: { en: 'Fansipan', zh: '番西邦峰' },
        text: { en: 'A cable car to the roof of Indochina and its hilltop pagodas.', zh: '乘缆车登上印度支那屋脊及山顶寺庙。' },
        image: img('du-lich-sa-pa-mua-he'),
      },
    ],
    seo: {
      title: { en: 'Sapa Trekking & Homestay Tours', zh: '沙坝徒步与民宿线路' },
      description: {
        en: 'Sapa tours with village walks, homestays and mountain viewpoints, combined with Hanoi or Ha Giang.',
        zh: '沙坝村寨徒步、民宿与高山观景行程，可与河内或河江组合。',
      },
    },
  },
  {
    slug: 'ha-giang',
    kind: 'city',
    region: 'northern-vietnam',
    name: { en: 'Ha Giang & Cao Bang', zh: '河江与高平' },
    tagline: { en: 'Mountain passes on Vietnam’s northern frontier', zh: '越南北部边陲的高山垭口' },
    intro: {
      en: [
        'Vietnam’s far north offers dramatic mountain roads, deep river canyons and the waterfalls of Cao Bang. It is a destination for travellers who enjoy road journeys and landscapes.',
        'Itineraries here usually run four to six days by private car, with stays in small hotels or homestays.',
      ],
      zh: [
        '越南最北部有壮观的山路、深邃的河流峡谷以及高平的瀑布，适合喜爱公路旅行与自然风光的旅客。',
        '此地行程通常为 4 至 6 天，乘私家车出行，入住小型酒店或民宿。',
      ],
    },
    hero: img('hoang-su-phi-ha-giang'),
    image: img('dulichhagiangcaobang6ngay5dem'),
    highlights: [
      {
        name: { en: 'Hoang Su Phi terraces', zh: '黄树皮梯田' },
        text: { en: 'Rice terraces climbing the hillsides.', zh: '沿山坡层层而上的梯田。' },
        image: img('hoang-su-phi-ha-giang'),
      },
      {
        name: { en: 'Ba Be Lake', zh: '巴贝湖' },
        text: { en: 'A mountain lake inside a national park.', zh: '国家公园内的高山湖泊。' },
        image: img('ba-ba-lake'),
      },
      {
        name: { en: 'Nguom Ngao Cave', zh: '雁洞' },
        text: { en: 'Limestone cave near Ban Gioc.', zh: '板约瀑布附近的石灰岩溶洞。' },
        image: img('nguom-ngao'),
      },
      {
        name: { en: 'Ban Gioc Waterfall', zh: '板约瀑布' },
        text: { en: 'A vast waterfall on the border in Cao Bang.', zh: '高平边境上的壮观瀑布。' },
        image: img('dulichhagiangcaobang6ngay5dem'),
      },
    ],
    seo: {
      title: { en: 'Ha Giang & Cao Bang Tours', zh: '河江与高平线路' },
      description: {
        en: 'Private road journeys through Ha Giang and Cao Bang with mountain passes, waterfalls and homestays.',
        zh: '河江与高平私家车公路之旅：高山垭口、瀑布与民宿。',
      },
    },
  },
  {
    slug: 'hue',
    kind: 'city',
    region: 'central-vietnam',
    name: { en: 'Hue', zh: '顺化' },
    tagline: { en: 'Vietnam’s former imperial capital', zh: '越南昔日皇城' },
    intro: {
      en: [
        'Hue was the seat of the Nguyen dynasty. Its walled citadel, royal tombs and pagodas line the banks of the Perfume River.',
        'A full day is the minimum to see the main sites; many programmes combine Hue with Hoi An via the Hai Van Pass.',
      ],
      zh: [
        '顺化曾是阮朝都城，城墙环绕的皇城、帝陵与寺庙沿香江两岸分布。',
        '游览主要景点至少需要一整天，许多行程会经海云岭将顺化与会安串联。',
      ],
    },
    hero: img('hue-tour'),
    image: img('imperial-citadel'),
    highlights: [
      {
        name: { en: 'Imperial Citadel', zh: '顺化皇城' },
        text: { en: 'Palaces and gates of the Nguyen dynasty.', zh: '阮朝宫殿与城门。' },
        image: img('imperial-citadel'),
      },
      {
        name: { en: 'Incense village', zh: '制香村' },
        text: { en: 'Colourful incense crafts near the city.', zh: '城郊色彩缤纷的制香手工艺。' },
        image: img('tourdulichlanghuong1ngay'),
      },
      {
        name: { en: 'Hien Luong Bridge', zh: '贤良桥' },
        text: { en: 'A historic site on the former demarcation line.', zh: '昔日分界线上的历史遗迹。' },
        image: img('hien-luong-bridge'),
      },
      {
        name: { en: 'Royal architecture', zh: '宫廷建筑' },
        text: { en: 'Pavilions, gates and lotus ponds of the Nguyen dynasty.', zh: '阮朝的楼阁、城门与荷花池。' },
        image: img('hue-tour'),
      },
    ],
    seo: {
      title: { en: 'Hue Tours: Imperial City & Royal Tombs', zh: '顺化线路：皇城与帝陵' },
      description: {
        en: 'Discover Hue’s citadel, royal tombs and river life on a private tour.',
        zh: '私人团游览顺化皇城、帝陵与香江风光。',
      },
    },
  },
  {
    slug: 'da-nang',
    kind: 'city',
    region: 'central-vietnam',
    name: { en: 'Da Nang', zh: '岘港' },
    tagline: { en: 'Beaches, bridges and mountain views', zh: '海滩、桥梁与山景' },
    intro: {
      en: [
        'Da Nang is central Vietnam’s main city and airport hub, with a long city beach and easy access to Hoi An and Hue.',
        'The Ba Na Hills, the Son Tra Peninsula and the Marble Mountains are popular half-day or full-day excursions.',
      ],
      zh: [
        '岘港是越南中部的主要城市与航空枢纽，拥有绵长的城市海滩，前往会安和顺化都十分方便。',
        '巴拿山、山茶半岛和五行山是热门的半日或一日游目的地。',
      ],
    },
    hero: img('da-nang-tour-copy'),
    image: img('da-nang'),
    highlights: [
      {
        name: { en: 'Golden Bridge, Ba Na Hills', zh: '巴拿山佛手金桥' },
        text: { en: 'Mountain resort reached by cable car.', zh: '乘缆车可达的山顶度假区。' },
        image: img('da-nang'),
      },
      {
        name: { en: 'Linh Ung Pagoda', zh: '灵应寺' },
        text: { en: 'Overlooking the bay on the Son Tra Peninsula.', zh: '位于山茶半岛，俯瞰海湾。' },
        image: img('chua-linh-ung-1'),
      },
      {
        name: { en: 'Cham Islands', zh: '占婆岛' },
        text: { en: 'Snorkelling and island day trips.', zh: '浮潜与海岛一日游。' },
        image: img('cham-islands-da-nang'),
      },
      {
        name: { en: 'Dragon Bridge', zh: '龙桥' },
        text: { en: 'Lit up at night and breathing fire on weekend evenings.', zh: '夜晚灯光璀璨，周末晚上会喷火。' },
        image: img('da-nang-tour-copy'),
      },
    ],
    seo: {
      title: { en: 'Da Nang Tours & Excursions', zh: '岘港线路与短途游' },
      description: {
        en: 'Da Nang tours to the Ba Na Hills, Son Tra Peninsula and Cham Islands, with airport transfers and private cars.',
        zh: '岘港巴拿山、山茶半岛与占婆岛行程，提供接送机与包车服务。',
      },
    },
  },
  {
    slug: 'hoi-an',
    kind: 'city',
    region: 'central-vietnam',
    name: { en: 'Hoi An', zh: '会安' },
    tagline: { en: 'Lanterns, tailors and riverside evenings', zh: '灯笼、裁缝铺与河畔夜色' },
    intro: {
      en: [
        'Hoi An’s ancient town preserves merchant houses, assembly halls and a Japanese covered bridge. In the evening, lanterns light the streets along the Thu Bon River.',
        'Around the town, vegetable villages, coconut forests and the My Son sanctuary offer half-day experiences that suit families and small groups.',
      ],
      zh: [
        '会安古镇保留着古老商铺、会馆和日本廊桥。夜晚，秋盆河畔的街道被灯笼点亮。',
        '古镇周边的菜村、椰林与美山圣地都适合安排半日体验，深受家庭与小团体欢迎。',
      ],
    },
    hero: img('khamphavedepvietnamhuehoiansapa'),
    image: img('hoi-an-9-copy'),
    highlights: [
      {
        name: { en: 'Bay Mau Coconut Forest', zh: '七亩椰林' },
        text: { en: 'Basket-boat rides through the water coconut palms.', zh: '乘坐簸箕船穿行于水椰林间。' },
        image: img('bay-mau-coconut-forest'),
      },
      {
        name: { en: 'Tra Que Village', zh: '茶桂菜村' },
        text: { en: 'Organic gardens and hands-on farming.', zh: '有机菜园与农耕体验。' },
        image: img('lantern-making-be-a-real-farmer-at-tra-que-village'),
      },
      {
        name: { en: 'My Son Sanctuary', zh: '美山圣地' },
        text: { en: 'Ruins of Cham temple towers.', zh: '占婆塔庙遗址。' },
        image: img('my-son-holy-land-1'),
      },
      {
        name: { en: 'Ancient Town', zh: '会安古镇' },
        text: { en: 'Lantern-lit lanes and the Japanese Covered Bridge.', zh: '灯笼点缀的街巷与日本廊桥。' },
        image: img('hoi-an-9-copy'),
      },
    ],
    bestTime: {
      en: 'February to May is often the most comfortable period; summers are hot, and autumn can bring heavy rain.',
      zh: '2 月至 5 月通常最为舒适；夏季炎热，秋季可能有强降雨。',
    },
    seo: {
      title: { en: 'Hoi An Tours: Ancient Town & Countryside', zh: '会安线路：古镇与乡村' },
      description: {
        en: 'Hoi An walking tours, countryside experiences and My Son excursions, tailored for groups and families.',
        zh: '会安古镇漫步、乡村体验与美山游览，为团队与家庭量身定制。',
      },
    },
  },
  {
    slug: 'nha-trang',
    kind: 'city',
    region: 'central-vietnam',
    name: { en: 'Nha Trang', zh: '芽庄' },
    tagline: { en: 'Bay islands and coastal resorts', zh: '海湾群岛与滨海度假' },
    intro: {
      en: [
        'Nha Trang lies on a wide bay dotted with islands. Boat trips, snorkelling and beach resorts are the main draw.',
        'In town, the Long Son Pagoda, the Po Nagar towers and the cathedral make for an easy half-day of sightseeing.',
      ],
      zh: [
        '芽庄坐落在点缀着岛屿的宽阔海湾边，乘船出海、浮潜与海滨度假村是这里的主要亮点。',
        '市区的龙山寺、婆那加占婆塔和大教堂适合安排轻松的半日观光。',
      ],
    },
    hero: img('tour3daonhatrang'),
    image: img('hon-mun-island-1'),
    highlights: [
      {
        name: { en: 'Island hopping', zh: '跳岛游' },
        text: { en: 'Boat trips around the bay’s islands.', zh: '乘船环游海湾诸岛。' },
        image: img('hon-mun-island-1'),
      },
      {
        name: { en: 'Long Son Pagoda', zh: '龙山寺' },
        text: { en: 'A large white Buddha above the city.', zh: '俯瞰城市的白色大佛。' },
        image: img('long-son-pagoda'),
      },
      {
        name: { en: 'Nha Trang Cathedral', zh: '芽庄大教堂' },
        text: { en: 'Stone cathedral in the city centre.', zh: '市中心的石砌教堂。' },
        image: img('nha-trang-cathedral'),
      },
      {
        name: { en: 'Snorkelling & diving', zh: '浮潜与潜水' },
        text: { en: 'Coral reefs around Hon Mun Island.', zh: '木岛周边的珊瑚礁。' },
        image: img('lan-ngam-san-ho-1'),
      },
    ],
    seo: {
      title: { en: 'Nha Trang Tours & Island Trips', zh: '芽庄线路与海岛游' },
      description: {
        en: 'Nha Trang island trips, city sightseeing and beach extensions, combined with Da Lat or Mui Ne.',
        zh: '芽庄海岛游、城市观光与海滨延伸游，可与大叻或美奈组合。',
      },
    },
  },
  {
    slug: 'ho-chi-minh-city',
    kind: 'city',
    region: 'southern-vietnam',
    name: { en: 'Ho Chi Minh City', zh: '胡志明市' },
    tagline: { en: 'Vietnam’s energetic southern metropolis', zh: '越南南部的活力都市' },
    intro: {
      en: [
        'Still widely called Saigon, Ho Chi Minh City mixes French-era landmarks, busy markets and a modern skyline.',
        'It is the main gateway to the Mekong Delta and the Cu Chi area, and a common start or end point for north–south journeys.',
      ],
      zh: [
        '胡志明市至今仍常被称为西贡，法式建筑、热闹市场与现代天际线在这里交融。',
        '这里是前往湄公河三角洲与古芝地区的主要门户，也是南北纵贯行程常见的起点或终点。',
      ],
    },
    hero: img('hcm-tour-2-1'),
    image: img('hcm-tour-1'),
    highlights: [
      {
        name: { en: 'City Hall & Nguyen Hue', zh: '市政厅与阮惠步行街' },
        text: { en: 'Colonial architecture in District 1.', zh: '第一郡的殖民时期建筑。' },
        image: img('hcm-tour-1'),
      },
      {
        name: { en: 'Saigon Notre-Dame', zh: '西贡圣母大教堂' },
        text: { en: 'Red-brick cathedral beside the Central Post Office.', zh: '中央邮局旁的红砖教堂。' },
        image: img('hcm-tour-2-2'),
      },
      {
        name: { en: 'Binh Tay Market', zh: '平西市场' },
        text: { en: 'The wholesale heart of Cho Lon.', zh: '堤岸的批发中心。' },
        image: img('cho-lon-binh-tay-market'),
      },
      {
        name: { en: 'Street food', zh: '街头美食' },
        text: { en: 'Markets and food stalls open from dawn to late night.', zh: '从清晨到深夜营业的市场与小吃摊。' },
        image: img('vietnamese-1'),
      },
    ],
    seo: {
      title: { en: 'Ho Chi Minh City Tours', zh: '胡志明市线路' },
      description: {
        en: 'Saigon city tours, food experiences and Mekong Delta excursions from Ho Chi Minh City.',
        zh: '西贡城市游、美食体验以及从胡志明市出发的湄公河三角洲游。',
      },
    },
  },
  {
    slug: 'mekong-delta',
    kind: 'city',
    region: 'southern-vietnam',
    name: { en: 'Mekong Delta', zh: '湄公河三角洲' },
    tagline: { en: 'Rivers, orchards and floating markets', zh: '河流、果园与水上市场' },
    intro: {
      en: [
        'The Mekong Delta is a vast network of rivers and canals. Life here moves by boat, from floating markets to small workshops along the banks.',
        'Day trips from Ho Chi Minh City are popular, while one or two nights in the delta give a more relaxed pace.',
      ],
      zh: [
        '湄公河三角洲河道与运河纵横交错，这里的生活离不开船：从水上市场到岸边的小作坊。',
        '从胡志明市出发的一日游很受欢迎，而在三角洲住上一两晚则能体验更悠闲的节奏。',
      ],
    },
    hero: img('dulichmientay5ngay4dem'),
    image: img('cuc-huong'),
    highlights: [
      {
        name: { en: 'Boat trips', zh: '乘船游览' },
        text: { en: 'Small boats through narrow canals.', zh: '乘小船穿行于狭窄的运河。' },
        image: img('dong-duong'),
      },
      {
        name: { en: 'Village life', zh: '乡村生活' },
        text: { en: 'Orchards, workshops and local homes.', zh: '果园、作坊与当地人家。' },
        image: img('cuc-huong'),
      },
      {
        name: { en: 'Local food', zh: '当地美食' },
        text: { en: 'Elephant ear fish, fresh fruit and rice-paper rolls.', zh: '象耳鱼、新鲜水果与米纸卷。' },
        image: img('vietnamese-1'),
      },
      {
        name: { en: 'River life', zh: '河上生活' },
        text: { en: 'Wooden boats and riverside markets along the waterways.', zh: '水道沿岸的木船与河边市场。' },
        image: img('fish'),
      },
    ],
    seo: {
      title: { en: 'Mekong Delta Tours', zh: '湄公河三角洲线路' },
      description: {
        en: 'Mekong Delta day trips and overnight stays with boat rides and village visits.',
        zh: '湄公河三角洲一日游与过夜行程：乘船与村落探访。',
      },
    },
  },
  {
    slug: 'phu-quoc',
    kind: 'city',
    region: 'southern-vietnam',
    name: { en: 'Phu Quoc', zh: '富国岛' },
    tagline: { en: 'Island beaches in the Gulf of Thailand', zh: '泰国湾的海岛沙滩' },
    intro: {
      en: [
        'Phu Quoc is Vietnam’s largest island, with long beaches, a protected national park in the north and small islands to the south.',
        'It works well as a relaxing finish to a Vietnam itinerary, and for families or honeymooners looking for beach time.',
      ],
      zh: [
        '富国岛是越南最大的岛屿，拥有绵长的海滩、北部受保护的国家公园以及南部的众多小岛。',
        '它非常适合作为越南行程的轻松收尾，也适合想享受海滩时光的家庭和蜜月旅客。',
      ],
    },
    hero: img('tour4daophuquoc'),
    image: img('phu-quoc'),
    highlights: [
      {
        name: { en: 'Southern islands', zh: '南部群岛' },
        text: { en: 'Boat trips and snorkelling around the An Thoi islands.', zh: '安泰群岛乘船与浮潜。' },
        image: img('may-rut-trong-island'),
      },
      {
        name: { en: 'Hon Thom cable car', zh: '香岛缆车' },
        text: { en: 'A sea-crossing cable car to Hon Thom.', zh: '跨海缆车前往香岛。' },
        image: img('sun-world-hon-thom-nature'),
      },
      {
        name: { en: 'Fishing villages', zh: '渔村' },
        text: { en: 'Stilt houses and seafood at Rach Vem.', zh: '叻篷渔村的高脚屋与海鲜。' },
        image: img('rach-vem-fishing-village-1'),
      },
      {
        name: { en: 'Beaches', zh: '海滩' },
        text: { en: 'Clear water and white sand around the island.', zh: '岛屿周围清澈的海水与白沙。' },
        image: img('island'),
      },
    ],
    bestTime: {
      en: 'November to April is usually the dry season on Phu Quoc, with calmer seas for boat trips.',
      zh: '富国岛 11 月至次年 4 月通常为旱季，海面较平静，适合出海。',
    },
    seo: {
      title: { en: 'Phu Quoc Island Tours', zh: '富国岛线路' },
      description: {
        en: 'Phu Quoc beach stays, island hopping and sunset trips as part of a tailor-made Vietnam holiday.',
        zh: '富国岛海滨度假、跳岛游与日落之旅，可纳入越南定制假期。',
      },
    },
  },
  {
    slug: 'mui-ne',
    kind: 'city',
    region: 'southern-vietnam',
    name: { en: 'Mui Ne', zh: '美奈' },
    tagline: { en: 'Sand dunes and a laid-back coast', zh: '沙丘与悠闲海岸' },
    intro: {
      en: [
        'Mui Ne is a coastal town known for its red and white sand dunes, the Fairy Stream and a long beach lined with resorts.',
        'It is a road trip of a few hours from Ho Chi Minh City and pairs well with Da Lat or Nha Trang.',
      ],
      zh: [
        '美奈是一座海滨小镇，以红白沙丘、仙女溪和沿岸度假村林立的长滩闻名。',
        '从胡志明市驱车数小时即可抵达，适合与大叻或芽庄组合。',
      ],
    },
    hero: img('tourdulichmuinegiare'),
    image: img('mui-ne-sunset-tour'),
    highlights: [
      {
        name: { en: 'Sand dunes', zh: '沙丘' },
        text: { en: 'Sunrise or sunset at the dunes.', zh: '在沙丘上看日出或日落。' },
        image: img('mui-ne-sunset-tour'),
      },
      {
        name: { en: 'Fairy Stream', zh: '仙女溪' },
        text: { en: 'A shallow stream between red sandstone cliffs.', zh: '红色砂岩峭壁间的浅溪。' },
        image: img('suoi-tien-mui-ne'),
      },
      {
        name: { en: 'Ke Ga Lighthouse', zh: '鸡岬灯塔' },
        text: { en: 'A historic lighthouse on a rocky islet south of Mui Ne.', zh: '美奈以南礁石小岛上的历史灯塔。' },
        image: img('dulichmuine3ngay2demtuhcm'),
      },
      {
        name: { en: 'Beaches', zh: '海滩' },
        text: { en: 'Long sandy beaches and resorts along the coast.', zh: '沿岸绵长的沙滩与度假村。' },
        image: img('tourdulichmuine2ngay1demtuhcm'),
      },
    ],
    seo: {
      title: { en: 'Mui Ne Tours', zh: '美奈线路' },
      description: {
        en: 'Mui Ne sand dunes, Fairy Stream and beach stays from Ho Chi Minh City.',
        zh: '从胡志明市出发，游览美奈沙丘、仙女溪并享受海滨住宿。',
      },
    },
  },
]

export const regions = destinations.filter((d) => d.kind === 'region')
export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug)
export const citiesOf = (region: RegionSlug | string) => destinations.filter((d) => d.region === region)
