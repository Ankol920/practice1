// Skills, grouped by category so Skills.jsx can render one <section> and one
// <h2> per group without bucketing anything itself. Plain data, no React, same
// convention as profile.js and projects.js.
//
// There is deliberately NO `level` field. A proficiency rating is a
// self-assessment with no factual basis, and an inflated one on a graded
// portfolio is worse than none at all.
//
// `blurb` is a short statement of what the skill is actually used for, not a
// claim of expertise. It gives each card a second line of real content instead
// of padding, and it is the reason a card is distinguishable from a badge.
//
// `glyph` names one of the shapes in SkillGlyph.jsx rather than holding markup.
// Keeping SVG out of the data file means this stays plain data, and it means
// there is no way to accidentally put a decorative path where text belongs.
//
// The mix is weighted towards design and UX rather than coding, which is the
// actual emphasis of the work. Interface engineering is still listed, because
// this site is built with it and pretending otherwise would be a false claim.
//
// `allSkills` is the same data flattened, for the compact Home preview, and
// `featuredSkills` is the subset flagged for that preview. The Home page cannot
// show all eighteen without becoming a second /skills page.

export const skillGroups = [
  {
    id: 'foundations',
    title: 'Design Foundations',
    summary: 'The visual grammar every interface is built from.',
    skills: [
      {
        id: 'visual-design',
        name: 'Visual Design',
        blurb: 'Hierarchy, balance and type that guide the eye before it reads.',
        glyph: 'leaf',
        featured: true,
      },
      {
        id: 'typography',
        name: 'Typography',
        blurb: 'Type scales, measure and rhythm that make text comfortable to read.',
        glyph: 'stone',
        featured: true,
      },
      {
        id: 'colour',
        name: 'Colour Theory',
        blurb: 'Palettes with tested contrast rather than guesses that look nice.',
        glyph: 'drop',
        featured: true,
      },
      {
        id: 'layout',
        name: 'Layout and Grid',
        blurb: 'Flexible systems that hold together from 375px to 1280px.',
        glyph: 'grid',
        featured: true,
      },
    ],
  },
  {
    id: 'ux',
    title: 'User Experience',
    summary: 'Finding out what people actually need, then designing to it.',
    skills: [
      {
        id: 'research',
        name: 'User Research',
        blurb: 'Interviews and observation that replace assumptions with evidence.',
        glyph: 'seed',
        featured: true,
      },
      {
        id: 'usability',
        name: 'Usability Testing',
        blurb: 'Task-based testing that shows where a design breaks down.',
        glyph: 'sprout',
        featured: true,
      },
      {
        id: 'ia',
        name: 'Information Architecture',
        blurb: 'Grouping and labelling so content can be found without guessing.',
        glyph: 'tree',
        featured: true,
      },
      {
        id: 'interaction',
        name: 'Interaction Design',
        blurb: 'States, feedback and motion that explain what a control will do.',
        glyph: 'wave',
        featured: true,
      },
      {
        id: 'accessibility',
        name: 'Accessibility (WCAG)',
        blurb: 'AA contrast, keyboard paths and screen-reader semantics as standard.',
        glyph: 'shield',
        featured: true,
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Prototyping and Delivery',
    summary: 'Turning a decision into something a team can react to.',
    skills: [
      {
        id: 'wireframing',
        name: 'Wireframing',
        blurb: 'Cheap low-fidelity structure before any visual detail is committed.',
        glyph: 'grid',
        featured: false,
      },
      {
        id: 'prototyping',
        name: 'Prototyping',
        blurb: 'Clickable flows for testing an idea before it is built for real.',
        glyph: 'wave',
        featured: false,
      },
      {
        id: 'design-systems',
        name: 'Design Systems',
        blurb: 'Shared tokens and components so consistency is structural, not remembered.',
        glyph: 'leaf',
        featured: false,
      },
      {
        id: 'handoff',
        name: 'Developer Handoff',
        blurb: 'Specs and tokens precise enough that the build matches the design.',
        glyph: 'stone',
        featured: false,
      },
    ],
  },
  {
    id: 'engineering',
    title: 'Interface Engineering',
    summary: 'Enough code to build and ship the design directly, with no gap in between.',
    skills: [
      {
        id: 'html-css',
        name: 'HTML and CSS',
        blurb: 'Semantic markup, modern layout and custom properties as foundations.',
        glyph: 'grid',
        featured: false,
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        blurb: 'Component state, form validation and DOM behaviour.',
        glyph: 'drop',
        featured: false,
      },
      {
        id: 'react',
        name: 'React',
        blurb: 'Component architecture and routed single-page applications.',
        glyph: 'sprout',
        featured: false,
      },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    summary: 'What the work is actually made in.',
    skills: [
      {
        id: 'figma',
        name: 'Figma',
        blurb: 'Design, prototyping and inspection in one file.',
        glyph: 'seed',
        featured: false,
      },
      {
        id: 'git',
        name: 'Git and GitHub',
        blurb: 'Branching, review history and a recoverable trail of every change.',
        glyph: 'tree',
        featured: false,
      },
    ],
  },
]

// flatMap concatenates each group's skills array into a single flat list.
export const allSkills = skillGroups.flatMap((group) => group.skills)

// The Home preview shows the featured subset, in this order. A slice would take
// the first N and pull in whichever flags happened to sit early, so the order
// is stated rather than derived.
export const featuredSkills = [
  'visual-design',
  'research',
  'typography',
  'usability',
  'colour',
  'accessibility',
].map((id) => allSkills.find((skill) => skill.id === id))
