import SkillGlyph from './SkillGlyph.jsx'
import { skillGroups } from '../data/skills.js'

// Skills is the "/skills" route: a card per skill, grouped by category.
//
// NOTE: there is no <main> in this file -- Layout.jsx owns the page's single
// <main> landmark, and this contributes headings and sections inside it.
//
// Each skill name is an <h3> under its group's <h2>, so the page reads
// h1 -> h2 (group) -> h3 (skill) with no level skipped. It also gives every card
// a heading, which is how a screen reader user can jump between skills instead
// of walking eighteen anonymous list items.
export default function Skills() {
  return (
    <div className="space-y-12">
      {/* The placeholder used <h2>. Promoted to <h1> because /skills is a page
          of its own and every page needs exactly one top-level heading. The
          category <h2>s sit below it, so no level is ever skipped. */}
      <h1 id="skills-heading" className="text-3xl font-extrabold sm:text-4xl">
        Skills
      </h1>

      <p className="max-w-2xl text-ink-500">
        Weighted towards design and user experience, with enough interface
        engineering to build and ship the work directly.
      </p>

      {skillGroups.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`skills-${group.id}`}
          className="space-y-5"
        >
          <div className="space-y-1">
            <h2
              id={`skills-${group.id}`}
              className="text-lg font-bold text-moss-700"
            >
              {group.title}
            </h2>
            {/* The group's one-line description. It sits under the <h2> as
                plain copy, not as part of it, so the accessible name of the
                section stays the short title rather than reading as a sentence
                when a screen reader jumps to the region. */}
            <p className="text-sm text-ink-500">{group.summary}</p>
          </div>

          {/* role="list" is required, not decoration: display:grid strips list
              semantics in Safari, so without it a VoiceOver user hears nothing
              here. Same reason as the tech tags in ProjectCard.

              Two columns at 375px, three from sm (640px). A single column would
              make this page eighteen screens tall for no gain: the blurbs are
              two or three lines at this width, so a two-up card stays readable. */}
          <ul
            role="list"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.skills.map((skill) => (
              <li key={skill.id}>
                <div className="surface-card skill-card">
                  {/* Decorative. The <h3> below is the card's real content, so
                      a screen reader should not also announce the shape. */}
                  <span className="skill-glyph-tile">
                    <SkillGlyph name={skill.glyph} className="h-6 w-6" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-ink-900">{skill.name}</h3>
                    <p className="mt-1 text-sm text-ink-500">{skill.blurb}</p>
                    <span className="skill-rule" aria-hidden="true" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
