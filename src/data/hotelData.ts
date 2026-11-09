import { RoomType, MenuItem, EventVenue, GalleryItem } from '../types';

export const HOTEL_INFO = {
  name: 'Shaan-E-Punjab Hotel & Resort',
  shortName: 'Shaan-E-Punjab',
  tagline: 'An Experience of Timeless Elegance',
  subTagline: 'Stay in Comfort. Savour Every Moment. Celebrate in Style.',
  address: 'NH-19 (Grand Trunk Road), Near Topchanchi Lake, Dhanbad, Jharkhand 828402, India',
  phonePrimary: '+91 94311 22880',
  phoneSecondary: '+91 94311 22881',
  email: 'info@shaanepunjabhotel.com',
  reservationEmail: 'reservations@shaanepunjabhotel.com',
  whatsapp: '+919431122880',
  googleMapsUrl: 'https://maps.google.com/?q=Topchanchi+Dhanbad+Jharkhand',
  coordinates: {
    lat: '23.9056° N',
    lng: '86.2089° E'
  },
  landmarks: [
    { name: 'Topchanchi Lake & Wildlife Sanctuary', distance: '4.2 km (8 mins)' },
    { name: 'Parasnath Railway Station / Isri Bazar', distance: '16.5 km (20 mins)' },
    { name: 'Shikharji (Parasnath Hills) Jain Pilgrimage Base', distance: '22 km (30 mins)' },
    { name: 'Dhanbad Railway Junction & City Center', distance: '34 km (45 mins)' },
    { name: 'Bokaro Steel City', distance: '48 km (1 hr 10 mins)' }
  ],
  policies: {
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    cancellation: 'Free cancellation up to 24 hours prior to scheduled check-in. One night charge applies within 24 hours.',
    idRequirement: 'Valid government-issued photo ID (Aadhaar, Passport, Driving License) required at check-in for all adult guests.',
    petPolicy: 'Service animals welcome; select garden suites accommodate pets upon advance notice.'
  }
};

export const ROOMS_DATA: RoomType[] = [
  {
    id: 'deluxe-ac',
    name: 'Deluxe AC Room',
    tagline: 'Quiet comfort engineered for restful highway halts and business stays',
    pricePerNight: 2450,
    occupancy: '2 Adults, 1 Child',
    bedType: 'Queen Comfort Bed',
    sizeSqFt: 280,
    description: 'Thoughtfully designed with warm wood paneling, premium sound-insulation from highway traffic, climate control, and crisp high-thread-count linens for deep rest.',
    amenities: [
      'Split Air Conditioning',
      'High-Speed Wi-Fi',
      '43-inch Smart LED TV',
      '24/7 Geyser Hot Water',
      'Dedicated Work Desk',
      'In-Room Tea & Coffee Maker',
      'Complimentary Mineral Water'
    ],
    imageUrl: '/assets/aistudio/room_67209ceb.jpeg',
    featured: true
  },
  {
    id: 'executive-king',
    name: 'Executive King Suite',
    tagline: 'Expansive private retreat with plush seating and garden vistas',
    pricePerNight: 3650,
    occupancy: '2 Adults, 2 Children',
    bedType: 'Royal King Bed',
    sizeSqFt: 420,
    description: 'Generously proportioned suite featuring an adjoining sitting lounge, floor-to-ceiling drapery, premium luxury mattress, custom luggage wardrobe, and view of the resort lawns.',
    amenities: [
      'Separate Living & Seating Area',
      'King-Size Pillow-Top Bed',
      '50-inch 4K Smart TV',
      'Minibar & Chiller',
      'Express In-Room Dining Service',
      'Luxury Herbal Toiletries',
      'Panoramic Lawn View'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'royal-grand-suite',
    name: 'Shaan-E-Punjab Royal Suite',
    tagline: 'The pinnacle of royal hospitality with master bedroom and celebration lounge',
    pricePerNight: 5400,
    occupancy: '3 Adults or 2 Adults + 2 Kids',
    bedType: 'Grand Emperor Bed',
    sizeSqFt: 650,
    description: 'Our flagship suite offering antique gold accents, teak carved furnishings, luxury soaking bathroom, dining table, and dedicated butler call service.',
    amenities: [
      'Master Bedroom + Formal Living Room',
      'Emperor 78-inch Mattress',
      'Marble Bath with Rain Shower',
      'Dedicated Attendant Support',
      'Complimentary Highway High-Tea',
      'VIP Reserved Lawn Parking',
      'Soundproof Triple Glazing'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'family-cottage',
    name: 'Heritage Family Cottage',
    tagline: 'Interconnecting spacious layout ideal for families and wedding entourages',
    pricePerNight: 4800,
    occupancy: '4 Adults, 2 Children',
    bedType: 'Two Double Beds',
    sizeSqFt: 580,
    description: 'Designed specifically for family road travelers and wedding party guests with double sleeping quarters, dual luggage storage, and direct ground-level lawn access.',
    amenities: [
      'Two Separate Bedding Enclosures',
      'Direct Lawn & Veranda Access',
      'Dual Luggage Storage Wardrobes',
      'Child-Friendly Furnishings',
      '24/7 Room Service Call',
      'Complimentary Morning Punjabi Breakfast'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    featured: false
  }
];

export const MENU_CATEGORIES = [
  { id: 'tandoor', label: 'Tandoor & Charcoal Kebabs' },
  { id: 'starters', label: 'Royal Appetizers' },
  { id: 'main-course', label: 'Curries & Punjabi Classics' },
  { id: 'breads', label: 'Tandoori Roti & Naan' },
  { id: 'desserts-beverages', label: 'Desserts & Royal Lassi' }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    category: 'tandoor',
    name: 'Bhatti Da Murgh (Smoked Tandoori Chicken)',
    description: 'Tender chicken marinated for 18 hours in stone-ground mustard oil, hung curd, and whole spices, charred in authentic clay tandoor.',
    price: 380,
    isVeg: false,
    isChefSpecial: true
  },
  {
    id: 'm2',
    category: 'tandoor',
    name: 'Paneer Tikka Shaan-E-Khas',
    description: 'Thick cubes of fresh malai paneer stuffed with mint chutney and spiced peppers, roasted over slow glowing charcoal.',
    price: 310,
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 'm3',
    category: 'tandoor',
    name: 'Dahi Ke Kebab',
    description: 'Silken hung yoghurt discs infused with green cardamom, roasted cumin, and coriander, crisp golden outer crust.',
    price: 290,
    isVeg: true
  },
  {
    id: 'm4',
    category: 'tandoor',
    name: 'Mutton Seekh Kebab Peshawari',
    description: 'Minced lamb blended with marrow juices, crushed spices, and ginger, finished on tandoor skewers with spiced butter glaze.',
    price: 460,
    isVeg: false,
    isChefSpecial: true
  },
  {
    id: 'm5',
    category: 'main-course',
    name: 'Dal Makhani Shaan-E-Punjab',
    description: 'Slow-simmered black urad lentils cooked overnight on clay tandoor embers with churned white makhan, tomatoes, and kasuri methi.',
    price: 280,
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 'm-mushroom-masala',
    category: 'main-course',
    name: 'Mushroom Masala',
    description: 'Plump farm-fresh button mushrooms slow-simmered in rich spiced onion-tomato reduction with roasted cumin, bell peppers & fresh coriander.',
    price: 260,
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 'm-chicken-butter-masala',
    category: 'main-course',
    name: 'Chicken Butter Masala',
    description: 'Tender roasted chicken simmered in slow-reduced silky tomato-cashew makhani gravy, churned butter & crushed kasuri methi.',
    price: 299,
    isVeg: false,
    isChefSpecial: true
  },
  {
    id: 'm-chilli-paneer',
    category: 'tandoor',
    name: 'Chilli Paneer (Dry / Gravy)',
    description: 'Crispy golden paneer cubes tossed in high-heat wok with crunchy bell peppers, slit green chillies, garlic & dark soy glaze.',
    price: 260,
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 'm-chilli-baby-corn',
    category: 'tandoor',
    name: 'Chilli Baby Corn',
    description: 'Crispy batter-crusted tender baby corn spears tossed with spring onions, minced garlic, capsicum & spicy oriental schezwan sauce.',
    price: 230,
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 'm-chicken-karahi',
    category: 'main-course',
    name: 'Chicken Karahi',
    description: 'Robust wok-tossed chicken cooked on high flame with crushed coriander seeds, fresh bell peppers, diced tomatoes & slivered ginger.',
    price: 340,
    isVeg: false,
    isChefSpecial: true
  },
  {
    id: 'm-handi-mutton',
    category: 'main-course',
    name: 'Mutton Curries & Handi Mutton',
    description: 'Authentic Champaran style clay pot Handi Mutton & rustic tariwala Punjabi goat curry slow-stewed with whole garlic bulbs & bone marrow broth.',
    price: 390,
    isVeg: false,
    isChefSpecial: true
  },
  {
    id: 'm6',
    category: 'main-course',
    name: 'Butter Chicken Grand Trunk Style',
    description: 'Charcoal-grilled tandoori chicken simmered in a velvety sauce of ripe vine tomatoes, cashew butter, and royal mace aromatics.',
    price: 440,
    isVeg: false,
    isChefSpecial: true
  },
  {
    id: 'm7',
    category: 'main-course',
    name: 'Paneer Lababdar',
    description: 'Fresh cottage cheese simmered in a coarse onion-tomato reduction with crumbled khoya and toasted cumin.',
    price: 330,
    isVeg: true
  },
  {
    id: 'm8',
    category: 'main-course',
    name: 'Dhabha Ghost Tariwala',
    description: 'Authentic rustic highway goat curry stewed with whole cloves, black cardamom, bone broth, and caramelised onions.',
    price: 490,
    isVeg: false,
    isChefSpecial: true
  },
  {
    id: 'm9',
    category: 'main-course',
    name: 'Subz Panchmel Biryani',
    description: 'Fragrant aged long-grain basmati layered with seasonal farm vegetables, saffron milk, fried onions, and served with burrani raita.',
    price: 290,
    isVeg: true
  },
  {
    id: 'm10',
    category: 'breads',
    name: 'Amritsari Chur-Chur Naan with Desi Makhan',
    description: 'Multi-layered flaky bread stuffed with spiced potatoes and paneer, crushed hot with dollops of melted butter.',
    price: 110,
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 'm11',
    category: 'breads',
    name: 'Garlic & Herb Butter Naan',
    description: 'Fresh tandoor-baked leavened flatbread brushed with charred garlic cloves, coriander, and yellow butter.',
    price: 85,
    isVeg: true
  },
  {
    id: 'm12',
    category: 'breads',
    name: 'Missi Roti with Ajwain',
    description: 'Nutritious gram flour and whole wheat flatbread scented with carom seeds, fresh fenugreek, and green chilies.',
    price: 55,
    isVeg: true
  },
  {
    id: 'm13',
    category: 'desserts-beverages',
    name: 'Royal Shaan-E-Punjab Malai Lassi',
    description: 'Thick churned sweet curd served in chilled earthen kulhad topped with thick clotted cream (malai), pistachios, and saffron threads.',
    price: 130,
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 'm14',
    category: 'desserts-beverages',
    name: 'Gulab Jamun Flambé with Rabri',
    description: 'Warm golden milk dumplings soaked in cardamom saffron syrup, served with slow-reduced thick condensed rabri.',
    price: 160,
    isVeg: true
  },
  {
    id: 'm15',
    category: 'desserts-beverages',
    name: 'Highway Kadak Masala Chai',
    description: 'Freshly brewed strong Assam tea with crushed ginger, green cardamom, lemongrass, and buffalo milk in clay kulhad.',
    price: 50,
    isVeg: true
  }
];

export const VENUES_DATA: EventVenue[] = [
  {
    id: 'marriage-lawn',
    name: 'The Royal Grand Lawn & Marriage Garden',
    type: 'Outdoor Celebration Ground',
    capacity: 'Up to 1,500 Guests',
    description: 'Expansive lush Bermuda grass lawn equipped with dedicated stage riser, illuminated wedding mandap pavilion, separate live buffet counters, and ambient tree illumination.',
    features: [
      'Massive 25,000 sq. ft. landscaped turf area',
      'Grand wedding entrance gateway & car drop-off portico',
      'Heavy-duty 3-phase power backup for sound & stage lights',
      'Dedicated bridal preparation suite with attached AC bath',
      'Ample secure parking for 200+ passenger cars'
    ],
    imageUrl: '/assets/aistudio/IMG_a4a8ff32-02b3-4e8e-a10b-99a98a7b2ab8_c3e5d16a.jpg'
  },
  {
    id: 'banquet-hall',
    name: 'Kohinoor AC Banquet Hall',
    type: 'Indoor Grand Hall',
    capacity: '200 to 450 Guests',
    description: 'Fully air-conditioned indoor ballroom with crystal chandeliers, acoustic ceiling, royal carpeted flooring, and flexible partition options for sangeet, ring ceremonies, and receptions.',
    features: [
      'Centralized high-tonnage climate control',
      'Built-in audio-visual podium & digital projection',
      'Pre-function cocktail & dining reception foyer',
      'Customizable floral & gold stage drapery decor',
      'Direct elevator & wheelchair accessible access'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'conference-hall',
    name: 'Punjab Executive Boardroom & Banquet',
    type: 'Corporate & Intimate Gathering',
    capacity: '30 to 80 Guests',
    description: 'Tailored for corporate off-sites, mining & industrial dealer meets, birthday parties, and family anniversaries with conference technology and gourmet catering.',
    features: [
      'High-definition motorized presentation display',
      'Wireless collar & handheld microphonic systems',
      'High-speed dedicated leased-line Wi-Fi for video calls',
      'Flexible U-shape, classroom, or round-table seating',
      'Dedicated tea/coffee and live highway snack service'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-shaan-front-night',
    title: 'Grand Night Facade & King’s Family Lounge',
    category: 'property',
    categoryLabel: 'Hotel Facade & Night',
    description: 'The illuminated night elevation of Shaan-E-Punjab Hotel & Resort on NH-19, showcasing the illuminated red and gold marquee, King’s Family Lounge, and grand entrance.',
    imageUrl: '/assets/aistudio/shaan_front_35f0a5bc.jpeg',
    originalFileName: 'shaan front.jpeg',
    highlight: 'Grand Night Facade',
    location: 'Main Hotel & Resort Entrance'
  },
  {
    id: 'g-highway-aerial-facade',
    title: 'Shaan-E-Punjab 360° Drone Aerial Panorama',
    category: 'property',
    categoryLabel: 'Aerial Panorama & Resort',
    description: 'Breathtaking 360° high-angle drone aerial view of Shaan-E-Punjab Hotel & Resort complex on NH-19 Topchanchi, capturing the multi-tier blue pavilion roofs, signature red-grey architectural elevation, highway frontage, and dense tropical mountain greenery.',
    imageUrl: '/assets/aistudio/360_2adab2df.jpeg',
    originalFileName: '360.jpeg',
    highlight: '360° Aerial Panorama',
    location: 'NH-19 Topchanchi Aerial Vista'
  },
  {
    id: 'g-hotel-night-elevation',
    title: 'Shaan-E-Punjab Illuminated Night Elevation & Parking',
    category: 'property',
    categoryLabel: 'Night Facade & Parking',
    description: 'Spectacular wide-angle night view of Shaan-E-Punjab Hotel & Family Restaurant along NH-19, featuring illuminated golden marquees, iconic totem entrance sign, and spacious secure guest parking.',
    imageUrl: '/assets/aistudio/IMG_c02d78cf-ed28-4460-ad7d-8ea08abab28b_ac376005.jpg',
    originalFileName: 'IMG_c02d78cf-ed28-4460-ad7d-8ea08abab28b.jpg',
    highlight: 'Illuminated Night Elevation',
    location: 'NH-19 Main Entrance & Parking'
  },
  {
    id: 'g-day-grand-facade',
    title: 'Shaan-E-Punjab Grand Entrance & Family Restaurant',
    category: 'property',
    categoryLabel: 'Main Entrance & Facade',
    description: 'Vivid daytime perspective of Shaan-E-Punjab Hotel & Family Restaurant displaying the golden Khanda crest, ornate jali lattice arches, modern grey-red facade, and Dhaba, Lodge & Kids Zone entrances.',
    imageUrl: '/assets/aistudio/file_000000009be08211a0f0bf9be3f373f5_9ce6674e.png',
    originalFileName: 'file_000000009be08211a0f0bf9be3f373f5.png',
    highlight: 'Grand Daytime Entrance',
    location: 'Main Highway Entrance & Porch'
  },
  {
    id: 'g-spacious-guest-parking',
    title: 'Vast Paved Secure Guest Parking Grounds',
    category: 'property',
    categoryLabel: 'Parking & Grounds',
    description: 'Expansive dual-color interlocking paved parking compound nestled amidst verdant tropical foliage, offering generous, secure, and hassle-free vehicle parking for buses, SUVs, and tourist cars.',
    imageUrl: '/assets/aistudio/file_0000000001408211b7b0bb731bcb094f_bfda4747.png',
    originalFileName: 'file_0000000001408211b7b0bb731bcb094f.png',
    highlight: 'Secure Paved Parking',
    location: 'Dedicated Guest Parking Compound'
  },
  {
    id: 'g-buddha-garden-authentic',
    title: 'Zen Golden Buddha Night Sanctuary',
    category: 'property',
    categoryLabel: 'Gardens & Night Lights',
    description: 'Authentic illuminated golden Buddha statue seated in serene meditation under sculpted ornamental foliage, bathed in sapphire blue ambient uplighting with garden lanterns.',
    imageUrl: '/assets/aistudio/IMG-20261101-WA0009_f886384c.jpg',
    originalFileName: 'IMG-20261101-WA0009.jpg',
    highlight: 'Illuminated Zen Sanctuary',
    location: 'Resort Garden Courtyard'
  },
  {
    id: 'g-amenity-totem',
    title: 'Illuminated 24/7 Highway Directory Pylon',
    category: 'property',
    categoryLabel: 'Night Ambiance',
    description: 'Multi-colored luminous neon totem sign highlighting Parking, AC Rooms, Family Restaurant, Kids Zone, Marriage Garden, Park & Conference Hall.',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shaan 8.webp',
    highlight: '24/7 Highway Landmark',
    location: 'NH-19 Frontage'
  },
  {
    id: 'g-palm-promenade',
    title: 'Royal Palm Promenade & Walkway',
    category: 'property',
    categoryLabel: 'Resort & Lawns',
    description: 'Paved interlocking stone walkway bordered by soaring royal palms and tropical greenery leading into the resort grounds.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shaan 9.webp',
    highlight: 'Tropical Walkway',
    location: 'Lawn Avenue'
  },
  {
    id: 'g-pool-deck',
    title: 'Resort Architecture, Courtyard & Wooden Bridge',
    category: 'property',
    categoryLabel: 'Resort Architecture',
    description: 'Modern multi-story hotel wing with warm wood slats, outdoor water features, courtyard swimming pool, and timber bridge.',
    imageUrl: '/assets/aistudio/shaan_5_8d752caa.webp',
    originalFileName: 'shaan 5.webp',
    highlight: 'Courtyard & Pool',
    location: 'Resort West Wing'
  },
  {
    id: 'g-king-suite',
    title: 'Executive Deluxe King Suite',
    category: 'rooms',
    categoryLabel: 'Rooms & Stay',
    description: 'Sophisticated luxury bedroom with tufted tan leather headboard, ambient cove lighting, split AC, and flat-screen entertainment.',
    imageUrl: '/assets/aistudio/IMG-20261101-WA0004_a56bd883.jpg',
    originalFileName: 'IMG-20261101-WA0004.jpg',
    highlight: 'Restorative Comfort',
    location: 'Executive Floor'
  },
  {
    id: 'g-cheese-balls',
    title: 'Signature Cheese Balls & Heritage Punjabi Fare',
    category: 'restaurant',
    categoryLabel: 'Restaurant & Dining',
    description: 'Celebrated house specialty crispy cheese balls served piping hot with secret herbs, representing "Hospitality with Heritage".',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shann2.webp',
    highlight: 'Chef Signature Dish',
    location: 'Shaan-E-Punjab Kitchen'
  },
  {
    id: 'g-family-dining-hall',
    title: 'King’s Family Restaurant & Royal Dining Hall',
    category: 'restaurant',
    categoryLabel: 'Restaurant & Dining',
    description: 'Spacious royal dining hall featuring blue velvet banquet booths, sculptural layered ceiling, warm wood flooring, and majestic Punjabi warrior wall art.',
    imageUrl: '/assets/aistudio/file_00000000de5082118493e01f88e08e61_ccda5409.png',
    originalFileName: 'file_00000000de5082118493e01f88e08e61_ccda5409.png',
    highlight: 'Royal Dining Hall',
    location: 'King’s Family Restaurant'
  },
  {
    id: 'g-twilight-facade',
    title: 'Shaan-E-Punjab Hotel Twilight Facade',
    category: 'property',
    categoryLabel: 'Property & Facade',
    description: 'The illuminated grand entrance and welcoming highway frontage on NH-19 Topchanchi with guarded night parking.',
    imageUrl: '/assets/aistudio/shaan_1_688cd22a.jpg',
    originalFileName: 'shaan 1.jpg',
    highlight: 'Night Arrival',
    location: 'Highway Gate NH-19'
  },
  {
    id: 'g-waterfall',
    title: 'Cascading Stone Rock Waterfall & Living Wall',
    category: 'property',
    categoryLabel: 'Gardens & Water Features',
    description: 'Handcrafted natural stone waterfall feature babbling peacefully beside a lush vertical living garden wall.',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shaan 15.webp',
    highlight: 'Natural Stone Fountain',
    location: 'East Garden'
  },
  {
    id: 'g-garden-gazebo',
    title: 'Garden Gazebo & Al-Fresco Dining Pergola',
    category: 'restaurant',
    categoryLabel: 'Restaurant & Dining',
    description: 'Covered timber dining pavilion set on pristine turf for peaceful open-air family dining amidst nature.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shaan 10.webp',
    highlight: 'Open-Air Seating',
    location: 'Garden Dining Area'
  },
  {
    id: 'g-love-shaan',
    title: '“I Love SHAAN-E-PUNJAB” Iconic Heart Landmark',
    category: 'property',
    categoryLabel: 'Photo Landmark',
    description: 'Beloved heart-shaped photography installation with garden bunny statues, a favorite guest photography stop.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shaan love.webp',
    highlight: 'Guest Photo Landmark',
    location: 'Resort Front Lawn'
  },
  {
    id: 'g-glass-villa',
    title: 'Sunlit Glass Villa & Architectural Arches',
    category: 'property',
    categoryLabel: 'Resort Architecture',
    description: 'Contemporary architectural facade featuring glass windows, ornamental potted planters, and wide archway breezeways.',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shaan 6.webp',
    highlight: 'Modern Architecture',
    location: 'Courtyard Corridor'
  },
  {
    id: 'g-forest-parking',
    title: 'Forest-Bordered Secure Guest Parking',
    category: 'property',
    categoryLabel: 'Amenities & Security',
    description: 'Spacious interlock-paved parking pavilion nestled beneath the verdant forest canopy of Topchanchi with 24/7 surveillance.',
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shaan 4.webp',
    highlight: '200+ Car Capacity',
    location: 'Secured Parking Zone'
  },
  {
    id: 'g-night-highway',
    title: 'Night Amenity Beacon on Grand Trunk Highway',
    category: 'property',
    categoryLabel: 'Night Ambiance',
    description: 'Full illuminated night elevation of the resort pylon and welcoming entryway along the Grand Trunk Road.',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    originalFileName: 'shaan 16.webp',
    highlight: 'NH-19 Night Landmark',
    location: 'Main Entrance'
  },
  {
    id: 'g-royal-crest',
    title: 'Shaan-E-Punjab Royal Crest & Monogram',
    category: 'property',
    categoryLabel: 'Brand & Heritage',
    description: 'The iconic gold SP crest surmounted by the royal crown representing decades of Punjabi warmth and hospitality.',
    imageUrl: '/assets/aistudio/logo_shaan_c2b0f723.jpeg',
    originalFileName: 'logo_shaan.jpeg',
    highlight: 'Heritage Crest',
    location: 'Hotel Identity'
  },
  {
    id: 'g-hero-crest',
    title: 'Royal Luxury Hospitality Emblem',
    category: 'property',
    categoryLabel: 'Brand & Heritage',
    description: 'Stay Royal. Dine Exquisitely. Celebrate Beautifully. 3D sculpted gold typography over the poolside terrace.',
    imageUrl: '/assets/aistudio/stylish_font_13ba008e.jpeg',
    originalFileName: 'stylish font.jpeg',
    highlight: 'Royal Motto',
    location: 'Resort Terrace'
  },
  {
    id: 'g-topchanchi-lake',
    title: 'Topchanchi Lake & Parasnath Foothills',
    category: 'scenic',
    categoryLabel: 'Scenic Topchanchi',
    description: 'Tranquil waters and emerald hill vistas of the Parasnath range just 4.2 km from the resort gates.',
    imageUrl: '/assets/aistudio/IMG_5a192be5-46ac-4124-b93f-1b255d1c8259_c902a37a.jpg',
    originalFileName: 'IMG_5a192be5-46ac-4124-b93f-1b255d1c8259_c902a37a.jpg',
    highlight: 'Nature & Lake Vistas',
    location: 'Topchanchi Wildlife Sanctuary (4.2 km)'
  },
  {
    id: 'g-topchanchi-dam',
    title: 'Historic Topchanchi Stone Dam & Cascading Waterfalls',
    category: 'scenic',
    categoryLabel: 'Scenic Topchanchi',
    description: 'Heritage arched stone spillway with roaring mountain waterfalls, jungle viewpoints, and walking bridge.',
    imageUrl: '/assets/aistudio/IMG_3066c5b2-f874-4ced-b0c3-5b51374d8e9e_ac385b41.jpg',
    originalFileName: 'IMG_3066c5b2-f874-4ced-b0c3-5b51374d8e9e_ac385b41.jpg',
    highlight: 'Roaring Waterfalls',
    location: 'Topchanchi Dam Spillway (4.5 km)'
  },
  {
    id: 'g-marriage-lawn',
    title: 'Grand Marriage Lawn & Celebration Mandap',
    category: 'events',
    categoryLabel: 'Weddings & Celebrations',
    description: '25,000 sq. ft. starlit banquet lawn with illuminated stage, floral arches, and banquet service for up to 1,500 guests.',
    imageUrl: '/assets/aistudio/IMG_a4a8ff32-02b3-4e8e-a10b-99a98a7b2ab8_c3e5d16a.jpg',
    originalFileName: 'IMG_a4a8ff32-02b3-4e8e-a10b-99a98a7b2ab8_c3e5d16a.jpg',
    highlight: '1,500 Capacity',
    location: 'Grand Wedding Lawn'
  }
];

export const EXPERIENCES_DATA = [
  {
    id: 'topchanchi-lake',
    title: 'Topchanchi Lake & Wildlife Excursion',
    subtitle: 'Nature & Tranquility · 4.2 km Away',
    description: 'Created during the British era amidst the verdant Parasnath hill range, Topchanchi Lake offers breathtaking sunset vistas, winter migratory bird watching, and gentle walking trails away from city rush.',
    highlights: ['Scenic sunset viewpoint', 'Birdwatching haven in winter', 'Quiet picnic spots around perimeter road']
  },
  {
    id: 'parasnath-pilgrimage',
    title: 'Parasnath (Shikharji) Pilgrimage Base',
    subtitle: 'Spiritual Haven · 22 km Away',
    description: 'As the most sacred pilgrimage destination for the Jain community where 20 Tirthankaras attained moksha, Shaan-E-Punjab serves as the preferred comfortable stay base for devotees and trekking families.',
    highlights: ['Comfortable pre-trek rest & recovery', 'Pure vegetarian dining options prepared separately', 'Early morning transport coordination']
  },
  {
    id: 'highway-hospitality',
    title: 'The Legendary Grand Trunk Rest Stop',
    subtitle: 'NH-19 Traveler Sanctuary · 24/7 Service',
    description: 'Generations of highway travelers between Kolkata, Varanasi, and Delhi rely on Shaan-E-Punjab for clean rest facilities, refreshing hot tea, wholesome Punjabi meals, and well-guarded overnight parking.',
    highlights: ['24-hour guarded vehicle parking with CCTV', 'Fresh hot kulhad chai & highway tandoor', 'Spotless sanitized washrooms']
  },
  {
    id: 'lawn-evenings',
    title: 'Open-Air Lawn Evenings & Bonfires',
    subtitle: 'Resort Leisure · Within Grounds',
    description: 'During cooler Jharkhand winter evenings, relax under the stars across our expansive lawns with live charcoal kebabs, soothing music, and cozy bonfires for in-house guests.',
    highlights: ['Winter bonfire setups upon request', 'Family garden seating with lawn service', 'Peaceful starlit highway atmosphere']
  }
];

export const FAQS = [
  {
    q: 'What are your standard check-in and check-out timings?',
    a: 'Our check-in time is 12:00 PM (noon) and check-out is 11:00 AM. Early check-in or late check-out is subject to room availability and can be requested in advance.'
  },
  {
    q: 'Is secure parking available for travelers driving on NH-19?',
    a: 'Yes, we provide extensive gated parking for over 150 vehicles including private cars, tourist buses, and wedding convoys, monitored 24/7 by security personnel and CCTV cameras.'
  },
  {
    q: 'Do you offer pure vegetarian cooking options for guests visiting Parasnath?',
    a: 'Yes, our kitchen maintains strict separation of utensils, gravies, and preparation zones for pure vegetarian and Jain-friendly requests without onion and garlic upon prior intimation.'
  },
  {
    q: 'How far in advance should we book for weddings and banquet events?',
    a: 'For peak marriage muhurats (November to March), we recommend reserving 3 to 6 months in advance. For corporate events, birthday celebrations, and small gatherings, 2 to 3 weeks notice is usually sufficient.'
  },
  {
    q: 'Is room service available round the clock?',
    a: 'Our kitchen serves full dining from 7:00 AM to 11:00 PM. A select highway snack, beverage, and tea/coffee menu remains accessible 24/7 for our staying guests.'
  }
];
