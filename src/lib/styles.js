// Shared class strings. Lives in a .js file rather than a component file
// because react-refresh/only-export-components flags a non-component export
// from a .jsx file.
//
// THE SPACING SCALE, written down in one place so it does not drift file to
// file. Every space-y-* in src/ is one of these four values:
//
//   space-y-12   page-level sections
//   space-y-8    page h1 -> its first content block
//   space-y-4    section h2 -> its content, and tight clusters
//   space-y-2    form label -> its control. 8px, deliberately tighter than the
//                tier above: a label belongs to its control rather than sitting
//                as a sibling section.

// Was duplicated verbatim in Home.jsx and ProjectCard.jsx, which is precisely
// the drift ProjectCard's own comment says the shared const exists to prevent.
//
// py-1 is not decoration, it is the tap target. text-sm resolves to a 20px
// line-height (Tailwind's --text-sm--line-height is calc(1.25 / 0.875)), and
// with no vertical padding that made these links a 20x~80px clickable box --
// under the 24x24px minimum in WCAG 2.5.8 Target Size (Minimum), Level AA.
// py-1 adds 8px, taking the height to 28px.
//
// Both call sites are flex items, and a flex item is blockified by its parent
// already, so vertical padding applies without an explicit display value. An
// ordinary inline link would need one, which is worth knowing if this class is
// ever reused somewhere that is not a flex container.
//
// The wording above avoids naming the display utility literally: Tailwind
// scans these files for class-shaped strings, and a hyphenated utility name in
// a comment gets emitted into the stylesheet as a dead rule.
// moss-700 rather than moss-600: the mid matcha only reaches 4.31:1 as small
// text on the cream page, which fails AA. 700 is 5.82:1.
//
// The ring offset is moss-100 (the page background) so it reads as a 2px gap
// rather than a second border. All three current call sites sit directly on
// the page background; a link moved onto a moss-200 card would need
// ring-offset-moss-200, so re-check this if one ever is.
export const textLinkClass =
  'rounded-sm py-1 text-sm font-medium text-moss-700 underline-offset-4 hover:text-moss-800 hover:underline ' +
  'focus-visible:ring-2 focus-visible:ring-moss-700 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-moss-100 focus-visible:outline-none'

// One focus treatment for every focusable thing except the form fields, which
// use a softer ring at 40% and no offset. A field already has a visible border
// and a large hit area, and an offset ring crowds the label above it.
//
// The offset colour is the page background, so it reads as a 2px gap between the
// element and the ring rather than as a second border.
// ring-moss-700 on the cream page is 5.82:1, comfortably past the 3:1 that
// WCAG 1.4.11 requires of a focus indicator.
//
// This is the ring for things sitting ON THE PAGE. A filled button cannot use
// it: moss-700 on the moss-600 fill is 1.28:1, effectively invisible, so
// StyledButton swaps in a cream ring for its filled variant. Reach for this
// class only on an element whose own background is the page or a card, never
// on a moss-600 fill.
export const focusRingClass =
  'focus-visible:ring-2 focus-visible:ring-moss-700 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-moss-100 focus-visible:outline-none'
