import styled, { css } from 'styled-components'

// Every button on the site renders from this component, so "identical across
// pages" is structural rather than a convention someone has to maintain. The
// hero calls to action, the contact submit and the 404's back link all use it.
//
// WHY TAILWIND DOES NOT STYLE IT: the responsive width is exactly the case
// Tailwind handles well, so `w-full sm:w-auto` stays on the call site as a
// Tailwind class. This component owns visual identity and the two variants.
//
// That split is not just tidiness, it is a correctness requirement.
// styled-components injects its <style> at RUNTIME, after Tailwind's
// stylesheet, so at equal specificity its rules win. Any Tailwind class that
// collided with something declared here would be silently overridden. Keeping
// layout in Tailwind and appearance here means the two never collide.
//
// Tokens are read from CSS variables rather than hardcoded hex. Tailwind v4's
// @theme block emits every token to :root, so var(--color-moss-600) resolves to
// exactly the same value as the bg-moss-600 utility and stays in sync if a token
// changes in index.css.
//
// One gap worth knowing: Tailwind v4 does not expose its spacing scale as CSS
// variables by default, so the border-radius and padding below are literal
// values. Retuning the theme's spacing tokens in index.css will NOT move these
// buttons, unlike the Tailwind classes elsewhere.
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  /* A press is a real interaction, so the active state translates 1px down
     rather than only changing colour. transform is in the transition list
     because leaving it out makes the press instant and lifeless. The
     reduced-motion block in index.css forces transition-duration to ~0, so
     the press still registers instantly for users who asked for less motion;
     the position change is a state cue, not decoration. */
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease,
    transform 100ms ease, box-shadow 200ms ease;
  &:active {
    transform: translateY(1px);
  }

  /* Tailwind's preflight sets button { font: inherit }, and both that rule and
     this one target the button, so font is declared explicitly above rather
     than left to depend on injection order. */
  /* Written as box-shadow rather than Tailwind's ring utilities, because
     styled-components injects at runtime and would win any collision at
     equal specificity.

     A filled moss-600 button cannot use the moss-700 ring that
     focusRingClass uses on page-background elements: 700 on the 600 fill is
     1.28:1, effectively invisible. So the focus-visible block is declared
     per variant below, where the ring colour can differ. This base rule only
     clears the outline; the variants supply the actual two-layer shadow. */

  /* $variant is a TRANSIENT prop: the $ prefix stops styled-components
     forwarding it to the DOM, which would otherwise trigger a React
     unknown-prop warning on <button>. Anything that is not 'secondary' renders
     as primary, so a missing or misspelt variant still looks like a button
     rather than an unstyled element. */
  ${({ $variant }) =>
    $variant === 'secondary'
      ? css`
          background-color: transparent;
          color: var(--color-moss-700);
          border: 1px solid var(--color-moss-600);
          /* 2px page gap, then the moss-700 ring. */
          &:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-moss-100),
              0 0 0 4px var(--color-moss-700);
          }
          &:hover {
            background-color: var(--color-moss-300);
            border-color: var(--color-moss-700);
          }
        `
      : css`
          /* The transparent border is not decoration. Without it the primary
             variant has no border box while the secondary has a 1px one, so
             the two variants render at different heights. This is a real bug in
             the Tailwind classes this component replaces. */
          background-color: var(--color-moss-600);
          /* cream-50, not a dark ink: the mid matcha #6d8a45 would only give
             3.74:1 against cream, and moss-600 itself gives 4.97:1. */
          color: var(--color-cream-50);
          border: 1px solid transparent;
          /* The ring is cream, not moss-700. On the moss-600 fill a moss-700
             ring measures 1.28:1 and vanishes; cream on the fill is 6.09:1. */
          &:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-moss-100),
              0 0 0 4px var(--color-cream-50);
          }
          &:hover {
            background-color: var(--color-moss-700);
          }
        `}
`

export default StyledButton
