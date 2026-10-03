// Shared by both external links so the GitHub and demo links can never drift
// apart visually. Now imported rather than declared here, because the identical
// string was also inlined in Home.jsx and the two had begun to diverge. It
// lives in lib/styles.js rather than here so the react-refresh lint rule stays
// happy about a non-component export.
import { textLinkClass } from '../lib/styles.js'

// Props are exactly the fields in src/data/projects.js, because Projects.jsx
// spreads each project object. `id` is deliberately not destructured: it is
// the React key on the parent <li>, not something the card itself needs.
export default function ProjectCard({
  title,
  description,
  technologies = [],
  image,
  imageAlt,
  github,
  demo,
}) {
  return (
    // focus-within mirrors every hover style. The card contains links, and a
    // hover-only effect is completely invisible to anyone reaching it with a
    // keyboard -- this is the whole point of the :focus-within variant.
    //
    // h-full + flex-col + mt-auto below keep every card in a grid row the same
    // height, with the link row pinned to the bottom edge, so the rows stay
    // visually even even when descriptions differ in length.
    <article className="surface-card surface-card-interactive flex h-full flex-col overflow-hidden focus-within:-translate-y-1">
      {/* Square moss panel, screenshot shown WHOLE.
          object-contain, deliberately NOT object-cover: the booking and food
          screenshots are ~1:2 portrait phone shots, and object-cover in a
          square panel would crop away roughly 70% of one and leave a
          meaningless horizontal slice. contain keeps every screenshot fully
          visible and letterboxes it against the theme colour, so the cards
          stay the same height no matter what shape image goes in later.
          No width/height attributes are needed here: the aspect-square parent
          already reserves the box, so there is no layout shift. */}
      {/* A decorative leaf in the corner of the image panel. aria-hidden AND
          focusable="false": the SVG carries no accessible name of its own, and
          without focusable="false" an older IE/Edge path could still put a
          focusable element inside the card, which would add a tab stop that
          leads nowhere. pointer-events-none so it never intercepts a click on
          the image. Purely ornament. */}
      <div className="relative flex aspect-square w-full items-center justify-center border-b border-moss-400 bg-moss-50 p-3">
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute -right-1 -top-1 h-10 w-10 text-moss-300"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 3c-9 0-16 3.5-16 10.5 0 2 .8 3.8 2 5 .3-3.5 1.6-6.4 4-8.4-1 2.6-1.3 5.4-1 8.4h2c-.3-3.6.4-6.6 2.2-8.9 1.3-1.7 2.9-2.8 4.8-3.4-.3 3.2-1.5 5.7-3.6 7.4-1.3 1-3 1.7-5 2.1-.3 1-.4 2-.4 3 2.2-.3 4.3-1 5.9-2 4.6-2.8 6.5-8 5.1-13.8Z" />
        </svg>
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-ink-500">{description}</p>

        {/* role="list" is required, not decoration: display:flex strips list
            semantics in Safari, so without it a VoiceOver user hears nothing
            at all here. key is the tech string, which is unique per card. */}
        <ul role="list" className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-moss-400 bg-moss-100 px-2.5 py-0.5 text-xs text-ink-500"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* The wrapper AND each link are guarded separately, so a project with
            no links does not render an empty padded row at the card's foot. */}
        {(github || demo) && (
          <div className="mt-auto flex flex-wrap gap-4 pt-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={textLinkClass}
              >
                GitHub
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className={textLinkClass}>
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
