// The shapes used on skill cards.
//
// WHY A SEPARATE FILE: src/data/skills.js holds plain data and must not contain
// markup, so the glyph name travels there and the drawing happens here. It also
// keeps eight paths of SVG out of Skills.jsx, which is otherwise readable.
//
// EVERY GLYPH IS DECORATIVE. Each one is aria-hidden and focusable="false":
// the card's skill name is the real content, and a screen reader announcing
// "leaf" before "Visual Design" would be noise. `focusable="false"` goes with
// aria-hidden because older engines could otherwise still make the SVG a focus
// stop inside the card, which would add a tab stop that leads nowhere.
//
// All paths use currentColor and no explicit fill/stroke, so the shape inherits
// whatever text colour the card sets and needs no per-glyph colour decision.
//
// The shapes are simple on purpose. At the size they render they need to read
// as a texture, not compete with the skill name next to them.

// viewBox 0 0 24 24 for all of them, so they scale identically.
const GLYPHS = {
  // A pointed oval with a midrib.
  leaf: (
    <path d="M20 3c-7 0-12 2.7-12 8 0 1.5.6 2.9 1.6 3.8.2-2.7 1.2-4.9 3-6.4-.8 2-1 4.1-.7 6.4h1.6c-.2-2.8.3-5 1.7-6.7 1-1.3 2.2-2.1 3.8-2.6-.2 2.4-1.1 4.3-2.7 5.5-1 .8-2.3 1.3-3.8 1.6-.2.8-.3 1.5-.3 2.3 1.7-.2 3.2-.7 4.4-1.5 3.5-2.1 4.9-6 3.4-10.4Z" />
  ),
  // A rounded droplet.
  drop: (
    <path d="M12 2.5c3.6 4.3 6 7.6 6 10.5a6 6 0 0 1-12 0c0-2.9 2.4-6.2 6-10.5Zm0 17.5a3.5 3.5 0 0 0 3.5-3.5c0-1.6-1.6-3.9-3.5-6.3-1.9 2.4-3.5 4.7-3.5 6.3a3.5 3.5 0 0 0 3.5 3.5Z" />
  ),
  // Two leaves on a stem.
  sprout: (
    <path d="M11 21v-8.2c-2.9-.3-5-2.5-5-5.4 0-.5.1-1 .2-1.4 3 .2 5.4 2.3 5.8 5.1V8.2c0-2.7 2.2-4.9 5-4.9.5 0 1 .1 1.5.2.2 3-.2 5.7-1.6 7.6-.9 1.2-2.1 2-3.4 2.4V21h-2.5Z" />
  ),
  // A teardrop-shaped seed.
  seed: (
    <path d="M12 2c4 4.5 6 8 6 10.7A6 6 0 0 1 6 12.7C6 10 8 6.5 12 2Zm0 12.4c-1.1 0-2-.9-2-2 0-.9.9-2.3 2-3.9 1.1 1.6 2 3 2 3.9 0 1.1-.9 2-2 2Z" />
  ),
  // A conifer, for the information-architecture card.
  tree: (
    <path d="M12 2.5 6.8 11h2.4L5.5 18h5.1v3.5h2.8V18h5.1l-3.7-7h2.4L12 2.5Z" />
  ),
  // Three stacked waves, for motion and prototyping.
  wave: (
    <path d="M3 8.5c1.7 0 1.7 1.4 3.4 1.4S8.1 8.5 9.8 8.5s1.7 1.4 3.4 1.4 1.7-1.4 3.4-1.4 1.7 1.4 3.4 1.4V12c-1.7 0-1.7 1.4-3.4 1.4s-1.7-1.4-3.4-1.4-1.7 1.4-3.4 1.4-1.7-1.4-3.4-1.4S4.7 13.4 3 13.4V8.5Zm0 6c1.7 0 1.7 1.4 3.4 1.4s1.7-1.4 3.4-1.4 1.7 1.4 3.4 1.4 1.7-1.4 3.4-1.4 1.7 1.4 3.4 1.4v2.1c-1.7 0-1.7 1.4-3.4 1.4s-1.7-1.4-3.4-1.4-1.7 1.4-3.4 1.4-1.7-1.4-3.4-1.4S4.7 18 3 18v-3.5Z" />
  ),
  // A rounded square with an inner square, for layout and wireframing.
  grid: (
    <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2 2v5h5V6H7Zm7 0v5h5V6h-5Zm-7 7v5h5v-5H7Zm7 0v5h5v-5h-5Z" />
  ),
  // A shield with a check, for the accessibility card.
  shield: (
    <path d="M12 2 4 5v6.5c0 4.6 3.4 8.9 8 10.5 4.6-1.6 8-5.9 8-10.5V5l-8-3Zm3.6 6.1 1.4 1.4-6 6-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6Z" />
  ),
  // A flat-bottomed stone, for typography.
  stone: (
    <path d="M7 8.5C8.9 5.4 11.3 3.5 14 3.5c3.3 0 5.8 2.3 5.8 5.2 0 1.5-.8 2.7-1.9 3.6.9.5 1.6 1.4 1.6 2.5 0 1.9-1.7 3.4-3.7 3.4H9.4c-2.3 0-4.1-1.6-4.1-3.6 0-1.2.6-2.3 1.5-2.9-.5-.4-.8-1-.8-1.7 0-.4.1-.8.3-1.1.6 1 1.7 1.6 3 1.6 1 0 1.9-.4 2.4-1.1.2.1.4.2.7.2 1 0 1.8-.7 1.8-1.6 0-.9-.8-1.6-1.8-1.6-.5 0-1 .2-1.4.5C10.2 8.4 9 8.1 7 8.5Z" />
  ),
}

// `leaf` is the fallback for any name not in the table above, so a typo in the
// data file produces a generic leaf rather than an empty hole in the card.
export default function SkillGlyph({ name, className = 'h-6 w-6' }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {GLYPHS[name] || GLYPHS.leaf}
    </svg>
  )
}
