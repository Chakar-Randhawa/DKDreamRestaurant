import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- THAI SPECIALTIES ---
  {
    id: 'thai-pad-thai',
    name: 'Authentic King Prawn Pad Thai',
    thaiName: 'ผัดไทยกุ้งสด',
    category: 'thai',
    price: 24.50,
    description: 'Stir-fried rice noodles with succulent Australian king prawns, house tamarind reduction, crispy bean curd, crushed peanuts, bean sprouts, and fresh lime.',
    tags: ['Gluten-Free Option', 'Chef Special'],
    spiceLevel: 1,
    popular: true,
    image: '/src/assets/images/hero_thai_wok_1792815646069.jpg'
  },
  {
    id: 'thai-pad-kee-mao',
    name: 'Pad Kee Mao (Drunken Noodles)',
    thaiName: 'ผัดขี้เมาเนื้อ',
    category: 'thai',
    price: 23.90,
    description: 'Wok-charred wide flat rice noodles with tender marinated beef strips, fiery birds eye chili, garlic, baby corn, bamboo shoots, and fragrant Thai holy basil.',
    tags: ['Spicy Favorite', 'Wok Hei'],
    spiceLevel: 3,
    popular: true,
    image: '/src/assets/images/dish_pad_kee_mao_1792815715414.jpg'
  },
  {
    id: 'thai-green-curry',
    name: 'Royal Thai Green Curry',
    thaiName: 'แกงเขียวหวานไก่',
    category: 'thai',
    price: 22.50,
    description: 'Aromatic green chili paste simmered with coconut milk cream, chicken breast, apple eggplants, bamboo shoots, and fresh sweet basil. Served with jasmine rice.',
    tags: ['Gluten-Free', 'Classic'],
    spiceLevel: 2,
    popular: false,
    image: '/src/assets/images/hero_thai_wok_1792815646069.jpg'
  },
  {
    id: 'thai-massaman-beef',
    name: 'Slow-Cooked Massaman Beef',
    thaiName: 'แกงมัสมั่นเนื้อ',
    category: 'thai',
    price: 26.00,
    description: 'Eight-hour braised chuck beef simmered in rich mild coconut curry with roasted peanuts, baby chat potatoes, star anise, and cinnamon bark.',
    tags: ['Gluten-Free', 'Slow Braised'],
    spiceLevel: 1,
    popular: true,
    image: '/src/assets/images/dish_pad_kee_mao_1792815715414.jpg'
  },
  {
    id: 'thai-tom-yum',
    name: 'Tom Yum Goong Hot & Sour Soup',
    thaiName: 'ต้มยำกุ้งแม่น้ำ',
    category: 'thai',
    price: 21.00,
    description: 'Classic zesty broth infused with bruised lemongrass, kaffir lime leaves, fresh galangal, king prawns, button mushrooms, and roasted chili jam.',
    tags: ['Gluten-Free', 'Tangy & Spicy'],
    spiceLevel: 2,
    popular: false,
    image: '/src/assets/images/hero_thai_wok_1792815646069.jpg'
  },
  {
    id: 'thai-crispy-pork-kale',
    name: 'Crispy Pork Belly with Chinese Broccoli',
    thaiName: 'คะน้าหมูกรอบ',
    category: 'thai',
    price: 25.50,
    description: 'Golden crackling pork belly wok-tossed on high heat with crisp Chinese broccoli, salted soybean paste, garlic, and fresh red chili.',
    tags: ['Crispy Texture', 'House Favorite'],
    spiceLevel: 2,
    popular: false,
    image: '/src/assets/images/dish_pad_kee_mao_1792815715414.jpg'
  },

  // --- WESTERN COMFORT ---
  {
    id: 'western-schnitzel',
    name: 'Golden Crispy Chicken Schnitzel',
    category: 'western',
    price: 25.00,
    description: 'Generous 300g Australian chicken breast hand-crumbed in seasoned panko, golden fried, served with hot beer-battered chips, fresh garden salad, and house gravy.',
    tags: ['Customer Classic', 'Pub Style'],
    spiceLevel: 0,
    popular: true,
    image: '/src/assets/images/hero_schnitzel_1792815646420.jpg'
  },
  {
    id: 'western-parmigiana',
    name: 'DK Signature Chicken Parmigiana',
    category: 'western',
    price: 27.50,
    description: 'Our crispy schnitzel topped with slow-simmered rich Italian sugo, shaved smoked leg ham, and grilled melted mozzarella & parmesan cheese.',
    tags: ['Top Seller', 'Hearty'],
    spiceLevel: 0,
    popular: true,
    image: '/src/assets/images/hero_schnitzel_1792815646420.jpg'
  },
  {
    id: 'western-napolitana',
    name: 'Napolitana Spaghetti al Pomodoro',
    category: 'western',
    price: 21.50,
    description: 'Al dente spaghetti tossed in rich San Marzano plum tomato sauce, garlic confit, cold-pressed olive oil, freshly torn Italian basil, and aged pecorino.',
    tags: ['Vegetarian', 'Italian Classic'],
    spiceLevel: 0,
    popular: true,
    image: '/src/assets/images/dish_napolitana_pasta_1792815715873.jpg'
  },
  {
    id: 'western-angus-burger',
    name: 'Hilltops Angus Beef Burger & Chips',
    category: 'western',
    price: 23.50,
    description: '200g prime Aussie Angus beef patty, melted cheddar, crisp iceberg lettuce, sliced tomato, pickles, caramelized onion, and house smoked burger aioli in a toasted brioche bun.',
    tags: ['Prime Aussie Beef', 'Served with Chips'],
    spiceLevel: 0,
    popular: false,
    image: '/src/assets/images/hero_schnitzel_1792815646420.jpg'
  },
  {
    id: 'western-lamb-shank',
    name: 'Red Wine Braised Lamb Shank',
    category: 'western',
    price: 29.50,
    description: 'Tender lamb shank slow-braised in Hunter Valley Shiraz and aromatic herbs, resting on garlic butter potato purée with honey-roasted Dutch carrots.',
    tags: ['Winter Comfort', 'Slow Cooked'],
    spiceLevel: 0,
    popular: false,
    image: '/src/assets/images/hero_schnitzel_1792815646420.jpg'
  },

  // --- MATCHA & BOBA LINEUP (2026 NEW SERIES) ---
  {
    id: 'boba-strawberry-matcha',
    name: 'Artisan Strawberry Matcha Latte',
    category: 'boba-matcha',
    price: 8.90,
    description: 'Hand-whisked ceremonial grade Uji matcha layered over house-made macerated fresh strawberry puree and silky cold oat milk over crystal ice.',
    tags: ['2026 Hit', 'Organic Uji Matcha'],
    spiceLevel: 0,
    popular: true,
    image: '/src/assets/images/hero_matcha_drinks_1792815647020.jpg'
  },
  {
    id: 'boba-mango-matcha',
    name: 'Tropical Mango Matcha Fresca',
    category: 'boba-matcha',
    price: 8.90,
    description: 'Ripe Alphonso mango puree with aromatic jasmine blossom green tea, topped with a vibrant ceremonial matcha float and bursting mango popping pearls.',
    tags: ['Refreshing', 'Dairy-Free'],
    spiceLevel: 0,
    popular: true,
    image: '/src/assets/images/hero_matcha_drinks_1792815647020.jpg'
  },
  {
    id: 'boba-brown-sugar-tiger',
    name: 'Brown Sugar Tiger Boba Fresh Milk',
    category: 'boba-matcha',
    price: 8.50,
    description: 'Warm, slow-simmered dark muscovado tapioca pearls swirled around glass walls with creamy Australian farm milk and light salted cream mousse.',
    tags: ['Chewy Tapioca', 'Fan Favorite'],
    spiceLevel: 0,
    popular: true,
    image: '/src/assets/images/hero_matcha_drinks_1792815647020.jpg'
  },
  {
    id: 'boba-taro-cloud',
    name: 'Velvet Taro Coconut Cloud Milk Tea',
    category: 'boba-matcha',
    price: 8.50,
    description: 'Authentic roasted purple taro root blended with fragrant coconut milk, brown sugar pearls, and velvety cream crown.',
    tags: ['Vegetarian', 'Rich & Creamy'],
    spiceLevel: 0,
    popular: false,
    image: '/src/assets/images/hero_matcha_drinks_1792815647020.jpg'
  },
  {
    id: 'boba-roasted-hojicha',
    name: 'Kyoto Roasted Hojicha Milk Tea',
    category: 'boba-matcha',
    price: 8.20,
    description: 'Nutty, deeply roasted green tea steeped to perfection, paired with soy or fresh milk and tender brown sugar boba.',
    tags: ['Low Caffeine', 'Smoky Note'],
    spiceLevel: 0,
    popular: false,
    image: '/src/assets/images/hero_matcha_drinks_1792815647020.jpg'
  },

  // --- APPETIZERS & DESSERTS ---
  {
    id: 'app-spring-rolls',
    name: 'Crispy Thai Vegetarian Spring Rolls (4pcs)',
    thaiName: 'เปาะเปี๊ยะทอด',
    category: 'appetizers-desserts',
    price: 11.50,
    description: 'Hand-rolled golden pastry stuffed with vermicelli glass noodles, black ear mushrooms, carrots, and cabbage, served with sweet plum dip.',
    tags: ['Vegetarian', 'Crispy'],
    spiceLevel: 0,
    popular: true,
    image: '/src/assets/images/hero_thai_wok_1792815646069.jpg'
  },
  {
    id: 'app-satay-chicken',
    name: 'Grilled Satay Chicken Skewers (4pcs)',
    thaiName: 'สะเต๊ะไก่',
    category: 'appetizers-desserts',
    price: 13.90,
    description: 'Marinated tender chicken skewers grilled over flame, smothered in rich aromatic ground peanut satay sauce with pickled cucumber relish.',
    tags: ['Gluten-Free', 'House Dip'],
    spiceLevel: 1,
    popular: true,
    image: '/src/assets/images/dish_pad_kee_mao_1792815715414.jpg'
  },
  {
    id: 'app-salt-pepper-squid',
    name: 'Salt & Szechuan Pepper Calamari',
    category: 'appetizers-desserts',
    price: 15.50,
    description: 'Lightly dusted tender squid flash-fried with fresh chilies, spring onion, crispy garlic chips, and zesty kaffir lime aioli.',
    tags: ['Popular Starter', 'Light & Crispy'],
    spiceLevel: 1,
    popular: false,
    image: '/src/assets/images/hero_schnitzel_1792815646420.jpg'
  },
  {
    id: 'dessert-mango-sticky-rice',
    name: 'Traditional Thai Mango Sticky Rice',
    thaiName: 'ข้าวเหนียวมะม่วง',
    category: 'appetizers-desserts',
    price: 14.50,
    description: 'Fragrant warm sweet coconut sticky rice paired with sweet freshly sliced ripe mango, rich warm salted coconut cream, and toasted sesame seeds.',
    tags: ['Gluten-Free', 'Authentic Thai Dessert'],
    spiceLevel: 0,
    popular: true,
    image: '/src/assets/images/dish_mango_sticky_rice_1792815715204.jpg'
  },
  {
    id: 'dessert-nutella-churros',
    name: 'Cinnamon Spiced Churros & Warm Nutella',
    category: 'appetizers-desserts',
    price: 13.00,
    description: 'Four golden-fried artisan pastry churros rolled in raw cinnamon sugar, served alongside a warm pot of melted Nutella hazelnut dip.',
    tags: ['Sweet Comfort', 'Vegetarian'],
    spiceLevel: 0,
    popular: false,
    image: '/src/assets/images/dish_mango_sticky_rice_1792815715204.jpg'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Full Menu' },
  { id: 'thai', label: 'Thai Specialties' },
  { id: 'western', label: 'Western Comfort' },
  { id: 'boba-matcha', label: 'Matcha & Boba Lineup' },
  { id: 'appetizers-desserts', label: 'Appetizers & Desserts' },
] as const;
