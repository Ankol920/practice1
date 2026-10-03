import { Outlet } from 'react-router'
import Navbar from './Navbar.jsx'
import { fullName } from '../data/profile.js'

// The shell every page renders inside. <Outlet /> is the empty slot where
// the matched page component from App.jsx gets rendered.
export default function Layout() {
  return (
    // flex + flex-col + min-h-screen lets <main> grow via flex-1, which
    // pins the footer to the bottom of the viewport on short pages.
    <div className="texture-grain texture-wash flex min-h-screen flex-col">
      {/* Skip to content. This is the FIRST element inside the shell, before
          <Navbar />, and that ordering is the entire point of it: a skip link
          that comes after the navigation still makes the user tab through the
          navigation first, which is the exact thing it exists to skip. The
          first Tab press on a cold page load lands here.

          WCAG 2.4.1 Bypass Blocks, Level A.

          It points at <main> below. Between them, two details make the jump
          actually work:

          tabIndex={-1} on <main> -- a fragment link scrolls the page but does
          NOT move focus unless the target is focusable. Without this, focus
          stays on this link and the user's next Tab restarts from the navbar,
          which is the exact problem the skip link exists to solve. -1 rather
          than 0 keeps it out of the tab order.

          scroll-mt-16 on <main> -- the navbar is sticky from md upward and is
          about 57px tall, so a plain jump would park the first heading
          underneath it. */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        /* relative + z-10 puts the content above the two fixed texture layers.
           Without it the grain and the radial washes, which are position:fixed
           with no z-index of their own beyond 0, would stack over the text. */
        className="relative z-10 mx-auto w-full max-w-5xl flex-1 scroll-mt-16 px-4 py-8"
      >
        <Outlet />
      </main>

      {/* ink-500 gives 6.92:1 on the moss-100 page, so the small print clears
          AA. The footer is separated by a moss-400 border to match the card
          edges rather than the old pale border, which disappeared against
          cream. */}
      <footer className="relative z-10 border-t border-moss-400 py-6 text-center text-sm text-ink-500">
        <p>&copy; {new Date().getFullYear()} {fullName}. All rights reserved.</p>
      </footer>
    </div>
  )
}
