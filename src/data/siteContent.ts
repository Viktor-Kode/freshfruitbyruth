import { HeaderItem } from '@/app/types/menu'
import { FeaturesType } from '@/app/types/features'
import { ExpertChiefType } from '@/app/types/expertchief'
import { GalleryImagesType } from '@/app/types/galleryimage'
import { FooterLinkType } from '@/app/types/footerlink'
import { FullMenuType } from '@/app/types/fullmenu'
import { CateringPackageType } from '@/app/types/catering'
import { SpecialOrderType } from '@/app/types/specialOrders'
import { EventType } from '@/app/types/events'
import { VendorMetadata } from '@/app/types/vendor'

// Header labels are now translated in components using translation keys:
// 'nav.aboutUs', 'nav.menu', 'nav.gallery', 'nav.features', 'nav.contactUs'
export const HeaderData: HeaderItem[] = [
  { label: 'nav.aboutUs', href: '/#aboutus' },
  { label: 'nav.menu', href: '/#menu-section' },
  { label: 'nav.gallery', href: '/#gallery' },
  { label: 'nav.features', href: '/#specials-events' },
  { label: 'nav.contactUs', href: '/#contact' },
]

// Feature labels are now translated in components using translation keys:
// 'features.feature1.heading', 'features.feature1.subheading', etc.
export const FeaturesData: FeaturesType[] = [
  {
    imgSrc: '/images/Features/featureOne.svg',
    heading: 'features.feature1.heading',
    subheading: 'features.feature1.subheading',
  },
  {
    imgSrc: '/images/Features/featureThree.svg',
    heading: 'features.feature2.heading',
    subheading: 'features.feature2.subheading',
  },
  {
    imgSrc: '/images/Features/featureTwo.svg',
    heading: 'features.feature3.heading',
    subheading: 'features.feature3.subheading',
  },
  {
    imgSrc: '/images/Features/featureFour.svg',
    heading: 'features.feature4.heading',
    subheading: 'features.feature4.subheading',
  },
]

export const ExpertChiefData: ExpertChiefType[] = [
  {
    profession: 'Senior Chef',
    name: 'Marco Benton',
    imgSrc: '/images/Expert/boyone.png',
  },
  {
    profession: 'Junior Chef',
    name: 'Elena Rivera',
    imgSrc: '/images/Expert/girl.png',
  },
  {
    profession: 'Junior Chef',
    name: 'John Doe',
    imgSrc: '/images/Expert/boytwo.png',
  },
]

export const GalleryImagesData: GalleryImagesType[] = [
  {
    src: '/images/Gallery/gallery-01.png',
    name: 'Charred Salmon Citrus Glaze',
    price: 35,
  },
  {
    src: '/images/Gallery/gallery-02.png',
    name: 'Heirloom Tomato Burrata',
    price: 27,
  },
  {
    src: '/images/Gallery/gallery-03.png',
    name: 'Truffle Mushroom Tartine',
    price: 45,
  },
  {
    src: '/images/Gallery/gallery-04.png',
    name: 'Seasonal Fruit Mille-feuille',
    price: 29,
  },
]

export const FullMenuData: FullMenuType[] = [
  {
    name: 'Mesquite Al Pastor',
    style: 'Signature Taco',
    price: '$6.75',
    description:
      'Charred pork shoulder shaved fresh off the trompo, grilled pineapple, and cilantro-lime salsa on blue corn tortillas.',
    availability: 'standard',
  },
  {
    name: 'Braised Birria Dipper',
    style: 'Signature Taco',
    price: '$7.25',
    description:
      'Slow-braised beef folded with Oaxacan cheese, served with a rich consommé for dipping.',
    availability: 'standard',
  },
  {
    name: 'Crispy Baja Fish',
    style: 'Seafood Taco',
    price: '$6.95',
    description:
      'Beer-battered halibut, shaved cabbage, smoked chili crema, and charred lime on flour tortillas.',
    availability: 'standard',
  },
  {
    name: 'Tejano Carne Asada',
    style: 'Plates',
    price: '$22.00',
    description:
      'Grilled skirt steak finished with roasted bone marrow butter, served with black bean purée and warm tortillas.',
    availability: 'standard',
  },
  {
    name: 'Esquites Street Corn',
    style: 'Shareable',
    price: '$9.50',
    description:
      'Roasted white corn tossed with jalapeño aioli, cotija crumble, and crispy hoja santa.',
    availability: 'standard',
  },
  {
    name: 'Charred Nopales Salad',
    style: 'Shareable',
    price: '$11.00',
    description:
      'Grilled cactus paddles, heirloom tomatoes, queso fresco, and citrus vinaigrette.',
    availability: 'standard',
  },
  {
    name: 'Citrus Cured Hamachi',
    style: "Chef's Selection",
    price: '$16.00',
    description:
      'Sustainably caught hamachi with charred orange, avocado purée, and yuzu kosho oil.',
    dietary: ['chefs-pick', 'gluten-free', 'low-calorie'],
    availability: 'standard',
  },
  {
    name: 'Cold-Smoked Ribeye Taco',
    style: "Chef's Selection",
    price: '$8.50',
    description:
      'Thin-sliced ribeye, black garlic salsa macha, and crispy shallots on nixtamalized tortillas.',
    availability: 'standard',
  },
  {
    name: 'Tamarind Glazed Brussels',
    style: 'Plant-Based',
    price: '$12.00',
    description:
      'Crispy Brussels sprouts finished with tamarind piloncillo glaze, pepitas, and pickled red onion.',
    dietary: ['vegan', 'gluten-free', 'nut-free'],
    availability: 'standard',
  },
  {
    name: 'Cacao Tres Leches',
    style: 'Dessert',
    price: '$8.75',
    description:
      'Dark chocolate sponge soaked in tres leches with cinnamon chantilly and burnt sugar tuile.',
    dietary: ['vegetarian'],
    availability: 'standard',
  },
  // Seasonal items
  {
    name: 'Pumpkin Seed Mole Enchiladas',
    style: 'Seasonal Special',
    price: '$18.50',
    description:
      'House-made mole negro with roasted pumpkin seeds, braised chicken, and queso fresco. Available through November.',
    dietary: ['gluten-free'],
    availability: 'seasonal',
    availableUntil: '2024-11-30',
    badge: 'Fall Special',
  },
  {
    name: 'Hibiscus Agua Fresca',
    style: 'Beverage',
    price: '$5.50',
    description:
      'Fresh hibiscus flowers steeped with lime and agave. Refreshing summer drink.',
    dietary: ['vegan', 'gluten-free'],
    availability: 'seasonal',
    availableUntil: '2024-09-15',
    badge: 'Limited Time',
  },
  {
    name: 'Holiday Tamale Platter',
    style: 'Holiday Special',
    price: '$24.00',
    description:
      'Assorted tamales: pork verde, chicken mole, and sweet corn. Served with crema and salsa roja.',
    availability: 'limited',
    badge: 'Holiday Only',
  },
]

export const FooterLinkData: FooterLinkType[] = []

// Catering packages
export const CateringPackagesData: CateringPackageType[] = [
  {
    name: 'Taco Fiesta Package',
    description:
      'Perfect for parties and events. Includes 3 taco varieties, rice, beans, chips, salsa, and guacamole.',
    servesCount: 20,
    price: '$450',
    leadTimeDays: 3,
    notes: 'Minimum 20 people. Additional servings available at $20 per person.',
    dietary: ['gluten-free'],
  },
  {
    name: 'Executive Lunch Box',
    description:
      'Individual lunch boxes with choice of 2 tacos, rice, beans, chips, and salsa. Perfect for office catering.',
    servesCount: 10,
    price: '$180',
    leadTimeDays: 2,
    notes: 'Customizable taco selection. Vegetarian options available.',
  },
  {
    name: 'Grand Celebration Package',
    description:
      'Full-service catering for large events. Includes appetizers, multiple taco stations, sides, desserts, and service staff.',
    servesCount: 50,
    price: '$1,200',
    leadTimeDays: 7,
    notes: 'Includes setup, service staff, and cleanup. Custom menu available.',
  },
  {
    name: 'Taco Truck Popup',
    description:
      'Bring the taco truck to your location! Includes full setup, menu selection, and service.',
    servesCount: 100,
    price: '$2,500',
    leadTimeDays: 14,
    notes: 'Minimum 4-hour service. Includes all equipment and staff.',
  },
]

// Special orders and preorders
export const SpecialOrdersData: SpecialOrderType[] = [
  {
    name: 'Custom Birthday Cake Tamale',
    description:
      'Large tamale cake decorated to order. Choose from traditional, chocolate, or fruit flavors. Serves 12-15.',
    price: '$65',
    cutoffDate: '2024-12-20',
    customizationNotes:
      'Please specify flavor, decoration preferences, and any dietary restrictions when ordering.',
  },
  {
    name: 'Holiday Tamale Dozen',
    description:
      'Pre-order a dozen assorted tamales for the holidays. Mix and match flavors: pork verde, chicken mole, sweet corn, or cheese & jalapeño.',
    price: '$48',
    cutoffDate: '2024-12-18',
    customizationNotes:
      'Specify flavor preferences. Available for pickup December 23-24. Gluten-free options available.',
    dietary: ['gluten-free'],
  },
  {
    name: 'Catering Menu Customization',
    description:
      'Work with our chef to create a custom menu for your special event. Includes consultation and menu planning.',
    price: 'Starting at $500',
    cutoffDate: '2024-12-15',
    customizationNotes:
      'Contact us at least 2 weeks in advance. Consultation includes tasting session.',
  },
]// Events and popups
export const EventsData: EventType[] = [
  {
    name: 'Downtown Farmers Market',
    date: '2024-12-07',
    location: 'Main Street Plaza, Downtown',
    // Google Maps embed URL - easily changeable by getting embed code from Google Maps
    // To change: Go to Google Maps, search location, click Share > Embed a map, copy iframe src
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132576!2d-73.98811768459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
    description:
      'Join us every Saturday morning for fresh tacos and aguas frescas. Look for our bright orange tent!',
    menuItems: ['Mesquite Al Pastor', 'Crispy Baja Fish', 'Esquites Street Corn'],
  },
  {
    name: 'Holiday Popup at The Brewery',
    date: '2024-12-14',
    location: 'Local Craft Brewery, 123 Beer St',
    // Alternative: Use coordinates to generate map URL
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
    description:
      'Special holiday menu featuring seasonal tamales and festive drinks. Live music included!',
    menuItems: ['Holiday Tamale Platter', 'Pumpkin Seed Mole Enchiladas'],
  },
  {
    name: 'Food Truck Festival',
    date: '2024-12-21',
    location: 'City Park, Central Avenue',
    // Google Maps embed URL - easily changeable
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.184132576!2d-73.98511768459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1234567890124!5m2!1sen!2sus',
    description:
      'We will be serving our full menu at the annual food truck festival. Come early for best selection!',
  },
]// Vendor metadata
export const VendorMetadataData: VendorMetadata = {
  vendorName: "Freddy's Tacos",
  contactInfo: {
    phone: '+1 (555) 123-4567',
    email: 'orders@freddystacos.com',
    website: 'www.freddystacos.com',
  },
  orderingInfo:
    'For catering orders, please call or email at least 3 days in advance. Special orders require 1-2 weeks notice. Walk-ins welcome for regular menu items.',
}