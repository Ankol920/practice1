// One entry per project. The shape below is EXACTLY the props ProjectCard
// receives, because Projects.jsx spreads each object: <ProjectCard {...p} />.
// That is why there is no React in this file -- it is plain data.
//
// `id` is a stable slug and it is the React key. Never key on the array
// index: if the list is ever reordered or filtered, index keys make React
// reuse the wrong DOM node and lose focus state.
//
// Only these three images are bundled. The other screenshots sitting in
// src/assets/projects/ are never imported, so Vite ignores them and they do
// not reach the build.
//
// TODO: the resort booking one is currently reviewbooking.png, an original
// screenshot, while the other two are derivatives. See the note beside its
// import below.
//
// The import paths have to match the directory names exactly, including the
// camelCase "foodDeliv" and the capitalised "POS".
//
// `github` and `demo` are optional. ProjectCard renders its link block only
// when at least one is present, so leave them off until you publish a repo.
// Uncomment the pair at the bottom for the exact shape.

// resort booking: 851x1713 PNG, 337 kB, the original screenshot rather than a
// derivative. The other two are ~900px JPEGs. It is 2.7x the bytes of the file
// it replaces and is displayed inside the same square panel, so the extra
// pixels and the PNG encoding are not buying visible sharpness here.
// object-contain means it will letterbox rather than crop, which suits this
// ~1:2 portrait shot.
import resortBookingImage from '../assets/projects/booking/reviewbooking.png'
import foodDeliveryImage from '../assets/projects/foodDeliv/menu.jpg'
import posImage from '../assets/projects/POS/cashier.jpg'

export const projects = [
  {
    id: 'resort-booking',
    title: 'Resort Booking System',
    description:
      'A web app for browsing resort destinations, comparing rates, and completing a reservation, ending with a review of the confirmed booking.',
    technologies: ['React', 'JavaScript'], // TODO: confirm the real stack
    image: resortBookingImage,
    // The alt text below is inferred from the filename, not from the image.
    // Check each one against what the screen actually shows: inaccurate alt
    // text is worse than a vaguer but correct description.
    // TODO: unverified. This is derived from the filename "reviewbooking" and
    // the entry's own description, NOT from looking at the picture. The old
    // screenshot was described from the filename too. Confirm the screen really
    // is a booking-review step before shipping this text.
    imageAlt: 'Resort booking app showing the review page for a confirmed booking',
  },
  {
    id: 'food-delivery',
    title: 'Food Delivery App',
    description:
      'A mobile-first web app for browsing a restaurant menu, adding items to a cart, and following an order, with a built-in map view and a sign-in screen.',
    technologies: ['React', 'JavaScript'], // TODO: confirm the real stack
    image: foodDeliveryImage,
    imageAlt: 'Food delivery app showing the menu of available dishes',
  },
  {
    id: 'point-of-sale',
    title: 'Point of Sale System',
    description:
      'A web-based point of sale system with a cashier terminal for taking and totalling orders, and an admin panel for managing the products, users and sales behind them.',
    technologies: ['React', 'JavaScript'], // TODO: confirm the real stack
    image: posImage,
    imageAlt: 'Point of sale cashier terminal showing the current order',
    // github: 'https://github.com/your-username/point-of-sale',
    // demo: 'https://your-username.github.io/point-of-sale',
  },
]
