// Single source of truth for the personal copy.
//
// The name and the introduction and bio each appear in more than one place --
// the hero, the about page, the navbar brand, the footer and the page title.
// Keeping them here means a correction is one edit rather than six scattered
// ones, and it keeps the hero and the about page from drifting apart.

export const fullName = 'Juliana Samara R. Bartolome'

// The navbar brand has to sit beside the hamburger at 375px, where there is
// very little room, so it uses the first name and the current surname instead
// of the full name. The white/teal split is applied in Navbar.jsx.
export const brandFirst = 'Juliana'
export const brandLast = 'Bartolome'

export const intro =
  'Aspiring web developer focused on creating clean, functional, and user-centered websites.'

export const bio =
  'I keep a low profile and prefer to let my work speak for itself. Most of my time goes into learning, building, and steadily improving my skills.'

export const goal =
  'Strengthen my perseverance, perform better academically, and build the technical foundation for a career in web development.'

// Alt text has to describe the photo on its own, but it sits directly beside a
// <figcaption> that already names her, so it uses the short brand form and
// describes the role instead of repeating the full name at length.
export const portraitAlt = `Portrait of ${brandFirst} ${brandLast}, web developer`
