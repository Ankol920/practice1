import { education } from '../data/education.js'

// The Education timeline: one entry per stage, newest first.
//
// A vertical rail, so the four stages read as a sequence rather than four
// unrelated cards. One column at every width, so nothing has to align side by
// side and there is no horizontal-scroll risk from a long school name.
export default function Education() {
  return (
    // No <main> -- Layout.jsx owns the page's single <main> landmark.
    <section aria-labelledby="education-heading" className="space-y-8">
      {/* Stays an <h2>: this renders inside /about, which already has its own
          <h1> ("About Me"), and a second h1 on one page would break the
          one-per-page rule. Keeping the existing education-heading id means the
          component drops into the About slot with no id to reconcile. */}
      {/* Was text-2xl, the only h2 on the site that was not text-lg. It sits
          alongside About's own Biography and Career Goal headings, so it now
          matches them. */}
      <h2 id="education-heading" className="text-lg font-bold">
        Education
      </h2>

      {/* An <ol>, not a <ul>: a timeline is a genuine sequence, and this orders
          it newest first. role="list" is required, not decoration -- Tailwind's
          preflight sets list-style:none, which makes Safari drop list
          semantics, so without it a VoiceOver user hears nothing here. Same
          reason as the skills grids and the ProjectCard tech tags. */}
      <ol role="list">
        {education.map((entry) => (
          // group drives group-last:hidden below, to drop the rail segment
          // under the final entry so the line stops at the last dot.
          <li key={entry.id} className="group flex gap-4 pb-6 last:pb-0">
            {/* The marker column. The connector is a flex-1 child rather than an
                absolutely positioned pseudo-element, so it stretches to fit
                whatever the entry's height turns out to be. No negative offsets
                or magic pixel math that can drift at other font sizes. */}
            <div aria-hidden="true" className="flex flex-col items-center pt-0.5">
              <span className="block h-3 w-3 shrink-0 rounded-full bg-moss-600" />
              <span className="mt-1 w-px flex-1 bg-moss-400 group-last:hidden" />
            </div>

            {/* min-w-0 is the guard against horizontal scroll in a flex row, the
                same reason it is on the About bio column. */}
            {/* surface-card rather than repeating rounded-xl / border / bg by
                hand, so the education entries cannot drift away from the project
                and skill cards the way they did when each file spelled its own
                surface out. Not -interactive: nothing inside is focusable, so
                the hover lift would imply an action that does not exist. */}
            <div className="surface-card min-w-0 flex-1 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-moss-700">
                {entry.stage}
              </p>

              <h3 className="mt-2 text-lg font-bold text-ink-900">
                {entry.school}
              </h3>

              {/* space-y-2 rather than the old space-y-1, which was a one-off
                  value that existed nowhere else in the project. */}
              <div className="mt-2 space-y-2">
                {entry.strand && <p className="text-moss-700">{entry.strand}</p>}
                <p className="text-sm text-ink-500">{entry.gradeSpan}</p>
              </div>

              {/* Literal "Ongoing" text in plain slate, not a status colour, so
                  the in-progress state never depends on colour alone. */}
              {entry.ongoing && (
                <p className="mt-3 text-sm font-medium text-ink-500">
                  Ongoing
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
