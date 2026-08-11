export const SITE = {
  name: 'Baywalk Manila',
  tagline: 'Manila Bay Sunset & Dolomite Beach',
  description:
    'Discover the iconic Manila Bay sunset along the scenic Baywalk promenade featuring the Dolomite Beach on Roxas Boulevard in Malate, Manila.',
  address: {
    street: 'Baywalk, Roxas Blvd',
    district: 'Malate',
    city: 'Manila',
    postal: '1004',
    region: 'Metro Manila',
    country: 'Philippines',
  },
  geo: {
    latitude: 14.5692,
    longitude: 120.9834,
  },
  hours: {
    sunday:    '06:00-18:00',
    monday:   '06:00-18:00',
    tuesday:  '06:00-18:00',
    wednesday: '06:00-18:00',
    thursday: 'Closed',
    friday:   '06:00-18:00',
    saturday: '06:00-18:00',
  },
  rating: {
    value: 4.2,
    count: 6500,
  },
  googleMapsShortLink: 'https://maps.app.goo.gl/9iakbrNfa9MzGGmx8',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.4227089179517!2d120.97698627702104!3d14.574972885908315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cbea72489475%3A0x40b495dcf0280403!2sManila%20Bay%20Beach!5e0!3m2!1szh-CN!2s!4v1786413569288!5m2!1szh-CN!2s',
  ga4Id: 'G-HXM22WWPKP',
};

export const FAQ = [
  {
    q: 'Is there an entrance fee for Baywalk Manila?',
    a: 'Baywalk Manila, including the Dolomite Beach area, is free to enter. Access is complimentary for all visitors.',
  },
  {
    q: 'What day is Baywalk closed?',
    a: 'The Dolomite Beach section is closed every Thursday for regular maintenance and rehabilitation works. The rest of the Roxas Boulevard promenade generally remains open.',
  },
  {
    q: 'Can you swim at Manila Bay Dolomite Beach?',
    a: 'Swimming is not permitted at the Dolomite Beach area due to ongoing water quality rehabilitation. The area is intended for strolling, sand play, and sunset viewing.',
  },
  {
    q: 'What is the best time to visit Baywalk Manila?',
    a: 'The best time is late afternoon, around 4:00 PM onwards, to catch the world-famous Manila Bay sunset. Weekday evenings are less crowded than weekends.',
  },
  {
    q: 'Are pets allowed at Baywalk?',
    a: 'Well-behaved pets on a leash are generally allowed on the promenade sections. The Dolomite Beach zone may have separate pet restrictions during peak hours.',
  },
  {
    q: 'Is plastic allowed inside Dolomite Beach?',
    a: 'Single-use plastic items (bottles, wrappers, straws) are restricted at the Dolomite Beach enclosure to protect the sand and rehabilitation zone. Visitors are encouraged to bring reusable containers.',
  },
  {
    q: 'How long should I spend at Baywalk?',
    a: 'Most visitors spend between 1 to 2 hours. A complete sunset visit can easily extend to 3 hours if you combine it with dinner at a nearby restaurant.',
  },
];

export const NEARBY_EATS = [
  {
    name: 'The Aristocrat Restaurant',
    type: 'Filipino Heritage',
    distance: '250 m',
    blurb: 'Iconic Manila institution serving chicken barbecue and Filipino comfort classics since 1936.',
    price: '₱₱',
  },
  {
    name: 'Harbor View Restaurant',
    type: 'Seafood / Bay View',
    distance: '1.2 km',
    blurb: 'Waterfront dining with fresh seafood and a front-row sunset view.',
    price: '₱₱₱',
  },
  {
    name: 'Bistro Remedios',
    type: 'Local & International',
    distance: '450 m',
    blurb: 'Malate favourite with outdoor seating, live acoustic sets and gising-gising.',
    price: '₱₱',
  },
  {
    name: "Max's Restaurant",
    type: 'Family Filipino',
    distance: '440 m',
    blurb: 'Famous for house-made fried chicken and classic Filipino shareables.',
    price: '₱₱',
  },
  {
    name: 'Army Navy Burger + Burrito',
    type: 'Casual American-Mexican',
    distance: '500 m',
    blurb: 'Quick service burgers, burritos and Freedom Fries steps from Remedios Circle.',
    price: '₱',
  },
  {
    name: 'Street Food Stalls (Baywalk strip)',
    type: 'Street Snacks',
    distance: 'On-site',
    blurb: 'Fish balls, kwek-kwek, isaw, banana cue and cold drinks from local vendors.',
    price: '₱',
  },
];

export const NEARBY_ATTR = [
  {
    name: 'Rizal Park (Luneta)',
    distance: '1.8 km N',
    blurb: 'Historic urban park with the Rizal Monument, Kilometre Zero and the National Museum cluster.',
    tag: 'History / Green Space',
  },
  {
    name: 'Intramuros',
    distance: '2.6 km NE',
    blurb: 'The Walled City — Fort Santiago, Manila Cathedral, San Agustin Church and cobblestone streets.',
    tag: 'UNESCO Heritage',
  },
  {
    name: 'Manila Ocean Park',
    distance: '1.9 km N',
    blurb: 'Aquarium complex next to Quirino Grandstand with the iconic oceanarium and marine shows.',
    tag: 'Family',
  },
  {
    name: 'Cultural Center of the Philippines (CCP)',
    distance: '2.4 km S',
    blurb: 'National theatre and arts complex along Roxas Boulevard designed by Leandro Locsin.',
    tag: 'Arts / Architecture',
  },
  {
    name: 'SM Mall of Asia (MOA)',
    distance: '4 km S',
    blurb: 'One of Southeast Asia’s largest malls with its own bayfront promenade.',
    tag: 'Shopping / Leisure',
  },
  {
    name: 'Malate Church',
    distance: '450 m E',
    blurb: 'Our Lady of Remedies Parish, a 16th-century baroque church in the heart of Malate.',
    tag: 'Heritage Church',
  },
];

export const TRANSPORT_INFO = {
  plane: {
    airports: [
      {
        name: 'Ninoy Aquino International Airport (NAIA)',
        code: 'MNL',
        terminals: 'Terminals 1 / 2 / 3 / 4',
        note: 'Manila 的主国际机场，距 Baywalk 约 7 – 12 km，车程视交通 30 – 90 分钟。',
      },
      {
        name: 'Clark International Airport',
        code: 'CRK',
        terminals: 'Angeles City, Pampanga',
        note: '北方备选机场，距 Baywalk 约 90 km，推荐预订机场大巴直达 Manila。',
      },
    ],
    steps: [
      'Step 1 — 抵达 NAIA T3：在到达大厅取行李后，走出出口。',
      'Step 2 — 选择机场快线：搭乘 Premium Point-to-Point (P2P) Bus「NAIA Loop – Manila」方向，或使用 Grab 叫车。',
      'Step 3 — 在「Roxas Boulevard / Malate」附近下车；若搭乘 P2P 到 EDSA Taft，再换乘 LRT-1 南下即可衔接。',
      'Step 4 — 从 Pedro Gil Station 步行 5 – 7 分钟西向直达 Baywalk。',
    ],
  },
  rail: [
    {
      system: 'Manila Light Rail Transit Line 1 (LRT-1 / Roosevelt – Baclaran)',
      lines: [
        {
          line: 'LRT-1',
          station: 'Pedro Gil Station',
          walk: '5 – 7 min 沿 Pedro Gil St 向西朝海湾方向步行即可抵达 Baywalk 中段。',
          tips: '从站台的 Taft Ave 西口出站，搭乘三轮车约 PHP 50 也可直达。',
        },
        {
          line: 'LRT-1',
          station: 'United Nations Avenue Station',
          walk: '10 – 12 min 沿 UN Ave 向西一直走到 Roxas Blvd。',
          tips: '适合前往 Rizal Park 端 Baywalk，沿途可经菲律宾国家博物馆。',
        },
        {
          line: 'LRT-1',
          station: 'Vito Cruz Station',
          walk: '15 – 20 min 向南沿 Taft Ave 转至 Pablo Ocampo Sr 向西。',
          tips: '前往 CCP Complex 与 Harbour Square 端点推荐此站下车。',
        },
      ],
    },
    {
      system: 'Philippine National Railways (PNR Metro Commuter)',
      lines: [
        {
          line: 'PNR Metro South Commuter',
          station: 'Dela Rosa Station',
          walk: '约 25 min，转三轮车/jeep 更快。',
          tips: '适合从 Laguna / Alabang 方向来的旅客；在 Dela Rosa 换乘 jeep「Pier South via Mabini」直达。',
        },
      ],
    },
  ],
  bus: {
    cityBus: [
      {
        route: 'EDSA Carousel (Cherry Blossom / Bus Stop 4 – Monumento)',
        how: '乘 EDSA 快速公交至 Taft Ave 站，换乘 LRT-1 南下至 Pedro Gil 或 Vito Cruz。',
        fare: 'PHP 15 – 40，可使用 Beep 卡。',
      },
      {
        route: 'Manila City Bus Route 11 – Monumento via Taft / Buendia',
        how: '沿 Taft Ave 南行，在 Pedro Gil 路口下车后步行 5 分钟。',
        fare: 'PHP 12 – 25。',
      },
      {
        route: 'Premium P2P Airport Loop Bus',
        how: '从 NAIA T3 / T2 直达 EDSA Taft，转乘 LRT-1 或打车至 Baywalk。',
        fare: 'PHP 150 – 250，每 30 分钟一班。',
      },
    ],
    provincial: [
      '从吕宋北部 (Baguio / Clark)：Victory Liner / Partas 至 Pasay / Cubao 终点站，换乘 LRT-1 南下。',
      '从吕宋南部 (Batangas / Laguna)：Jam Liner / DLTB 至 Buendia / Taft，再换乘 jeep 或 LRT-1。',
    ],
  },
  jeepney: [
    {
      routes: [
        'Malate – Pier South via Mabini',
        'Baclaran – Dapitan via Mabini',
        'Vito Cruz – Divisoria via Taft',
        'Santa Cruz – Pier South via Mabini',
      ],
      tips: '请在乘车时告知司机「Para po sa Roxas Blvd, Malate」 或 「Baywalk / Dolomite Beach」，让其在最近路口下车。',
      fare: '首 4 km PHP 14，每公里 PHP 2.20；现金支付或 Beep 卡均可。',
    },
  ],
  taxiRidehail: {
    grab: [
      {
        from: 'NAIA Terminal 3',
        fare: 'Grab Sedan PHP 300 – 500；GrabCar Premium 略高。',
        time: '无交通 30 min，高峰 60 – 90 min。',
        tips: '建议使用 Grab 提前锁定车费，避免路边议价。',
      },
      {
        from: 'Makati CBD (Ayala Triangle)',
        fare: 'PHP 150 – 250。',
        time: '20 – 45 min 取决于 EDSA/Osmeña Highway。',
        tips: '避开 17:00 – 20:00 晚高峰。',
      },
      {
        from: 'SM Mall of Asia (MOA) / Pasay',
        fare: 'PHP 120 – 180。',
        time: '15 – 30 min。',
        tips: '可沿 Seaside Blvd 北上经 Roxas Blvd 一路沿湾。',
      },
    ],
    meteredTaxi: {
      flagdown: 'PHP 45 起步，前 500 m，之后每 300 m 跳 PHP 4。',
      tips: '坚持使用计价器 (meter)；部分司机会要求固定费率，可拒绝或改乘 Grab。',
    },
    tricyclePedicab: {
      note: '短程接驳工具（≤ 2 km），适合从 LRT 站/酒店到 Baywalk。',
      fare: '单车 PHP 50 – 100/次；多人同乘可议价。',
    },
  },
  parking: {
    car: [
      {
        lot: 'Rizal Park Parking (N. Luneta Rd / Roxas Blvd)',
        price: 'PHP 30 – 50/hr；全天 PHP 200 – 350。',
        tips: '适合前往 Baywalk 北段。',
      },
      {
        lot: 'Harbour Square / CCP Open Parking (Pasay)',
        price: 'PHP 40 – 60/hr；平日夜间车位充裕。',
        tips: '靠近 Baywalk 南端。',
      },
      {
        lot: 'Robinsons Place Manila (Pedro Gil / M.H. del Pilar)',
        price: '首 3 hr PHP 80，之后 PHP 20/hr。',
        tips: '购物中心停车场连接 Mall，车位最多。',
      },
    ],
    motorcycle: {
      price: '街边指定摩托位 PHP 20 – 40/次；商场停车场 PHP 30/hr。',
      tips: '停车后务必上锁并带走贵重物品。',
    },
  },
};

export const GALLERY = {
  hero: '/gallery/sunset-dolomite-beach-crowd-sunbeams.jpg',
  heroAlt: 'Golden hour sunset at Manila Baywalk Dolomite Beach with visitors seated on white sand watching crepuscular rays over the bay',
  dolomite: '/gallery/dolomite-beach-skyline-daytime.jpg',
  dolomiteAlt: 'Dolomite Beach white sand stretch along Manila Bay with the Ermita-Malate skyline rising behind the palm-lined promenade',
  sunset: '/gallery/sunset-bangka-outrigger-traditional-boat.jpg',
  sunsetAlt: 'Manila Bay sunset with a Filipino outrigger bangka silhouetted against a burning orange sky and its reflection on calm water',
  promenade: '/gallery/promenade-seawall-palm-trees-skyline.jpg',
  promenadeAlt: 'Roxas Boulevard Baywalk promenade with a rocky seawall, coconut palms and the Manila high-rise skyline under a cloud-patterned sky',
  photos: [
    {
      src: '/gallery/landmark-archway-dolomite-beach-entrance.jpg',
      alt: 'Manila Baywalk Dolomite Beach metal archway entrance sign against a dramatic cloudy sky with palm fronds',
      category: 'Landmark',
      label: 'Archway Entrance',
    },
    {
      src: '/gallery/aerial-baywalk-roxas-boulevard-overview.jpg',
      alt: 'Aerial overview of the entire Baywalk strip showing the white Dolomite Beach, Roxas Boulevard carriageway, palm buffers and Manila Bay',
      category: 'Overview',
      label: 'Aerial Roxas Blvd',
    },
    {
      src: '/gallery/landmark-dolomite-marker-plaque-rock.jpg',
      alt: 'Giant dolomite boulder on the beach bearing three metal plaques listing the Mandamus agencies and inauguration of the Manila Bay nourishment project',
      category: 'Landmark',
      label: 'Dolomite Marker',
    },
    {
      src: '/gallery/dolomite-beach-skyline-daytime.jpg',
      alt: 'Daytime panorama of Dolomite Beach with the marker boulder at the waterline and tall city buildings across the sand',
      category: 'Dolomite Beach',
      label: 'Beach & Skyline',
    },
    {
      src: '/gallery/dolomite-beach-construction-skyline-daytime.jpg',
      alt: 'Visitors strolling the Dolomite Beach shoreline at high tide with the ongoing residential tower construction rising behind the palm row',
      category: 'Dolomite Beach',
      label: 'Shoreline Stroll',
    },
    {
      src: '/gallery/dolomite-beach-wide-overcast-seascape.jpg',
      alt: 'Wide overcast view of the full Dolomite Beach curve opening onto Manila Bay horizon with scattered visitors on the pale sand',
      category: 'Dolomite Beach',
      label: 'Open Seascape',
    },
    {
      src: '/gallery/sunset-dolomite-beach-crowd-sunbeams.jpg',
      alt: 'Crowds gathered on Dolomite Beach watching the descending sun push dramatic crepuscular rays through scattered clouds',
      category: 'Sunset',
      label: 'Sunset on the Sand',
    },
    {
      src: '/gallery/sunset-bangka-outrigger-traditional-boat.jpg',
      alt: 'A traditional Filipino bangka outrigger boat floating still on Manila Bay under a fiery gradient sunset sky',
      category: 'Sunset',
      label: 'Bangka at Dusk',
    },
    {
      src: '/gallery/skyline-rocky-breakwater-buildings-golden-hour.jpg',
      alt: 'Golden-hour view of the Manila skyline from across the breakwater, the rocky groynes warmed by the setting sun',
      category: 'Sunset',
      label: 'Skyline Golden Hour',
    },
    {
      src: '/gallery/promenade-seawall-palm-trees-skyline.jpg',
      alt: 'The paved Roxas Boulevard Baywalk promenade running alongside a grey rocky seawall with tall palms and Manila high-rises receding into distance',
      category: 'Promenade',
      label: 'Seawall Walkway',
    },
    {
      src: '/gallery/promenade-bench-bronze-statues-sculpture.jpg',
      alt: 'Bronze life-size sculptures of two seated figures on the Baywalk promenade with Roxas Boulevard traffic and the Manila waterfront behind',
      category: 'Promenade',
      label: 'Bench Sculptures',
    },
    {
      src: '/gallery/promenade-kalesa-horse-carriage.jpg',
      alt: 'A white kalesa horse-drawn carriage waiting on the paved Baywalk promenade shaded by coconut palms at golden hour',
      category: 'Promenade',
      label: 'Kalesa Ride',
    },
    {
      src: '/gallery/marina-yacht-silhouette-sunset.jpg',
      alt: 'Masts of anchored yachts and sailboats forming vertical silhouettes against a deep blue-to-orange sunset sky in Manila Yacht Club',
      category: 'Marina',
      label: 'Yacht Sunset Silhouette',
    },
    {
      src: '/gallery/marina-superyacht-club-daytime.jpg',
      alt: 'Luxury superyachts lined up at the Manila Yacht Club jetty with a warm post-sunset glow reflected on still water',
      category: 'Marina',
      label: 'Superyacht Marina',
    },
    {
      src: '/gallery/marina-sunset-golden-water-reflection.jpg',
      alt: 'Expansive golden sunset over the yacht marina with every mast reflected perfectly in the glassy harbour water',
      category: 'Marina',
      label: 'Marina Golden Reflection',
    },
    {
      src: '/gallery/park-fountain-plaza-palm-trees.jpg',
      alt: 'Central fountain plaza framed by towering royal palms under a bright blue cumulus sky, typical of the Rizal Park waterfront precinct',
      category: 'Nearby',
      label: 'Rizal Park Plaza',
    },
    {
      src: '/gallery/nearby-moa-ferris-wheel-seaside-boulevard.jpg',
      alt: 'The SM MOA Eye ferris wheel standing at the end of the seaside boulevard leading to the Mall of Asia complex on Manila Bay',
      category: 'Nearby',
      label: 'MOA Seaside Blvd',
    },
  ],
};
