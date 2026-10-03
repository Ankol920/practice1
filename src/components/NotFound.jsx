import { Link } from 'react-router'
import StyledButton from './StyledButton.jsx'

// Rendered for any URL that does not match another route.
export default function NotFound() {
  return (
    // No py-16 here any more: Layout.jsx already gives <main> a py-8, so the
    // old extra padding doubled it and made this page's rhythm unlike the rest.
    <section
      aria-labelledby="notfound-heading"
      className="band-moss mx-auto max-w-2xl space-y-8 p-8 text-center md:p-12"
    >
      {/* The 404 is set in moss-700 rather than moss-600. At 60px it is
          "large text" and would pass 3:1 either way, but 700 is simply the
          stronger green on cream, and the extra contrast costs nothing. */}
      <p className="text-6xl font-extrabold text-moss-700">404</p>
      {/* Was text-2xl font-bold, the only h1 on the site not matching the other
          pages. This is a page like any other, so it gets the page h1. */}
      <h1 id="notfound-heading" className="text-3xl font-extrabold sm:text-4xl">
        Page not found
      </h1>
      <p className="text-ink-500">
        That page does not exist. Check the address, or head back home.
      </p>

      {/* Link does client-side navigation: no full page reload, and the
          Layout (navbar + footer) stays mounted. Rendering through StyledButton
          also gives this the focus ring it previously had none of at all. */}
      <StyledButton
        $variant="primary"
        as={Link}
        to="/"
        className="w-full sm:w-auto"
      >
        Back to home
      </StyledButton>
    </section>
  )
}
