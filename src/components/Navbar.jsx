import { useState } from 'react'
import { NavLink } from 'react-router'
import { brandFirst, brandLast } from '../data/profile.js'
import { focusRingClass } from '../lib/styles.js'

// One source of truth for the links. The navbar and the mobile menu both
// map over this, so adding a page later is a one-line change here.
const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

// Shared by the desktop links and the mobile menu links so the two can
// never drift apart. Kept as a module-level const (not exported) so the
// react-refresh lint rule stays happy.
//
// focusRingClass is the one focus treatment used across the whole app, so the
// navbar ring cannot drift from the ring on the buttons and links.
const linkBase =
  'block rounded-md px-3 py-2 text-sm font-medium transition-colors ' +
  focusRingClass

// NavLink calls this with the current state, so the active page is styled
// automatically without us tracking the URL ourselves.
// An active page is marked by colour AND by a 2px moss-600 underline, not by
// colour alone. On a cream surface the colour difference between moss-600 and
// ink-500 is legible but subtle, and colour-only state is invisible to anyone
// with a colour vision deficiency. The underline is a shape cue, so the active
// page survives greyscale. aria-current="page" comes from NavLink itself.
const linkClass = ({ isActive }) =>
  `${linkBase} ${
    isActive
      ? 'text-moss-700 underline decoration-moss-600 decoration-2 underline-offset-8'
      : 'text-ink-500 hover:text-moss-700'
  }`

export default function Navbar() {
  // Whether the mobile dropdown is open. Desktop never reads this.
  const [open, setOpen] = useState(false)

  return (
    // <header> is the landmark for the banner; the <nav> inside it is the
    // navigation landmark. aria-label tells screen readers which nav it is
    // when a page ever has more than one.
    //
    // md:sticky md:top-0   -> sticky only from the md breakpoint (48rem /
    //                         768px) upward, per the brief. Below md the bar
    //                         scrolls away with the page, which is what
    //                         leaves room for the dropdown to push content.
    // shrink-0             -> never let flexbox squash the bar's height.
    // opaque, so content scrolling underneath is
    //                         hidden rather than showing through.
    // z-50                 -> sit above <main> and <footer>.
    // relative z-10   -> the header's own stacking context. The two fixed
    //                     texture layers in index.css are z-0 and are painted
    //                     over the cream page; without this the grain would
    //                     sit on top of the nav bar.
    // bg-moss-50      -> a half-step lighter than the page, so the bar reads
    //                     as a distinct surface rather than blending in. It is
    //                     opaque, so content scrolling underneath is hidden.
    // z-20           -> above <main> (z-10) so the sticky bar is not painted
    //                     over by page content once md is reached. Both were
    //                     needed above the texture layers, but they cannot both
    //                     be z-10: at equal z-index the later element in the DOM
    //                     wins, and <main> comes after <header>.
    <header className="relative z-20 shrink-0 border-b border-moss-400 bg-moss-50 md:sticky md:top-0">
      {/* The mobile dropdown below is INSIDE this <nav> on purpose. It used to
          be a sibling of it, which left all five mobile links inside the
          banner landmark instead of the navigation landmark, so anyone moving
          between landmarks with a screen reader never reached them.

          <nav> can no longer be the flex row itself, because the dropdown has
          to sit BELOW that row rather than beside it, so the row moved into
          its own div. mx-auto/max-w-5xl stay on <nav> so the dropdown is
          constrained to the same measure as the row -- visually a no-op,
          because the dropdown is md:hidden and therefore only ever renders
          below 768px, where a 1024px max-width cannot constrain anything. */}
      <nav
        aria-label="Main"
        className="mx-auto w-full max-w-5xl"
      >
        <div className="flex items-center justify-between px-4 py-4">
          {/* Brand doubles as a "back to home" link. It uses the short brand
              name from data/profile.js rather than the full name, so it fits
              beside the hamburger at 375px. The literal space between the two
              expressions survives JSX whitespace trimming, so the two parts do
              not run together into "JulianaBartolome".

              focusRingClass on it because this is the FIRST tab stop on the
              whole site: without a ring, a keyboard user's very first
              interaction produced no visible focus at all (WCAG 2.4.7 Focus
              Visible, Level A). No Lighthouse audit catches this one. */}
          <NavLink to="/" className={`text-lg font-bold text-ink-900 ${focusRingClass}`}>
            {brandFirst} <span className="text-moss-600">{brandLast}</span>
          </NavLink>

          {/* Desktop: inline row of links, hidden below md. */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.to}>
                {/* No `end` prop needed on the Home link: react-router v8
                    special-cases `to="/"` so it only matches the root route.
                    In v6 omitting `end` here made "Home" highlight on every
                    page. */}
                <NavLink to={link.to} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile: hamburger. Hidden from md upward, where the row above
              takes over. */}
          <button
            type="button"
            onClick={() => setOpen((isOpen) => !isOpen)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-md p-2 text-ink-500 transition-colors hover:text-moss-700 focus-visible:ring-2 focus-visible:ring-moss-700 focus-visible:ring-offset-2 focus-visible:ring-offset-moss-50 focus-visible:outline-none md:hidden"
          >
            {/* Decorative only — the button's aria-label carries the meaning,
                so the SVG is hidden from assistive tech. focusable="false"
                goes with aria-hidden: without it, older engines could still
                place a focus stop on the SVG itself, adding a tab stop inside a
                button that leads nowhere. */}
            <svg
              aria-hidden="true"
              focusable="false"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown. Inside <nav> (see the note above) and in normal flow
            below the bar, so it pushes content down instead of covering it.
            `md:hidden` means it can never appear on desktop, even if open were
            somehow true. */}
        <ul
          id="mobile-menu"
          className={`border-t border-moss-400 bg-moss-50 md:hidden ${open ? 'block' : 'hidden'}`}
        >
          {links.map((link) => (
            <li key={link.to} className="border-b border-moss-300 last:border-b-0">
              <NavLink
                to={link.to}
                className={linkClass}
                // Close the menu after a tap, so the user lands on the page
                // instead of staring at an open panel over it.
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
