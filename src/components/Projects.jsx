import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data/projects.js'

// Projects is the "/projects" route. The cards come from the data array and
// ProjectCard stays purely presentational, so adding a project later is a
// one-entry change in src/data/projects.js and nothing here.
//
// NOTE: there is no <main> in this file -- Layout.jsx owns the page's single
// <main> landmark, and this contributes a labelled <section> inside it.
export default function Projects() {
  return (
    <section aria-labelledby="projects-heading" className="space-y-8">
      {/* The placeholder used <h2>. Promoted to <h1> because /projects is a
          page of its own and every page needs exactly one top-level heading. */}
      <h1 id="projects-heading" className="text-3xl font-extrabold sm:text-4xl">
        Projects
      </h1>

      {/* grid-cols-1 (default)      -> 1 column on mobile   (375px)
          sm:grid-cols-2 (>=640px)   -> 2 columns on tablet  (768px)
          lg:grid-cols-3 (>=1024px)  -> 3 columns on desktop (1280px)
          That maps exactly onto the three checkpoint widths. */}
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* key is the stable id from the data, never the array index. */}
        {projects.map((project) => (
          <li key={project.id} className="h-full">
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </section>
  )
}
