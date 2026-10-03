import { Link } from 'react-router'
import StyledButton from './StyledButton.jsx'
import profilePhoto from '../assets/profile.jpg'
import { fullName, intro, bio } from '../data/profile.js'
<<<<<<< HEAD
import { allSkills } from '../data/skills.js'
=======
import { featuredSkills } from '../data/skills.js'
>>>>>>> 31be1fd (working version v1)
import { textLinkClass } from '../lib/styles.js'

// Home is the "/" route: a hero with the name, a one-line introduction and
// two calls to action.
//
// NOTE: there is no <main> in this file. Layout.jsx already renders the
// page's single <main> landmark, and a page may only have one, so Home
// contributes a labelled <section> inside it instead.
export default function Home() {
  return (
    <div className="space-y-12">
      {/* The hero. aria-labelledby points at the <h1>, so when a screen
          reader enters this region it announces the section by name.

          Two columns from lg up, stacked below it. The portrait is decorative
          here rather than informative: this is the same photograph that
          appears on /about, where it carries an alt description, so repeating
          it with a second alt string would make a screen reader announce the
          same image twice per visit. Empty alt plus aria-hidden is the correct
          way to mark a purely visual repeat.

          The order is deliberate and is NOT reordered with order-1: on a phone
          the name and the introduction have to come before any image, so the
          portrait genuinely is second in the DOM at every width. */}
      <section aria-labelledby="home-heading" className="space-y-8 py-8 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="max-w-3xl space-y-4">
          <h1
            id="home-heading"
            className="text-4xl font-extrabold sm:text-5xl lg:text-6xl"
          >
            {fullName}
          </h1>

          {/* The one-line introduction sits on its own line and in the moss-600
              colour so it reads as a subtitle rather than as body copy. */}
          <p className="text-lg font-medium text-moss-600 sm:text-xl">{intro}</p>

          <p className="max-w-2xl text-ink-500">{bio}</p>
        </div>

        {/* Decorative portrait. aria-hidden + empty alt: see the note on the
            grid above. The moss-300 panel and the rounded frame are what make
            it read as an inset panel rather than a floating rectangle. */}
        <div className="relative hidden lg:block">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-moss-400 bg-moss-300 p-3">
            <img
              src={profilePhoto}
              alt=""
              width="448"
              height="560"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
          {/* A moss-50 card tucked behind the portrait's lower-left corner, to
              break the single-rectangle silhouette. Decorative, so it carries
              no text and stays out of the accessibility tree. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl border border-moss-400 bg-moss-50"
          />
        </div>
        </div>

        {/* These LOOK like buttons but are Links, not <button>s, via StyledButton's
            `as` prop. A button that navigates is a semantics error: it breaks
            middle-click, "open in new tab", and the link affordances users
            expect. The visual identity comes from StyledButton; the responsive
            width stays a Tailwind class on the call site. */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <StyledButton
            $variant="primary"
            as={Link}
            to="/projects"
            className="w-full sm:w-auto"
          >
            View my projects
          </StyledButton>
          <StyledButton
            $variant="secondary"
            as={Link}
            to="/contact"
            className="w-full sm:w-auto"
          >
            Get in touch
          </StyledButton>
        </div>
      </section>

      {/* Compact skills preview. Placed after the hero. The <h2> keeps Home's
          heading order as h1 -> h2, with no skipped level. Data comes from the
          same file as /skills, so the two cannot drift. */}
      {/* The skills preview sits in a moss-50 band rather than directly on the
          page, so the lower third of the hero has a different surface from the
          upper two thirds. Still a <section> with the same labelled heading, so
          the h1 -> h2 order is unchanged. */}
      <section aria-labelledby="home-skills-heading" className="band-moss p-6 md:p-8">
        <div className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 id="home-skills-heading" className="text-lg font-bold">
            Skills
          </h2>
          <Link
            to="/skills"
            className={textLinkClass}
          >
            View all skills
          </Link>
        </div>

        {/* Pills rather than cards here: this is a preview, so it stays one
<<<<<<< HEAD
            compact row instead of adding seven full cards to the home page.
            Same moss-400 border and moss-100 fill as the /skills badges, so it
            still reads as the same system. */}
        <ul role="list" className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
=======
            compact row instead of adding eighteen full cards to the home page.
            featuredSkills is a curated six, not a slice of allSkills -- the
            /skills page now carries the full set. Same moss-400 border and
            moss-100 fill as the /skills cards, so it reads as one system. */}
        <ul role="list" className="flex flex-wrap gap-2">
          {featuredSkills.map((skill) => (
>>>>>>> 31be1fd (working version v1)
            <li
              key={skill.id}
              className="rounded-full border border-moss-400 bg-moss-100 px-3 py-1 text-sm text-ink-500 transition-colors duration-200 hover:border-moss-600 hover:text-ink-900"
            >
              {skill.name}
            </li>
          ))}
        </ul>
        </div>
      </section>
    </div>
  )
}
