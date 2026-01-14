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
    name: 'Large Fruit Tray',
    price: 50,
  },
  {
    src: '/images/Gallery/gallery-02.png',
    name: 'Mixed Fruit Cup',
    price: 12,
  },
  {
    src: '/images/Gallery/gallery-03.png',
    name: 'Tostilocos',
    price: 13,
  },
  {
    src: '/images/Gallery/gallery-04.png',
    name: 'Fresh Juices & Aguas Frescas',
    price: 15,
  },
]

export const FullMenuData: FullMenuType[] = [
  // Fruit Trays & Platters
  {
    name: 'Large Fruit Tray',
    style: 'Fruit Trays & Platters',
    price: '$50.00 (Delivery) / $16.00 per person (Catering)',
    description:
      'Kiwi, strawberries, mango, watermelon, pineapple, cucumber, jícama',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    availability: 'standard',
  },
  {
    name: 'Mixed Fruit Cup (32 oz)',
    style: 'Fruit Trays & Platters',
    price: '$12.00',
    description:
      'Choice of: Mango, pineapple, watermelon, cucumber, jícama, orange, coconut flakes, papaya, chile, lemon',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    availability: 'standard',
  },
  {
    name: 'Mixed Fruit Cup (12 oz)',
    style: 'Fruit Trays & Platters',
    price: '$12.00',
    description:
      'Choice of: Mango, pineapple, watermelon, cucumber, jícama, orange, coconut flakes, papaya, chile, lemon',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    availability: 'standard',
  },
  // Tostilocos
  {
    name: 'Tostilocos (32 oz)',
    style: 'Tostilocos',
    price: '$13.00 (Delivery) / $18.00 (Catering)',
    description:
      'Cucumber, jícama, mango, tamarind, peanuts, chips, chamoy, chile, lemon',
    dietary: ['vegan', 'vegetarian'],
    availability: 'standard',
  },
  {
    name: 'Esquites (9 oz)',
    style: 'Tostilocos',
    price: '$5.00 (Delivery) / $5.50 (Catering)',
    description:
      'Corn, cheese, mayonnaise, butter, chile',
    dietary: ['vegetarian', 'gluten-free'],
    availability: 'standard',
  },
  // Seafood & Savory Items
  {
    name: 'Tostada de Ceviche de Camarón',
    style: 'Seafood & Savory Items',
    price: '$14.00',
    description:
      'Cucumber, mango, red onion, tomato, cilantro, chile, lemon. Served with chips and avocado',
    dietary: ['gluten-free'],
    availability: 'standard',
  },
  {
    name: 'Ham Torta',
    style: 'Seafood & Savory Items',
    price: '$10.50 (Delivery) / $11.00 (Catering)',
    description:
      'Ham, cucumber, tomato, avocado, spinach, cheese, lettuce, onion, chile',
    availability: 'standard',
  },
  // Fresh Juices
  {
    name: 'Fresh Juices (Cup – 24 oz)',
    style: 'Fresh Juices',
    price: '$6.00 (Delivery) / $6.75 (Catering)',
    description:
      'Orange, carrot, celery, and seasonal fruit blends',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    availability: 'standard',
  },
  // Desserts & Fruit Specialties
  {
    name: 'Fruit & Desserts (16 oz)',
    style: 'Desserts & Fruit Specialties',
    price: '$8.00 (Delivery) / $8.50 (Catering)',
    description:
      'Fresh strawberries with sweet cream, yogurt, cottage cheese, blueberries, raspberries, blackberries, granola, cranberries',
    dietary: ['vegetarian'],
    availability: 'standard',
  },
  {
    name: 'Shredded Fruit Plate',
    style: 'Desserts & Fruit Specialties',
    price: '$6.50 (Delivery) / $7.00 (Catering)',
    description:
      'Beet, jícama, cucumber, mango, carrot',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    availability: 'standard',
  },
  // Aguas Frescas
  {
    name: 'Galones de Aguas Frescas',
    style: 'Aguas Frescas (By the Gallon)',
    price: '$15.00 (Delivery) / $16.50 (Catering)',
    description:
      'Flavors: Jamaica, horchata, limón, pepino, fresa, mango, piña, sandía, raspberries',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    availability: 'standard',
  },
]

export const FooterLinkData: FooterLinkType[] = []

// Catering packages
export const CateringPackagesData: CateringPackageType[] = [
  {
    name: 'Large Fruit Tray Catering',
    description:
      'Perfect for community events, school activations, wellness events, and fundraisers. Large fruit trays with fresh seasonal fruits.',
    servesCount: 20,
    price: '$16.00 per person',
    leadTimeDays: 3,
    notes: 'Prices may vary based on event size and customization. Bulk fruit trays available upon request.',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
  },
  {
    name: 'Mixed Fruit Cup Catering',
    description:
      'Individual 32 oz fruit cups perfect for office catering, school events, or wellness gatherings. Customizable fruit selection.',
    servesCount: 10,
    price: '$12.00 per cup',
    leadTimeDays: 2,
    notes: 'Customizable fruit selection. All dietary options available.',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
  },
  {
    name: 'Complete Fruit & Beverage Package',
    description:
      'Full-service catering package including large fruit trays, mixed fruit cups, fresh juices, and aguas frescas by the gallon.',
    servesCount: 50,
    price: 'Starting at $800',
    leadTimeDays: 7,
    notes: 'Includes setup and delivery. Custom menu available. Ideal for large community events and fundraisers.',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
  },
  {
    name: 'Aguas Frescas Bulk Order',
    description:
      'Bulk order of aguas frescas by the gallon. Available flavors: Jamaica, horchata, limón, pepino, fresa, mango, piña, sandía, raspberries.',
    servesCount: 100,
    price: '$16.50 per gallon (catering)',
    leadTimeDays: 3,
    notes: 'Minimum 5 gallons. Mix and match flavors available. Perfect for large events.',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
  },
]

// Special orders and preorders
export const SpecialOrdersData: SpecialOrderType[] = [
  {
    name: 'Custom Large Fruit Tray',
    description:
      'Customized large fruit tray designed to your specifications. Choose your favorite fruits and arrangement style. Perfect for special occasions.',
    price: 'Starting at $50',
    cutoffDate: '2024-12-20',
    customizationNotes:
      'Please specify fruit preferences, dietary restrictions, and event details when ordering. Available for delivery or pickup.',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
  },
  {
    name: 'Bulk Fruit Order',
    description:
      'Pre-order bulk fruit trays, mixed fruit cups, and beverages for your event. Mix and match items to create the perfect menu for your occasion.',
    price: 'Varies by order size',
    cutoffDate: '2024-12-18',
    customizationNotes:
      'Specify quantities and preferences. Available for pickup or delivery. Ideal for community events, school activations, wellness events, and fundraisers.',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
  },
  {
    name: 'Custom Catering Menu',
    description:
      'Work with us to create a custom menu for your special event. Includes consultation and menu planning tailored to your needs.',
    price: 'Starting at $300',
    cutoffDate: '2024-12-15',
    customizationNotes:
      'Contact us at least 1 week in advance for standard orders, 2 weeks for large events. Prices may vary based on event size and customization.',
  },
]// Events and popups
export const EventsData: EventType[] = [
  {
    name: 'Community Wellness Event',
    date: '2024-12-07',
    location: 'Community Center, Main Street',
    // Google Maps embed URL - easily changeable by getting embed code from Google Maps
    // To change: Go to Google Maps, search location, click Share > Embed a map, copy iframe src
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132576!2d-73.98811768459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
    description:
      'Join us for fresh fruit trays, mixed fruit cups, and refreshing aguas frescas at the community wellness event!',
    menuItems: ['Large Fruit Tray', 'Mixed Fruit Cup', 'Fresh Juices'],
  },
  {
    name: 'School Fundraiser',
    date: '2024-12-14',
    location: 'Local School, 123 Education St',
    // Alternative: Use coordinates to generate map URL
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
    description:
      'Supporting the school fundraiser with fresh fruit options and beverages. Perfect for students and families!',
    menuItems: ['Mixed Fruit Cup', 'Aguas Frescas', 'Shredded Fruit Plate'],
  },
  {
    name: 'Farmers Market',
    date: '2024-12-21',
    location: 'City Park, Central Avenue',
    // Google Maps embed URL - easily changeable
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.184132576!2d-73.98511768459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1234567890124!5m2!1sen!2sus',
    description:
      'Find us at the farmers market with our full selection of fresh fruit items, tostilocos, and aguas frescas!',
    menuItems: ['Tostilocos', 'Esquites', 'Fresh Juices'],
  },
]// Vendor metadata
export const VendorMetadataData: VendorMetadata = {
  vendorName: "Fresh Fruit By Ruth",
  contactInfo: {
    phone: '+1 (555) 123-4567',
    email: 'orders@freshfruitbyruth.com',
    website: 'www.freshfruitbyruth.com',
  },
  orderingInfo:
    'Prices may vary based on event size and customization. Ideal for community events, school activations, wellness events, and fundraisers. Bulk fruit trays, juices, and aguas frescas available upon request.',
}