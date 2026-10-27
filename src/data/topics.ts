/**
 * Topic cluster registry for baywalkmanila.com.
 * 36 long-tail pages covering visit decisions, food, nearby attractions and itineraries.
 * Content is educational, non-commercial and third-party. All times/fees must be verified on site.
 */

export type TopicSection = { id: string; heading: string; body: string[] };
export type TopicFaq = { q: string; a: string };
export type TopicContent = {
  slug: string;
  cluster: 'A' | 'B' | 'C' | 'D';
  groupLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: TopicSection[];
  faq: TopicFaq[];
  related: string[];
  updated: string;
};

export const CLUSTER_LABELS: Record<string, string> = {
  A: 'Visit & Practical Info',
  B: 'Food & Cafes',
  C: 'Nearby Attractions',
  D: 'Itineraries & Special Needs',
};

const UPDATED = 'October 2026';

export const TOPICS: TopicContent[] = [
  /* ============ CLUSTER A — VISIT & PRACTICAL INFO ============ */
  {
    slug: 'opening-hours',
    cluster: 'A',
    groupLabel: CLUSTER_LABELS.A,
    title: 'Manila Baywalk & Dolomite Beach Opening Hours',
    metaTitle: 'Manila Baywalk & Dolomite Beach Opening Hours (Closed Thursday)',
    metaDescription:
      'When is Manila Bay Beach open? Dolomite Beach runs 6:00 AM–6:00 PM and is closed every Thursday for maintenance. The Roxas Boulevard promenade stays open from early morning to late evening.',
    intro:
      'The Manila Bay Beach (Dolomite Beach) gated section and the open Roxas Boulevard promenade keep different schedules. Knowing which part is open — and when — is the single most common reason visitors search before they travel. This guide breaks down both.',
    sections: [
      {
        id: 'dolomite-hours',
        heading: 'Dolomite Beach (gated sand section)',
        body: [
          'The white-sand Dolomite Beach enclosure is typically open 6:00 AM to 6:00 PM, Friday through Wednesday.',
          'It is closed every Thursday for regular maintenance and sand rehabilitation works. The Roxas Boulevard promenade alongside it generally remains open.',
          'Bag checks at the gate screen for prohibited single-use plastics; there is no ticket and no booking required.',
        ],
      },
      {
        id: 'promenade-hours',
        heading: 'Roxas Boulevard Promenade',
        body: [
          'The promenade is an open public space you can walk from early morning until late evening, with lighting after dark.',
          'Short temporary closures are possible for public events, clean-ups or weather-related advisories. Always check on-site signage before a long trip.',
        ],
      },
    ],
    faq: [
      {
        q: 'What day is Baywalk closed?',
        a: 'The Dolomite Beach section is closed every Thursday. The rest of the Roxas Boulevard promenade generally stays open.',
      },
      {
        q: 'What are the Dolomite Beach opening hours?',
        a: 'About 6:00 AM to 6:00 PM, Friday to Wednesday. Hours may shift during events or rehabilitation; verify on site.',
      },
      {
        q: 'Is Manila Baywalk open at night?',
        a: 'The promenade is lit and walkable into the evening. The gated Dolomite Beach is cleared at close and cannot be entered after dark.',
      },
    ],
    related: ['entrance-fee', 'dolomite-beach-guide', 'sunset-time', 'manila-bay-at-night'],
    updated: UPDATED,
  },
  {
    slug: 'entrance-fee',
    cluster: 'A',
    groupLabel: CLUSTER_LABELS.A,
    title: 'Manila Baywalk & Dolomite Beach Entrance Fee — Is It Free?',
    metaTitle: 'Is Dolomite Beach Free? Manila Baywalk Entrance Fee & Ticket Price',
    metaDescription:
      'Baywalk Manila and Dolomite Beach are free to enter — no ticket, no booking, no entrance fee. Only cruise charters and parking cost money. Swimming is not allowed in the rehabilitation zone.',
    intro:
      'Short answer: it is free. Baywalk Manila including the Dolomite Beach area is a public space with complimentary access for all visitors. This page explains exactly what costs nothing, and the few things that do.',
    sections: [
      {
        id: 'free-access',
        heading: 'What is free',
        body: [
          'Walking the 2-km Roxas Boulevard promenade, the Dolomite Beach sand area and watching the Manila Bay sunset are all free.',
          'No ticket, reservation or entrance fee is required. The only gate check screens for prohibited single-use plastics.',
        ],
      },
      {
        id: 'paid-extras',
        heading: 'What costs money',
        body: [
          'Street and roadside parking near the bay fills up after 4 PM; attended bays typically charge about ₱20–50 per hour.',
          'Sunset and dinner bay cruises departing near the Manila Yacht Club are separately priced by operators and must be booked in advance.',
          'Nearby restaurants, cafes and shops set their own prices — see our food guides for walkable options.',
        ],
      },
    ],
    faq: [
      {
        q: 'How much is the Dolomite Beach entrance fee?',
        a: 'There is no entrance fee — admission is free. Bag checks only screen for single-use plastics.',
      },
      {
        q: 'Do I need to book or buy a ticket?',
        a: 'No. The beach and promenade are public and free to enter year-round.',
      },
      {
        q: 'Can you swim at Dolomite Beach?',
        a: 'Swimming is not permitted in the Dolomite Beach rehabilitation zone. The area is for strolling, sand play and sunset viewing.',
      },
    ],
    related: ['opening-hours', 'dolomite-beach-guide', 'parking', 'where-to-eat-sunset'],
    updated: UPDATED,
  },
  {
    slug: 'dolomite-beach-guide',
    cluster: 'A',
    groupLabel: CLUSTER_LABELS.A,
    title: 'Dolomite Beach Guide — What It Is, Rules & Why the Sand Is White',
    metaTitle: 'Dolomite Beach Manila Guide: White Sand, Rules & Swimming Ban',
    metaDescription:
      'What is Dolomite Beach at Manila Bay? A guide to the white-sand nourishment project along Roxas Boulevard, its visiting rules, plastic restrictions and why swimming is not allowed.',
    intro:
      'Dolomite Beach is the artificial white-sand stretch of Manila Bay Beach along Roxas Boulevard in Malate. It is part of a coastal nourishment and rehabilitation programme, not a natural beach. Here is what visitors should know before going.',
    sections: [
      {
        id: 'what-is',
        heading: 'What Dolomite Beach is',
        body: [
          'It is a widened, sand-nourished section of the Manila Bay shoreline fronting Roxas Boulevard, created as part of Manila Bay rehabilitation works.',
          'The sand is a dolomite-derived material, which gives the shore its distinctive light colour compared with the natural dark bay sediment.',
        ],
      },
      {
        id: 'rules',
        heading: 'Visiting rules to respect',
        body: [
          'Single-use plastics (bottles, wrappers, straws) are restricted at the enclosure to protect the sand and rehabilitation zone — bring reusable containers.',
          'Swimming and wading are not permitted; the water-quality rehabilitation is ongoing. Use the area for strolling, sand play and photographs.',
          'Pets on a leash are generally allowed on the promenade; the Dolomite Beach zone may have separate restrictions during peak hours.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is Dolomite Beach natural or artificial?',
        a: 'It is a sand-nourished, rehabilitated section of Manila Bay Beach rather than a natural white-sand beach.',
      },
      {
        q: 'Why can you not swim there?',
        a: 'The bay is under water-quality rehabilitation; swimming is prohibited for safety and environmental reasons.',
      },
      {
        q: 'Are pets allowed at Dolomite Beach?',
        a: 'Leashed pets are generally allowed on the promenade; check on-site notices for any restrictions in the gated sand zone at peak times.',
      },
    ],
    related: ['entrance-fee', 'opening-hours', 'stewardship', 'best-time-to-visit'],
    updated: UPDATED,
  },
  {
    slug: 'sunset-time',
    cluster: 'A',
    groupLabel: CLUSTER_LABELS.A,
    title: 'Manila Bay Sunset Time & Best Spots to Watch',
    metaTitle: 'Manila Bay Sunset Time 2026: Best Spots & When to Arrive',
    metaDescription:
      'What time is sunset at Manila Baywalk? From about 5:45 PM in Nov–Jan to 6:45 PM in Jun–Jul. Arrive 30–40 minutes early; the Dolomite Beach and seawall north of Remedios Street are top vantage points.',
    intro:
      'Manila Bay is famous for one of the most colourful sunsets in Asia. Because the sun sets over the water rather than behind buildings, the view is wide and unobstructed. Timing is everything.',
    sections: [
      {
        id: 'monthly-times',
        heading: 'Approximate sunset times by season',
        body: [
          'November–January: around 5:45 PM (clearest, most comfortable viewing conditions).',
          'February–April: about 6:05–6:25 PM (hot dry season, frequent fiery clouds).',
          'May–July: about 6:30–6:45 PM (rainy season begins; dramatic storm-cloud sunsets).',
          'August–October: about 5:55–6:35 PM (typhoon season — check the day’s forecast before leaving).',
        ],
      },
      {
        id: 'best-spots',
        heading: 'Best vantage points',
        body: [
          'The Dolomite Beach section offers a wide, open foreground of white sand and water.',
          'The seawall and promenade north of Remedios Street is a favourite for unobstructed horizon shots.',
          'Arrive 30–40 minutes before sunset to secure a bench or a spot on the sand, then stay ~20 minutes after for the blue-hour glow.',
        ],
      },
    ],
    faq: [
      {
        q: 'What time is the sunset at Manila Baywalk?',
        a: 'Roughly 5:45 PM in Nov–Jan up to about 6:45 PM in Jun–Jul. Exact times shift daily.',
      },
      {
        q: 'Where is the best spot to watch the sunset in Manila?',
        a: 'The Baywalk promenade along Roxas Boulevard is among the most unobstructed. The Dolomite Beach section and the seawall north of Remedios Street are the two most popular vantage points.',
      },
      {
        q: 'How early should I arrive?',
        a: 'About 30–40 minutes before sunset to get a good spot, plus 20 minutes after for blue hour.',
      },
    ],
    related: ['photography-guide', 'manila-bay-at-night', 'best-time-to-visit', 'where-to-eat-sunset'],
    updated: UPDATED,
  },
  {
    slug: 'getting-there',
    cluster: 'A',
    groupLabel: CLUSTER_LABELS.A,
    title: 'How to Get to Manila Baywalk (From Airport, Makati & MOA)',
    metaTitle: 'How to Get to Manila Baywalk: LRT, Grab, Jeepney & From NAIA',
    metaDescription:
      'Directions to Baywalk Manila: take LRT-1 to Pedro Gil (5–7 min walk), ride a Grab from NAIA (₱300–500), or a jeepney to Roxas Blvd, Malate. Step-by-step from airport, Makati and MOA.',
    intro:
      'Baywalk Manila sits on Roxas Boulevard in Malate, facing Manila Bay. It is reachable by rail, ride-hailing, bus and jeepney. Below are the most practical routes, starting from where most travellers arrive.',
    sections: [
      {
        id: 'from-airport',
        heading: 'From Ninoy Aquino International Airport (NAIA)',
        body: [
          'From NAIA Terminal 3, a Grab sedan runs about ₱300–500 and takes 30 minutes without traffic, up to 60–90 minutes in peak hours.',
          'Cheaper public option: take the Premium P2P Airport Loop Bus to EDSA Taft, then LRT-1 south to Pedro Gil, then walk 5–7 minutes west to the bay.',
        ],
      },
      {
        id: 'by-rail',
        heading: 'By LRT-1 (light rail)',
        body: [
          'Pedro Gil Station: 5–7 minutes west along Pedro Gil Street to the mid-section of Baywalk.',
          'UN Avenue Station: 10–12 minutes west to the Rizal Park end of Baywalk.',
          'Vito Cruz Station: 15–20 minutes south, good for the CCP Complex and Harbour Square end.',
        ],
      },
      {
        id: 'jeepney-grab',
        heading: 'Jeepney & ride-hailing',
        body: [
          'Jeepneys such as “Malate – Pier South via Mabini” pass Roxas Boulevard; tell the driver “Baywalk / Dolomite Beach” to alight nearby.',
          'Grab from Makati CBD runs about ₱150–250; from SM Mall of Asia about ₱120–180.',
        ],
      },
    ],
    faq: [
      {
        q: 'What LRT station is nearest to Baywalk?',
        a: 'Pedro Gil Station on LRT-1 is closest — about a 5–7 minute walk west to the bay.',
      },
      {
        q: 'How much is a Grab from the airport?',
        a: 'A Grab sedan from NAIA Terminal 3 is about ₱300–500; travel time is 30–90 minutes depending on traffic.',
      },
      {
        q: 'Can I take a jeepney to Baywalk?',
        a: 'Yes. Routes along Roxas Boulevard / Mabini (e.g. “Malate – Pier South”) stop near the promenade.',
      },
    ],
    related: ['parking', 'manila-bay-at-night', 'things-near-me', 'half-day-itinerary'],
    updated: UPDATED,
  },
  {
    slug: 'parking',
    cluster: 'A',
    groupLabel: CLUSTER_LABELS.A,
    title: 'Parking Near Manila Baywalk — Lots, Rates & Tips',
    metaTitle: 'Parking Near Baywalk Manila: Rates, Lots & Where to Park',
    metaDescription:
      'Where to park at Baywalk Manila: Rizal Park lots (₱30–50/hr), Harbour Square / CCP open parking, and Robinsons Place Manila (first 3 hr ₱80). Bayside street parking fills after 4 PM.',
    intro:
      'If you drive, the trick is arriving before the sunset rush. Roadside bayside slots are cheap but fill fast after 4 PM, especially on weekends. These are the reliable options within a short walk or ride.',
    sections: [
      {
        id: 'car-lots',
        heading: 'Car parking options',
        body: [
          'Rizal Park Parking (N. Luneta / Roxas Blvd): about ₱30–50/hr, ₱200–350 for the day — good for the north (Rizal Park) end of Baywalk.',
          'Harbour Square / CCP Open Parking (Pasay): about ₱40–60/hr, usually with spaces on weekday evenings — serves the south end.',
          'Robinsons Place Manila (Pedro Gil / M.H. del Pilar): first 3 hours ₱80, then ₱20/hr — the largest covered option, connected to a mall.',
        ],
      },
      {
        id: 'street-moto',
        heading: 'Street & motorcycle parking',
        body: [
          'Roadside bayside slots are attended during daylight and sunset hours, roughly ₱20–50/hr, but fill quickly after 4 PM.',
          'Motorcycles: designated street bays about ₱20–40/visit; mall parking about ₱30/hr. Lock up and take valuables with you.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is there parking at Baywalk Manila?',
        a: 'There is roadside bayside parking plus nearby lots at Rizal Park, Harbour Square/CCP and Robinsons Place Manila.',
      },
      {
        q: 'How much is parking near Dolomite Beach?',
        a: 'Street bays are about ₱20–50/hr; nearby mall and park lots range ₱30–80 for the first few hours.',
      },
      {
        q: 'Where can I park for free?',
        a: 'There is no reliable free parking directly at the bay; nearby paid lots are the safest choice, especially at sunset.',
      },
    ],
    related: ['getting-there', 'entrance-fee', 'things-near-me', 'manila-bay-at-night'],
    updated: UPDATED,
  },
  {
    slug: 'accessibility',
    cluster: 'A',
    groupLabel: CLUSTER_LABELS.A,
    title: 'Manila Baywalk Accessibility — Wheelchairs, Strollers & Seniors',
    metaTitle: 'Baywalk Manila Accessibility: Wheelchair, Stroller & Senior Tips',
    metaDescription:
      'Is Manila Baywalk wheelchair and stroller friendly? The flat 2-km promenade has ramps and benches; the Dolomite Beach has gentle slopes. Tips for seniors, prams and reduced mobility.',
    intro:
      'The promenade is one of the more accessible waterfront walks in Metro Manila. It is flat, paved and lined with seating, which makes it manageable for wheelchairs, strollers and visitors with reduced mobility.',
    sections: [
      {
        id: 'surface',
        heading: 'Surface & gradients',
        body: [
          'The Roxas Boulevard promenade is a level, paved path with periodic ramps down to the seawall — suitable for wheelchairs and prams.',
          'The Dolomite Beach area is gently sloped sand-and-deck; manual wheelchairs may need assistance over softer sand.',
        ],
      },
      {
        id: 'tips',
        heading: 'Practical accessibility tips',
        body: [
          'Benches and shade are spaced along the route — plan rest stops, especially in the hot dry season (Feb–Apr).',
          'Visit weekday mornings or early evenings to avoid crowds that make navigation harder.',
          'Use the Pedro Gil / UN Avenue LRT ends where footpaths are smoother for the first approach.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is Baywalk wheelchair accessible?',
        a: 'Yes — the flat paved promenade with ramps and benches is generally wheelchair friendly.',
      },
      {
        q: 'Can I bring a stroller?',
        a: 'Yes. The even surface and frequent seating make it comfortable for prams and young children.',
      },
      {
        q: 'Is it suitable for seniors?',
        a: 'The level path, benches and shade make it manageable; go on cooler, less crowded weekday times.',
      },
    ],
    related: ['best-time-to-visit', 'family-itinerary', 'getting-there', 'entrance-fee'],
    updated: UPDATED,
  },
  {
    slug: 'best-time-to-visit',
    cluster: 'A',
    groupLabel: CLUSTER_LABELS.A,
    title: 'Best Time to Visit Manila Baywalk — Season, Weather & Crowds',
    metaTitle: 'Best Time to Visit Manila Baywalk: Season, Weather & Crowds',
    metaDescription:
      'When to visit Baywalk Manila: late afternoon year-round for sunset; Nov–Jan has the clearest skies, Feb–Apr is hot and dry, May–Oct is rainy/typhoon season. Weekday evenings are less crowded.',
    intro:
      'Manila is warm and humid most of the year, so the best time to visit is less about a single month and more about the time of day and the crowd. Here is how the seasons and weather shape your trip.',
    sections: [
      {
        id: 'time-of-day',
        heading: 'Time of day',
        body: [
          'Arrive from around 4:00 PM onwards for the sunset — the headline experience — and stay for blue hour.',
          'Weekday evenings are noticeably less crowded than weekends. Mornings are calm and good for walking and exercise.',
        ],
      },
      {
        id: 'seasons',
        heading: 'Seasons & weather',
        body: [
          'November–January: most comfortable, clearest skies and the best sunset-viewing conditions.',
          'February–April: hot, dry and hazy; bring water and sun protection, but sunsets are often fiery.',
          'May–October: rainy and typhoon season — check PAGASA forecasts; storms can close the bayfront temporarily.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the best time of day to visit Baywalk?',
        a: 'Late afternoon (around 4 PM onwards) to catch the Manila Bay sunset; weekdays are quieter than weekends.',
      },
      {
        q: 'What is the best month to visit Manila?',
        a: 'Nov–Jan offers the most comfortable weather and clearest sunset skies.',
      },
      {
        q: 'Is it safe during rainy season?',
        a: 'Yes if you watch the forecast; typhoons and heavy rain can temporarily affect the bayfront, so plan flexibly.',
      },
    ],
    related: ['sunset-time', 'season-strategy', 'accessibility', 'rainy-day-manila'],
    updated: UPDATED,
  },

  /* ============ CLUSTER B — FOOD & CAFES ============ */
  {
    slug: 'restaurants-near-baywalk',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Restaurants Near Manila Baywalk — Bay View & Seafood',
    metaTitle: 'Restaurants Near Baywalk Manila: Bay-View & Seafood Dining',
    metaDescription:
      'Where to eat near Baywalk Manila: Harbour View Restaurant (seafood, bay view, ~450 m), The Aristocrat (Filipino heritage since 1936), Bistro Remedios and Max’s. Walkable options with prices.',
    intro:
      'A sunset at the bay pairs well with a meal overlooking the water. The strip along Roxas Boulevard and the streets just behind it have long-standing Manila institutions and seafood houses within a short walk.',
    sections: [
      {
        id: 'bay-view',
        heading: 'Waterfront & bay-view dining',
        body: [
          'Harbour View Restaurant (≈1.2 km): seafood and a front-row sunset view over Manila Bay.',
          'The Aristocrat Restaurant (≈250 m): an iconic Manila institution serving chicken barbecue and Filipino comfort classics since 1936.',
        ],
      },
      {
        id: 'casual',
        heading: 'Casual Filipino favourites',
        body: [
          'Bistro Remedios (≈450 m): Malate favourite with outdoor seating, live acoustic sets and gising-gising.',
          'Max’s Restaurant (≈440 m): famous house-made fried chicken and classic Filipino shareables.',
          'Army Navy Burger + Burrito (≈500 m): quick-service burgers and burritos near Remedios Circle.',
        ],
      },
    ],
    faq: [
      {
        q: 'What restaurants have a bay view near Baywalk?',
        a: 'Harbour View Restaurant is the closest waterfront seafood option with a sunset view, about 1.2 km along Roxas Boulevard.',
      },
      {
        q: 'Are there Filipino restaurants near Dolomite Beach?',
        a: 'Yes — The Aristocrat, Bistro Remedios and Max’s are all within roughly 250–500 m of the promenade.',
      },
      {
        q: 'Do I need a reservation?',
        a: 'For waterfront seafood at sunset, a reservation is wise on weekends; casual spots are usually walk-in friendly.',
      },
    ],
    related: ['where-to-eat-sunset', 'seafood-manila-bay', 'late-night-food-malate', 'malate-cafes'],
    updated: UPDATED,
  },
  {
    slug: 'malate-cafes',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Malate Cafes for a Sunset Coffee Near Baywalk',
    metaTitle: 'Malate Cafes Near Baywalk: Where to Get Sunset Coffee',
    metaDescription:
      'Cafes near Baywalk Manila for a sunset coffee: Remedios Circle and M.H. del Pilar strip have espresso bars and air-conditioned spots a short walk from the promenade.',
    intro:
      'Not every visit is about a full meal. If you want a cold brew or a quiet espresso before or after the sunset, Malate’s café cluster behind the bay is an easy stroll.',
    sections: [
      {
        id: 'where',
        heading: 'Where the cafes are',
        body: [
          'The Remedios Circle and M.H. del Pilar / Adriatico Street area, roughly 400–600 m east of the promenade, concentrates most of Malate’s cafes.',
          'These are within a 5–10 minute walk from the bay, making them ideal for a pre-sunset coffee or a post-walk cool-down.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips',
        body: [
          'Go for air-conditioned spots in the hot dry season (Feb–Apr) and open-air ones in the cooler Nov–Jan evenings.',
          'Many cafes double as workspaces by day and quiet date spots by night — match the vibe to your plan.',
        ],
      },
    ],
    faq: [
      {
        q: 'Are there cafes near Baywalk Manila?',
        a: 'Yes, around Remedios Circle and the M.H. del Pilar/Adriatico strip, about a 5–10 minute walk from the promenade.',
      },
      {
        q: 'Where can I get coffee with a sunset view?',
        a: 'Buy coffee to-go from a Malate cafe and walk to the seawall, or pick a bayfront restaurant with drinks service.',
      },
    ],
    related: ['where-to-eat-sunset', 'restaurants-near-baywalk', 'cheap-eats-malate', 'late-night-food-malate'],
    updated: UPDATED,
  },
  {
    slug: 'street-food-baywalk',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Street Food on the Baywalk Strip — What to Try',
    metaTitle: 'Baywalk Street Food: Fish Balls, Kwek-Kwek & Snacks',
    metaDescription:
      'Street food at Baywalk Manila: fish balls, kwek-kwek, isaw, banana cue and cold drinks from local vendors along the strip. Prices, what to order and hygiene tips.',
    intro:
      'Some of the most fun eating at the bay is from the vendors along the promenade. For a few pesos you get classic Filipino merienda while you watch the sky change colour.',
    sections: [
      {
        id: 'what',
        heading: 'What to try',
        body: [
          'Fish balls and squid balls with sweet-and-sour or spicy sauce.',
          'Kwek-kwek (orange-battered quail eggs), isaw (grilled chicken intestines), and banana cue / camote cue (fried caramelised snacks on a stick).',
          'Cold drinks and fresh coconut from roving vendors.',
        ],
      },
      {
        id: 'tips',
        heading: 'Hygiene & etiquette tips',
        body: [
          'Choose busy stalls with high turnover; watch the vendor handle sauce and utensils.',
          'Carry small bills and a reusable cup where possible (single-use plastics are restricted in the Dolomite Beach zone).',
        ],
      },
    ],
    faq: [
      {
        q: 'Is there street food at Baywalk Manila?',
        a: 'Yes — vendors along the strip sell fish balls, kwek-kwek, isaw, banana cue and cold drinks.',
      },
      {
        q: 'How much does street food cost?',
        a: 'Items are typically a few pesos each; it is among the cheapest eating options by the bay.',
      },
    ],
    related: ['cheap-eats-malate', 'filipino-food-to-try', 'where-to-eat-sunset', 'late-night-food-malate'],
    updated: UPDATED,
  },
  {
    slug: 'cheap-eats-malate',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Cheap Eats in Malate Near Baywalk (₱ Budget)',
    metaTitle: 'Cheap Eats in Malate Near Baywalk: Budget Meals Under ₱200',
    metaDescription:
      'Budget food near Baywalk Manila: carinderias, street food and value chains like Army Navy within walking distance. Eat well for under ₱200 per person.',
    intro:
      'Manila is one of the easiest cities in the region to eat well on a tight budget. Around Malate and the bay you can have a filling meal for well under ₱200 per person.',
    sections: [
      {
        id: 'options',
        heading: 'Budget options',
        body: [
          'Carinderias (local eateries) and food stalls around Remedios Circle and the side streets serve rice meals (silog, adobo, sinigang) for modest prices.',
          'Value chains such as Army Navy Burger + Burrito offer quick meals around ₱100–200 near Remedios.',
          'Street food on the Baywalk strip is the lowest-cost snacking.',
        ],
      },
      {
        id: 'timing',
        heading: 'Timing',
        body: [
          'Lunch is the best value window at local eateries; dinner near the bay shifts toward stalls and casual restaurants.',
        ],
      },
    ],
    faq: [
      {
        q: 'Where can I eat cheap near Baywalk?',
        a: 'Remedios Circle carinderias, Baywalk street-food vendors and value chains like Army Navy are all walkable and budget friendly.',
      },
      {
        q: 'Can I eat for under ₱200 near the bay?',
        a: 'Easily — a rice meal at a local eatery or a combo at a value chain fits that budget.',
      },
    ],
    related: ['street-food-baywalk', 'filipino-food-to-try', 'family-restaurants-malate', 'late-night-food-malate'],
    updated: UPDATED,
  },
  {
    slug: 'seafood-manila-bay',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Seafood Dining by Manila Bay — Where to Eat Fresh',
    metaTitle: 'Seafood Near Manila Baywalk: Fresh Catch & Bay-View Grills',
    metaDescription:
      'Seafood restaurants near Manila Bay: Harbour View and other Roxas Boulevard houses serve grilled fish, crabs and prawns with a sunset view. What to order and price expectations.',
    intro:
      'Manila Bay has a long seafood tradition, and the restaurants fronting the water lean into it. Expect grilled fish, crabs, prawns and squid, often enjoyed with the sunset as the backdrop.',
    sections: [
      {
        id: 'where',
        heading: 'Where to go',
        body: [
          'Harbour View Restaurant is the signature waterfront seafood house, about 1.2 km from the Dolomite Beach end.',
          'Other Roxas Boulevard establishments between the bay and the city serve similar grilled and steamed seafood.',
        ],
      },
      {
        id: 'order',
        heading: 'What to order',
        body: [
          'Grilled or steamed fish, garlic prawns, crab and squid are staples.',
          'Prices vary by catch and restaurant; ask for the day’s market price before ordering live/seafood by weight.',
        ],
      },
    ],
    faq: [
      {
        q: 'Where is the best seafood near Manila Bay?',
        a: 'Harbour View Restaurant on Roxas Boulevard is the closest bay-view seafood house, about 1.2 km from the promenade.',
      },
      {
        q: 'Is seafood expensive at the bay?',
        a: 'It ranges widely; ala-carte grilled items are moderate, while premium crab and live seafood by weight cost more — confirm prices first.',
      },
    ],
    related: ['restaurants-near-baywalk', 'where-to-eat-sunset', 'late-night-food-malate', 'filipino-food-to-try'],
    updated: UPDATED,
  },
  {
    slug: 'late-night-food-malate',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Late-Night Food in Malate After the Sunset',
    metaTitle: 'Late-Night Food in Malate Near Baywalk: Where to Eat After Dark',
    metaDescription:
      'Late-night eats near Baywalk Manila: Malate stays lively after sunset with 24-hr convenience stores, night cafes, street stalls and restaurants around Remedios Circle.',
    intro:
      'The bay empties after blue hour, but Malate stays awake. If you want food after a sunset visit, the streets just behind the promenade keep going well into the night.',
    sections: [
      {
        id: 'options',
        heading: 'After-dark options',
        body: [
          'Convenience stores (7-Eleven, Mini Stop) around Remedios Circle are open late for quick bites and drinks.',
          'Night cafes and casual restaurants on Adriatico and M.H. del Pilar serve until late.',
          'Street stalls near the promenade often continue through the evening.',
        ],
      },
      {
        id: 'safety',
        heading: 'Safety note',
        body: [
          'Stick to lit, busy streets; use a ride-hailing app for the trip back, especially after 9 PM.',
        ],
      },
    ],
    faq: [
      {
        q: 'Where can I eat late near Baywalk?',
        a: 'Malate around Remedios Circle has late cafes, convenience stores and street stalls within a short walk.',
      },
      {
        q: 'Is it safe to eat out late in Malate?',
        a: 'Yes in busy, lit areas; use ride-hailing for the return trip and keep valuables secure.',
      },
    ],
    related: ['manila-bay-at-night', 'street-food-baywalk', 'restaurants-near-baywalk', 'malate-cafes'],
    updated: UPDATED,
  },
  {
    slug: 'family-restaurants-malate',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Family Restaurants in Malate Near Baywalk',
    metaTitle: 'Family Restaurants Near Baywalk Manila: Kid-Friendly Dining',
    metaDescription:
      'Kid-friendly restaurants near Baywalk: Max’s, The Aristocrat and Bistro Remedios offer high chairs, broad menus and easy access from the promenade.',
    intro:
      'Travelling with kids? Malate’s long-standing restaurants are forgiving places to sit down — broad Filipino menus, relaxed pacing and easy access from the bay.',
    sections: [
      {
        id: 'picks',
        heading: 'Good family picks',
        body: [
          'Max’s Restaurant (≈440 m): fried chicken and shareable Filipino classics that suit all ages.',
          'The Aristocrat (≈250 m): a heritage canteen-style spot with wide choices and quick service.',
          'Bistro Remedios (≈450 m): hearty local dishes in a relaxed setting.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips with kids',
        body: [
          'Go early (before 6 PM) to catch the sunset and a table without the evening rush.',
          'Bring wipes and small bills; many spots are casual and busy on weekends.',
        ],
      },
    ],
    faq: [
      {
        q: 'Are there kid-friendly restaurants near Baywalk?',
        a: 'Yes — Max’s, The Aristocrat and Bistro Remedios are walkable, relaxed and have broad menus.',
      },
      {
        q: 'Which is best for families with young children?',
        a: 'Max’s is a safe bet for picky eaters; The Aristocrat is quick and casual.',
      },
    ],
    related: ['family-itinerary', 'cheap-eats-malate', 'restaurants-near-baywalk', 'filipino-food-to-try'],
    updated: UPDATED,
  },
  {
    slug: 'rooftop-bars-manila-bay',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Rooftop Bars & Drinks With a Manila Bay View',
    metaTitle: 'Rooftop Bars Near Manila Bay: Drinks With a Sunset View',
    metaDescription:
      'Bars and rooftop drinks with a Manila Bay view: hotels and lounges along Roxas Boulevard and Malate offer sunset cocktails a short ride from Baywalk.',
    intro:
      'If you want the sunset with a cocktail in hand rather than sand between your toes, the hotels and lounges along Roxas Boulevard and in Malate deliver elevated bay views.',
    sections: [
      {
        id: 'where',
        heading: 'Where to look',
        body: [
          'Hotel rooftop bars and lounges along Roxas Boulevard and the adjacent Malate blocks face the bay.',
          'These are a short walk or ride from the promenade; arrive before sunset to secure a west-facing seat.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips',
        body: [
          'Happy hour often starts before sunset — time it for the best value.',
          'Dress codes are generally casual-smart; prices are higher than street food but include the view.',
        ],
      },
    ],
    faq: [
      {
        q: 'Are there rooftop bars with a Manila Bay view?',
        a: 'Yes — several hotel and lounge rooftops along Roxas Boulevard and Malate face the bay.',
      },
      {
        q: 'Can I watch the sunset with a drink?',
        a: 'Absolutely; arrive 30–45 minutes before sunset to get a west-facing seat.',
      },
    ],
    related: ['where-to-eat-sunset', 'restaurants-near-baywalk', 'manila-bay-at-night', 'seafood-manila-bay'],
    updated: UPDATED,
  },
  {
    slug: 'filipino-food-to-try',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Filipino Dishes to Try Near Baywalk & Malate',
    metaTitle: 'Filipino Food to Try Near Baywalk: Adobo, Sinigang & More',
    metaDescription:
      'Must-try Filipino dishes in Malate: adobo, sinigang, sisig, lechon kawali, halo-halo and halo-halo. Where to find them near Baywalk Manila.',
    intro:
      'Use your Baywalk trip as an excuse to sample Filipino classics. Malate’s restaurants serve the greatest hits of the cuisine within walking distance of the bay.',
    sections: [
      {
        id: 'dishes',
        heading: 'Dishes to look for',
        body: [
          'Adobo (braised chicken/pork in vinegar and soy) and sinigang (sour tamarind soup) — the comfort staples.',
          'Sisig (sizzling pork) and lechon kawali (crispy fried pork) for something hearty.',
          'Halo-halo for dessert — shaved ice with sweet beans, fruit and leche flan.',
        ],
      },
      {
        id: 'where',
        heading: 'Where to find them',
        body: [
          'Max’s, The Aristocrat and Bistro Remedios all serve these classics near the promenade.',
        ],
      },
    ],
    faq: [
      {
        q: 'What Filipino food should I try near Baywalk?',
        a: 'Adobo, sinigang, sisig and halo-halo are the essentials, available at nearby Malate restaurants.',
      },
      {
        q: 'Where can I get halo-halo near the bay?',
        a: 'Most Filipino restaurants in Malate, including Max’s and The Aristocrat, serve halo-halo.',
      },
    ],
    related: ['restaurants-near-baywalk', 'cheap-eats-malate', 'family-restaurants-malate', 'seafood-manila-bay'],
    updated: UPDATED,
  },
  {
    slug: 'where-to-eat-sunset',
    cluster: 'B',
    groupLabel: CLUSTER_LABELS.B,
    title: 'Best Places to Eat While Watching the Manila Bay Sunset',
    metaTitle: 'Where to Eat & Watch the Manila Bay Sunset (Baywalk Guide)',
    metaDescription:
      'Combine dinner and the sunset at Manila Bay: Harbour View seafood, bayfront lounges, or grab takeaway and sit on the seawall. Best plan for a sunset meal near Baywalk.',
    intro:
      'The dream combo is a good meal and the famous Manila Bay sunset at the same time. Here is how to pull it off, from waterfront restaurants to a DIY picnic on the seawall.',
    sections: [
      {
        id: 'sit-down',
        heading: 'Sit-down with a view',
        body: [
          'Harbour View Restaurant (≈1.2 km) is the classic bay-view seafood dinner.',
          'Bayfront hotel lounges offer cocktails with the sunset if you prefer drinks to a full meal.',
        ],
      },
      {
        id: 'diy',
        heading: 'DIY seawall picnic',
        body: [
          'Buy takeaway from Malate cafes or convenience stores, then walk to the promenade and sit on a bench or the seawall.',
          'Remember single-use plastics are restricted in the Dolomite Beach zone — bring a reusable bag and cup.',
        ],
      },
    ],
    faq: [
      {
        q: 'Where can I eat while watching the sunset?',
        a: 'Harbour View Restaurant for a bay-view dinner, or grab takeaway and sit on the promenade seawall.',
      },
      {
        q: 'Can I bring my own food to Baywalk?',
        a: 'Yes for the open promenade; avoid single-use plastics in the Dolomite Beach enclosure.',
      },
    ],
    related: ['sunset-time', 'restaurants-near-baywalk', 'rooftop-bars-manila-bay', 'malate-cafes'],
    updated: UPDATED,
  },

  /* ============ CLUSTER C — NEARBY ATTRACTIONS ============ */
  {
    slug: 'rizal-park',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'Rizal Park (Luneta) — Guide From Baywalk',
    metaTitle: 'Rizal Park (Luneta) From Baywalk: Walking Guide & What to See',
    metaDescription:
      'Rizal Park (Luneta) is about 1.8 km north of Baywalk: the Rizal Monument, Kilometre Zero and National Museum cluster. How to walk there and what to see.',
    intro:
      'Rizal Park — also called Luneta — is the historic green heart of Manila, about 1.8 km north of the Baywalk promenade. It pairs naturally with a bay visit.',
    sections: [
      {
        id: 'what',
        heading: 'What to see',
        body: [
          'The Rizal Monument and Kilometre Zero mark the symbolic centre of the Philippines.',
          'Fountains, open lawns, gardens and the adjoining National Museum cluster make it easy to spend an hour or two.',
        ],
      },
      {
        id: 'from-baywalk',
        heading: 'Getting there from Baywalk',
        body: [
          'Walk north along Roxas Boulevard (~1.8 km, flat) or take LRT-1 one stop from Pedro Gil to UN Avenue and walk west.',
          'A short Grab ride covers it in minutes if the weather is hot.',
        ],
      },
    ],
    faq: [
      {
        q: 'How far is Rizal Park from Baywalk?',
        a: 'About 1.8 km north along Roxas Boulevard — a flat walk or a short LRT/Grab ride.',
      },
      {
        q: 'Is Rizal Park free?',
        a: 'The park grounds are free to enter; some museum buildings have their own admission policies.',
      },
    ],
    related: ['national-museum', 'intramuros', 'manila-culture-walk', 'things-to-do-manila-bay'],
    updated: UPDATED,
  },
  {
    slug: 'intramuros',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'Intramuros Walking Route From Baywalk',
    metaTitle: 'Intramuros From Baywalk: Walking Route & Walled City Guide',
    metaDescription:
      'Intramuros, the Walled City, is ~2.6 km from Baywalk: Fort Santiago, Manila Cathedral and San Agustin Church. A walking route and what to prioritise.',
    intro:
      'Intramuros is the Spanish-era Walled City of Manila, about 2.6 km northeast of the bay. Cobblestone streets, forts and centuries-old churches make it the top history stop after a sunset.',
    sections: [
      {
        id: 'route',
        heading: 'Suggested walking route',
        body: [
          'From Baywalk, head north to Rizal Park, then continue into Intramuros via the park’s east edge.',
          'Prioritise Fort Santiago, Manila Cathedral and San Agustin Church, connected by walkable plazas and walls.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips',
        body: [
          'Go early or late to avoid the midday heat; wear comfortable shoes for cobblestones.',
          'Some sites charge admission; the plazas and walls are free to roam.',
        ],
      },
    ],
    faq: [
      {
        q: 'How far is Intramuros from Baywalk?',
        a: 'About 2.6 km northeast; combine it with a walk through Rizal Park.',
      },
      {
        q: 'What is inside Intramuros?',
        a: 'Fort Santiago, Manila Cathedral, San Agustin Church and cobblestone streets — a UNESCO-listed heritage zone.',
      },
    ],
    related: ['rizal-park', 'manila-culture-walk', 'malate-church', 'national-museum'],
    updated: UPDATED,
  },
  {
    slug: 'manila-ocean-park',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'Manila Ocean Park — Guide From Baywalk',
    metaTitle: 'Manila Ocean Park From Baywalk: Tickets, Getting There & Tips',
    metaDescription:
      'Manila Ocean Park is ~1.9 km north of Baywalk: an aquarium complex by Quirino Grandstand with an oceanarium and marine shows. How to get there and what to expect.',
    intro:
      'Manila Ocean Park is an aquarium and marine attraction next to Quirino Grandstand, about 1.9 km north of the promenade — a strong family add-on to a bay visit.',
    sections: [
      {
        id: 'what',
        heading: 'What to expect',
        body: [
          'The iconic oceanarium tunnel and marine shows are the headline experiences.',
          'It suits families and rainy-day plans; allow 2–3 hours.',
        ],
      },
      {
        id: 'getting',
        heading: 'Getting there',
        body: [
          'From Baywalk, walk north along Roxas Boulevard or take a short Grab; it sits by the Quirino Grandstand end of the bay.',
        ],
      },
    ],
    faq: [
      {
        q: 'How far is Manila Ocean Park from Baywalk?',
        a: 'About 1.9 km north along Roxas Boulevard, by Quirino Grandstand.',
      },
      {
        q: 'Is it good for kids?',
        a: 'Yes — the oceanarium and shows are popular with families; budget a few hours.',
      },
    ],
    related: ['family-itinerary', 'rainy-day-manila', 'rizal-park', 'things-to-do-manila-bay'],
    updated: UPDATED,
  },
  {
    slug: 'national-museum',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'National Museum of the Philippines — From Baywalk',
    metaTitle: 'National Museum From Baywalk: Free Entry & What to See',
    metaDescription:
      'The National Museum cluster sits by Rizal Park, ~2 km from Baywalk: Fine Arts, Anthropology and Natural History. Admission policies and what to prioritise.',
    intro:
      'The National Museum cluster — Fine Arts, Anthropology and Natural History — lines the north side of Rizal Park, about 2 km from the bay. It is a cool, calm, culture-packed counterpoint to the sunset.',
    sections: [
      {
        id: 'what',
        heading: 'What to see',
        body: [
          'The National Museum of Fine Arts holds landmark works of Philippine art.',
          'Anthropology and Natural History buildings cover heritage and the natural world.',
        ],
      },
      {
        id: 'practical',
        heading: 'Practical notes',
        body: [
          'Admission policies vary — check the official museum website before you go.',
          'It is an easy, shaded walk from Rizal Park, which itself is an extension of a Baywalk stroll north.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is the National Museum near Baywalk?',
        a: 'It sits by Rizal Park, roughly 2 km north of the promenade.',
      },
      {
        q: 'Is the National Museum free?',
        a: 'Admission policies vary by building and exhibition; verify on the official museum site before visiting.',
      },
    ],
    related: ['rizal-park', 'intramuros', 'manila-culture-walk', 'rainy-day-manila'],
    updated: UPDATED,
  },
  {
    slug: 'malate-church',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'Malate Church (Our Lady of Remedies) Near Baywalk',
    metaTitle: 'Malate Church From Baywalk: History & Walking Distance',
    metaDescription:
      'Malate Church (Our Lady of Remedies) is ~450 m east of Baywalk: a 16th-century baroque church in the heart of Malate. How to walk there and visit respectfully.',
    intro:
      'Our Lady of Remedies Parish — Malate Church — is a 16th-century baroque church about 450 m east of the promenade, making it the closest heritage landmark to the bay.',
    sections: [
      {
        id: 'what',
        heading: 'About the church',
        body: [
          'It is one of the oldest churches in Manila, dedicated to Our Lady of Remedies.',
          'The baroque facade and quiet plaza offer a calm contrast to the busy bayfront.',
        ],
      },
      {
        id: 'visit',
        heading: 'Visiting respectfully',
        body: [
          'Dress modestly and keep quiet during masses.',
          'It is a flat 5–10 minute walk east from the promenade via Remedios Circle.',
        ],
      },
    ],
    faq: [
      {
        q: 'How far is Malate Church from Baywalk?',
        a: 'About 450 m east — a 5–10 minute walk via Remedios Circle.',
      },
      {
        q: 'Can I go inside Malate Church?',
        a: 'Yes, during visiting hours; be respectful during services.',
      },
    ],
    related: ['things-to-do-manila-bay', 'rizal-park', 'intramuros', 'manila-culture-walk'],
    updated: UPDATED,
  },
  {
    slug: 'cultural-center-philippines',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'Cultural Center of the Philippines (CCP) Near Baywalk',
    metaTitle: 'Cultural Center of the Philippines From Baywalk: What to See',
    metaDescription:
      'CCP is ~2.4 km south of Baywalk: a Leandro Locsin-designed arts complex on Roxas Boulevard. Performances, architecture and how to get there.',
    intro:
      'The Cultural Center of the Philippines (CCP) is a national arts complex on Roxas Boulevard, about 2.4 km south of the promenade, designed by National Artist Leandro Locsin.',
    sections: [
      {
        id: 'what',
        heading: 'What to see',
        body: [
          'The brutalist architecture and water-themed plazas are worth a look even without a show.',
          'Theatres host concerts, dance and theatre — check the schedule for performances.',
        ],
      },
      {
        id: 'getting',
        heading: 'Getting there',
        body: [
          'From Baywalk, walk south along Roxas Boulevard or take LRT-1 to Vito Cruz then a short ride, or a quick Grab.',
        ],
      },
    ],
    faq: [
      {
        q: 'How far is CCP from Baywalk?',
        a: 'About 2.4 km south along Roxas Boulevard.',
      },
      {
        q: 'Can I watch a show at CCP?',
        a: 'Yes, it runs a regular performing-arts programme; check listings and book in advance.',
      },
    ],
    related: ['things-to-do-manila-bay', 'manila-yacht-club', 'sm-mall-of-asia', 'getting-there'],
    updated: UPDATED,
  },
  {
    slug: 'sm-mall-of-asia',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'SM Mall of Asia (MOA) From Baywalk',
    metaTitle: 'SM Mall of Asia From Baywalk: Bayfront Mall & MOA Eye',
    metaDescription:
      'SM Mall of Asia is ~4 km south of Baywalk: one of Southeast Asia’s largest malls with its own bayfront promenade and MOA Eye ferris wheel. How to get there.',
    intro:
      'SM Mall of Asia (MOA) is a massive mall about 4 km south of the bay, with its own seaside boulevard and the MOA Eye ferris wheel — a climate-controlled counterpoint to the open promenade.',
    sections: [
      {
        id: 'what',
        heading: 'What to do',
        body: [
          'Shopping, dining, cinema and the MOA Eye ferris wheel along the seaside boulevard.',
          'Good for rainy days, air-conditioning and a different bay view south of the city.',
        ],
      },
      {
        id: 'getting',
        heading: 'Getting there',
        body: [
          'A Grab from Baywalk runs about ₱120–180; follow Seaside Boulevard north via Roxas Boulevard.',
        ],
      },
    ],
    faq: [
      {
        q: 'How far is SM Mall of Asia from Baywalk?',
        a: 'About 4 km south; a Grab is around ₱120–180.',
      },
      {
        q: 'Does MOA have a bay view?',
        a: 'Yes — its seaside boulevard and MOA Eye overlook Manila Bay.',
      },
    ],
    related: ['rainy-day-manila', 'things-to-do-manila-bay', 'getting-there', 'cultural-center-philippines'],
    updated: UPDATED,
  },
  {
    slug: 'manila-yacht-club',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'Manila Yacht Club & Marina Near Baywalk',
    metaTitle: 'Manila Yacht Club & Marina From Baywalk: Sunset Sails',
    metaDescription:
      'The Manila Yacht Club marina sits at the south end of Baywalk: yachts, sunset reflections and bay cruise departures. Viewing tips and how to get there.',
    intro:
      'At the south end of the Baywalk promenade, the Manila Yacht Club marina lines the water with yacht masts — a favourite for sunset silhouettes and the departure point for bay cruises.',
    sections: [
      {
        id: 'view',
        heading: 'Viewing the marina',
        body: [
          'The mast silhouettes and golden water reflections at sunset are a highlight for photographers.',
          'Bay and dinner cruises depart near here — book operators in advance; this site does not sell tickets.',
        ],
      },
      {
        id: 'getting',
        heading: 'Getting there',
        body: [
          'Walk south along the promenade from the Dolomite Beach end, or take a short ride to the yacht club access road.',
        ],
      },
    ],
    faq: [
      {
        q: 'Where is the Manila Yacht Club from Baywalk?',
        a: 'At the south end of the promenade, a walk or short ride from the Dolomite Beach section.',
      },
      {
        q: 'Can I take a sunset cruise?',
        a: 'Cruises depart near the marina; arrange directly with operators ahead of time.',
      },
    ],
    related: ['sunset-time', 'photography-guide', 'cultural-center-philippines', 'things-to-do-manila-bay'],
    updated: UPDATED,
  },
  {
    slug: 'us-embassy-manila',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'US Embassy Manila Area Near Baywalk',
    metaTitle: 'US Embassy Manila From Baywalk: Area Guide & Walking',
    metaDescription:
      'The US Embassy area lies north of Baywalk toward Rizal Park: a landmark along Roxas Boulevard. What is nearby and how to walk the stretch safely.',
    intro:
      'The US Embassy sits on Roxas Boulevard north of the Baywalk promenade, toward Rizal Park. The surrounding stretch is a useful landmark and a pleasant walk north.',
    sections: [
      {
        id: 'area',
        heading: 'The area',
        body: [
          'The embassy grounds mark the northern transition from the bayfront to Rizal Park.',
          'Expect more security presence and official buildings along this part of Roxas Boulevard.',
        ],
      },
      {
        id: 'walk',
        heading: 'Walking the stretch',
        body: [
          'It is a flat, lit walk north from Baywalk; continue to Rizal Park and the National Museum cluster.',
        ],
      },
    ],
    faq: [
      {
        q: 'How far is the US Embassy from Baywalk?',
        a: 'North along Roxas Boulevard, roughly on the way to Rizal Park.',
      },
      {
        q: 'Is it safe to walk there?',
        a: 'The promenade and boulevard are generally busy and lit; stay on the main path.',
      },
    ],
    related: ['rizal-park', 'national-museum', 'getting-there', 'things-to-do-manila-bay'],
    updated: UPDATED,
  },
  {
    slug: 'things-to-do-manila-bay',
    cluster: 'C',
    groupLabel: CLUSTER_LABELS.C,
    title: 'Things to Do Around Manila Bay (Beyond the Sunset)',
    metaTitle: 'Things to Do Around Manila Bay: Baywalk & Nearby Attractions',
    metaDescription:
      'What to do around Manila Bay: watch the sunset, walk the 2-km promenade, visit Rizal Park, Intramuros, Manila Ocean Park, CCP and MOA. A round-up of bayfront activities.',
    intro:
      'The sunset is the headline, but Manila Bay’s frontage packs a lot into a walkable stretch. This round-up connects Baywalk with the landmarks just north and south of it.',
    sections: [
      {
        id: 'on-the-bay',
        heading: 'On and by the bay',
        body: [
          'Walk the 2-km Baywalk promenade, watch the sunset, enjoy street food and the marina.',
          'Visit Malate Church (≈450 m) and the Manila Yacht Club marina at the south end.',
        ],
      },
      {
        id: 'north-south',
        heading: 'North & south extensions',
        body: [
          'North: Rizal Park, the National Museum cluster and Intramuros.',
          'South: the Cultural Center of the Philippines and SM Mall of Asia with its own bayfront.',
        ],
      },
    ],
    faq: [
      {
        q: 'What can I do around Manila Bay besides the sunset?',
        a: 'Walk the promenade, visit Malate Church and the marina, then extend north to Rizal Park/Intramuros or south to CCP/MOA.',
      },
      {
        q: 'Is everything walkable?',
        a: 'Baywalk, Malate Church and the marina are walkable; farther sights are a short LRT or Grab ride.',
      },
    ],
    related: ['rizal-park', 'intramuros', 'manila-ocean-park', 'half-day-itinerary'],
    updated: UPDATED,
  },

  /* ============ CLUSTER D — ITINERARIES & SPECIAL NEEDS ============ */
  {
    slug: 'half-day-itinerary',
    cluster: 'D',
    groupLabel: CLUSTER_LABELS.D,
    title: 'Manila Baywalk Half-Day Itinerary',
    metaTitle: 'Baywalk Manila Half-Day Itinerary: Sunset + One Nearby Stop',
    metaDescription:
      'A half-day Baywalk plan: arrive mid-afternoon, walk the promenade, explore Malate Church or Rizal Park, then watch the sunset and dinner. Step-by-step timing.',
    intro:
      'Short on time? A half-day is enough to enjoy the bay properly. This plan strings together the promenade, one nearby stop and the sunset with comfortable pacing.',
    sections: [
      {
        id: 'plan',
        heading: 'Suggested 4–5 hour plan',
        body: [
          '3:30 PM — arrive and walk the Baywalk promenade from the Dolomite Beach end toward the seawall.',
          '4:30 PM — detour to Malate Church (≈450 m) or stay on the bay for photos.',
          '5:30 PM — secure a sunset spot; sunset ranges 5:45–6:45 PM by season.',
          'After sunset — dinner at a nearby Malate restaurant or street food on the strip.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips',
        body: [
          'Go on a weekday evening to avoid crowds; bring water in the hot season.',
          'Use Grab for the return trip after dark.',
        ],
      },
    ],
    faq: [
      {
        q: 'How long should I spend at Baywalk?',
        a: 'Most visitors spend 1–2 hours; a full sunset visit with dinner extends to about 3 hours.',
      },
      {
        q: 'Can I do Baywalk and Rizal Park in half a day?',
        a: 'Yes — Baywalk plus a walk to Rizal Park (1.8 km north) fits comfortably in a half day.',
      },
    ],
    related: ['sunset-itinerary', 'manila-culture-walk', 'getting-there', 'where-to-eat-sunset'],
    updated: UPDATED,
  },
  {
    slug: 'sunset-itinerary',
    cluster: 'D',
    groupLabel: CLUSTER_LABELS.D,
    title: 'Manila Bay Sunset Itinerary (Evening Focus)',
    metaTitle: 'Manila Bay Sunset Itinerary: Best Evening Plan & Timing',
    metaDescription:
      'An evening-only Baywalk plan built around the sunset: arrive 90 minutes before, photograph blue hour, then dinner or drinks with a bay view.',
    intro:
      'If your only goal is the famous Manila Bay sunset, this tight evening plan maximises the golden and blue hours without rushing.',
    sections: [
      {
        id: 'plan',
        heading: 'Evening plan',
        body: [
          'Arrive 60–90 minutes before sunset (about 4:30–5:00 PM in most seasons) to find a spot.',
          'Shoot golden hour on the Dolomite Beach or seawall north of Remedios Street.',
          'Stay ~20 minutes after sunset for blue hour, then move to dinner or a bay-view lounge.',
        ],
      },
      {
        id: 'timing',
        heading: 'Timing by season',
        body: [
          'Sunset runs from ~5:45 PM (Nov–Jan) to ~6:45 PM (Jun–Jul); check the day’s exact time before leaving.',
        ],
      },
    ],
    faq: [
      {
        q: 'When should I arrive for the sunset?',
        a: 'About 30–40 minutes before sunset to get a spot, plus extra for golden-hour photos.',
      },
      {
        q: 'What is the best sunset spot?',
        a: 'The Dolomite Beach section and the seawall north of Remedios Street are the two most popular.',
      },
    ],
    related: ['sunset-time', 'photography-guide', 'where-to-eat-sunset', 'manila-bay-at-night'],
    updated: UPDATED,
  },
  {
    slug: 'manila-culture-walk',
    cluster: 'D',
    groupLabel: CLUSTER_LABELS.D,
    title: 'Manila Culture Walk: Intramuros + Rizal Park + Baywalk',
    metaTitle: 'Manila Culture Walk: Intramuros, Rizal Park & Baywalk',
    metaDescription:
      'A full-day Manila walk: Intramuros forts and churches, Rizal Park and National Museum, ending with the Baywalk sunset. Route, timing and tips.',
    intro:
      'For history lovers, this full-day walk connects Manila’s Spanish-era core with its national parks and finishes at the bay — a natural north-to-south (or reverse) line.',
    sections: [
      {
        id: 'route',
        heading: 'Full-day route',
        body: [
          'Morning — Intramuros: Fort Santiago, Manila Cathedral, San Agustin Church.',
          'Midday — Rizal Park and the National Museum cluster (cool, shaded).',
          'Late afternoon to evening — walk south to Baywalk and end with the sunset.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips',
        body: [
          'Start early to beat the heat; wear good walking shoes for Intramuros’ cobblestones.',
          'Use LRT-1 or Grab between clusters if you prefer less walking.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I combine Intramuros and Baywalk in one day?',
        a: 'Yes — they are about 2.6 km apart and connect naturally via Rizal Park and the National Museum.',
      },
      {
        q: 'How long is the culture walk?',
        a: 'A relaxed full day with breaks; compress to a half day if you skip museum interiors.',
      },
    ],
    related: ['intramuros', 'rizal-park', 'national-museum', 'half-day-itinerary'],
    updated: UPDATED,
  },
  {
    slug: 'family-itinerary',
    cluster: 'D',
    groupLabel: CLUSTER_LABELS.D,
    title: 'Baywalk Family Itinerary (With Kids)',
    metaTitle: 'Baywalk Family Itinerary: Kid-Friendly Bay & Manila Plan',
    metaDescription:
      'A family plan for Baywalk Manila: flat promenade, shade and benches, Malate Church, Manila Ocean Park and a kid-friendly dinner. Stroller and heat tips.',
    intro:
      'Travelling with children? The flat, benched promenade is stroller-friendly, and nearby attractions like Manila Ocean Park keep kids engaged. This plan paces the day around shade and rest.',
    sections: [
      {
        id: 'plan',
        heading: 'Family plan',
        body: [
          'Late afternoon — easy walk on the promenade with frequent bench breaks.',
          'Add Manila Ocean Park (≈1.9 km north) for marine life if kids need more activity.',
          'Dinner at a family restaurant like Max’s or The Aristocrat near Malate.',
        ],
      },
      {
        id: 'tips',
        heading: 'Stroller & heat tips',
        body: [
          'Go weekdays and in the cooler Nov–Jan window; bring hats, water and sun protection.',
          'The paved, ramped promenade is manageable with prams.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is Baywalk good for kids?',
        a: 'Yes — flat, benched and stroller-friendly, with nearby Ocean Park and family restaurants.',
      },
      {
        q: 'What is the best time with children?',
        a: 'Late afternoon on a cooler weekday, ending with an early sunset dinner.',
      },
    ],
    related: ['accessibility', 'manila-ocean-park', 'family-restaurants-malate', 'rainy-day-manila'],
    updated: UPDATED,
  },
  {
    slug: 'rainy-day-manila',
    cluster: 'D',
    groupLabel: CLUSTER_LABELS.D,
    title: 'Rainy Day Backups Near Baywalk (Manila)',
    metaTitle: 'Rainy Day Near Baywalk: Indoor Things to Do in Manila',
    metaDescription:
      'Manila rainy-day plans near Baywalk: National Museum, Manila Ocean Park, SM Mall of Asia and mall dining. What to do when the bayfront is wet.',
    intro:
      'Manila’s May–October rainy and typhoon season can wash out a bayfront plan. These indoor options are a short ride from Baywalk and keep the day alive.',
    sections: [
      {
        id: 'indoor',
        heading: 'Indoor options',
        body: [
          'National Museum cluster (by Rizal Park) for art, anthropology and natural history.',
          'Manila Ocean Park (≈1.9 km) for the oceanarium and shows.',
          'SM Mall of Asia (≈4 km) for shopping, dining and the MOA Eye.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips',
        body: [
          'Check PAGASA alerts before travelling in typhoon season; storms can temporarily close the bayfront.',
          'Keep a ride-hailing app handy — walking the open promenade is unpleasant in heavy rain.',
        ],
      },
    ],
    faq: [
      {
        q: 'What can I do near Baywalk on a rainy day?',
        a: 'The National Museum, Manila Ocean Park and SM Mall of Asia are all short rides away and indoors.',
      },
      {
        q: 'Is Baywalk open in the rain?',
        a: 'The promenade stays open, but heavy rain and typhoon alerts can make it unsafe or temporarily closed — have an indoor backup.',
      },
    ],
    related: ['sm-mall-of-asia', 'national-museum', 'manila-ocean-park', 'best-time-to-visit'],
    updated: UPDATED,
  },
  {
    slug: 'photography-guide',
    cluster: 'D',
    groupLabel: CLUSTER_LABELS.D,
    title: 'Manila Bay Sunset Photography Guide',
    metaTitle: 'Manila Bay Sunset Photography: Best Spots, Settings & Timing',
    metaDescription:
      'How to photograph the Manila Bay sunset: best spots (Dolomite Beach, seawall north of Remedios), camera settings, golden/blue hour timing and composition tips.',
    intro:
      'Manila Bay is a photographer’s sunset — wide water horizon, dramatic clouds and city silhouettes. This guide covers where to stand and how to shoot it.',
    sections: [
      {
        id: 'spots',
        heading: 'Best shooting spots',
        body: [
          'Dolomite Beach: white-sand foreground with the sky reflection.',
          'Seawall north of Remedios Street: unobstructed horizon and city skyline.',
          'Manila Yacht Club marina: mast silhouettes and golden water.',
        ],
      },
      {
        id: 'settings',
        heading: 'Settings & timing',
        body: [
          'Shoot 30–40 minutes before sunset for golden hour; stay ~20 minutes after for blue hour.',
          'Use a low ISO, small aperture (f/8–f/11) for sunstar and depth, and a tripod for blue hour.',
          'Expose for the sky to avoid blowing out highlights; bracket if your camera allows.',
        ],
      },
    ],
    faq: [
      {
        q: 'Where is the best place to photograph the Manila Bay sunset?',
        a: 'The Dolomite Beach section, the seawall north of Remedios Street, and the yacht club marina are the top spots.',
      },
      {
        q: 'What time should I shoot?',
        a: 'Arrive 30–40 minutes before sunset for golden hour and stay for blue hour after.',
      },
    ],
    related: ['sunset-time', 'manila-yacht-club', 'manila-bay-at-night', 'things-to-do-manila-bay'],
    updated: UPDATED,
  },
  {
    slug: 'manila-bay-at-night',
    cluster: 'D',
    groupLabel: CLUSTER_LABELS.D,
    title: 'Manila Baywalk at Night — Safety & What to Do',
    metaTitle: 'Baywalk Manila at Night: Is It Safe? Tips & Night Activities',
    metaDescription:
      'Is Manila Baywalk safe at night? The promenade is lit and patrolled with normal crowds until ~9 PM. Tips: stay lit, use ride-hailing, keep valuables secure.',
    intro:
      'After sunset the bay takes on a different mood. The promenade is lit and usually busy until around 9 PM. Here is how to enjoy it safely after dark.',
    sections: [
      {
        id: 'safe',
        heading: 'Is it safe at night?',
        body: [
          'The promenade is lit and patrolled, with normal evening crowds until about 9 PM.',
          'After that it quiets down — walk the main promenade, stay in lit areas, keep valuables out of sight.',
        ],
      },
      {
        id: 'do',
        heading: 'What to do at night',
        body: [
          'Street-food stalls, drink vendors, kalesa (horse carriage) stands and convenience stores stay active.',
          'The Dolomite Beach enclosure is cleared at close and cannot be entered after dark; night activity is on the open promenade.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is Manila Baywalk safe at night?',
        a: 'The lit, patrolled promenade is fine until around 9 PM; after that, stick to lit main paths and use ride-hailing for the return.',
      },
      {
        q: 'Can I enter Dolomite Beach at night?',
        a: 'No — the gated sand section is cleared at close and is not open after dark.',
      },
    ],
    related: ['late-night-food-malate', 'getting-there', 'sunset-itinerary', 'opening-hours'],
    updated: UPDATED,
  },
  {
    slug: 'things-near-me',
    cluster: 'D',
    groupLabel: CLUSTER_LABELS.D,
    title: 'Things Near Baywalk Manila (Local Intent Guide)',
    metaTitle: 'Things Near Baywalk Manila: What’s Close & How to Get There',
    metaDescription:
      '“Baywalk near me” answered: restaurants, churches, parks and transport within 2 km of the promenade, with walking times and how to get there.',
    intro:
      'Searching “Baywalk near me”? This page aggregates the closest useful things — food, landmarks and transport — within roughly 2 km of the promenade, with how to reach each.',
    sections: [
      {
        id: 'within-1km',
        heading: 'Within ~1 km',
        body: [
          'Malate Church (≈450 m) — a 16th-century baroque church, 5–10 min walk.',
          'Street food and casual dining along the Baywalk strip and Remedios Circle.',
          'The Manila Yacht Club marina at the south end of the promenade.',
        ],
      },
      {
        id: 'within-2km',
        heading: 'Within ~2 km',
        body: [
          'Rizal Park / Luneta (≈1.8 km north) and the National Museum cluster.',
          'Pedro Gil LRT-1 Station (≈5–7 min walk) for rail connections.',
          'Robinsons Place Manila for parking, malls and food.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is near Baywalk Manila?',
        a: 'Within ~1 km: Malate Church, street food and the marina. Within ~2 km: Rizal Park, the National Museum and LRT-1 Pedro Gil.',
      },
      {
        q: 'How do I get around near Baywalk?',
        a: 'On foot for the bay and Malate; LRT-1 from Pedro Gil or Grab for farther sights.',
      },
    ],
    related: ['getting-there', 'parking', 'malate-church', 'rizal-park'],
    updated: UPDATED,
  },
];

export function getTopic(slug: string): TopicContent | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export const TOPIC_SLUGS: string[] = TOPICS.map((t) => t.slug);
