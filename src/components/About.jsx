// The profile photo lives in src/assets/, which Vite bundles and
// content-hashes for cache busting, so it is referenced with an import
// rather than a bare "/profile.jpg" path. The benefit is that a missing or
// renamed file fails the build loudly instead of shipping a broken image.
//
// The relative path climbs out of components/ and back into assets/.
import profileImg from '../assets/profile.jpg'
import { fullName, intro, bio, goal, portraitAlt } from '../data/profile.js'
import Education from './Education.jsx'

// About is the "/about" route: name, biography, career goal and the profile
// photo, with a marked slot underneath for Education.
//
// NOTE: there is no <main> in this file — Layout.jsx owns the page's single
// <main> landmark. And the heading below is an <h1>, not an <h2>: /about is
// a page of its own now, so it needs its own top-level heading.
export default function About() {
  return (
    <div className="space-y-12">
      <section aria-labelledby="about-heading" className="space-y-8">
        <h1
          id="about-heading"
          className="text-3xl font-extrabold sm:text-4xl"
        >
          About Me
        </h1>

        {/* Stacked on mobile, side by side from md (48rem / 768px) up. */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          {/* shrink-0 stops flexbox from squashing the image column. */}
          <figure className="shrink-0">
            <img
              src={profileImg}
              alt={portraitAlt}
              width="224"
              height="280"
              decoding="async"
              className="aspect-[4/5] h-auto w-full max-w-[280px] rounded-2xl border border-moss-400 object-cover object-top md:w-56"
            />
            <figcaption className="mt-3 text-base font-semibold text-ink-900">
              {fullName}
            </figcaption>
          </figure>

          {/* min-w-0 is the guard against horizontal scroll in a flex row. A
              flex item defaults to min-width:auto, so one long unbroken word
              (a URL, an email address) can push this column wider than the
              viewport and produce a sideways scrollbar. min-w-0 lets it
              shrink below its content width instead. index.css also sets
              overflow-wrap: break-word as a second line of defence.

              space-y-6 rather than the old space-y-4: the two headed blocks
              below are now surface-cards with their own padding, so a 4-unit
              gap read as too little air between two bordered panels. */}
          <div className="min-w-0 flex-1 space-y-6">
            <p className="text-lg text-moss-700">{intro}</p>

            {/* Each headed block is its own moss-200 surface. This is what gives
                the page depth against the cream: without it the biography and
                goal sit as undifferentiated wall of text. */}
            <div className="surface-card space-y-2 p-6">
              <h2 className="text-lg font-bold">Biography</h2>
              <p className="text-ink-500">{bio}</p>
            </div>

            <div className="surface-card space-y-2 p-6">
              <h2 className="text-lg font-bold">Career Goal</h2>
              <p className="text-ink-500">{goal}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filled in increment 7: the dashed placeholder that used to mark this
          slot is gone, and the real data now lives in src/data/education.js. */}
      <Education />
    </div>
  )
}
