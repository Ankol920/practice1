import { useRef, useState } from 'react'
import StyledButton from './StyledButton.jsx'

// Contact is the "/contact" route: a controlled form with client-side
// validation and no backend behind it.
//
// Controlled inputs: each field's value lives in the formData state object
// rather than in the DOM, and every keystroke runs handleChange to write the new
// value back through setFormData, so React re-renders with exactly one source of
// truth. Reading values out of state instead of off the DOM is also what lets
// handleSubmit validate them without touching event.target again.

// Defined once so the reset on success and the "type over it" case both start
// from the same empty object, and so the two never drift apart.
const EMPTY = { name: '', email: '', message: '' }

// Field order. This is also the order handleSubmit walks when it decides which
// invalid field to focus, so the focus lands on the topmost problem.
const FIELDS = ['name', 'email', 'message']

// Deliberately permissive. This only has to catch typos like a missing "@", not
// adjudicate RFC 5322. Note that type="email" still gives a mobile keyboard with
// an "@" key even though the browser's own validation is switched off below.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Returns an error string, or null when the value is acceptable. Early returns
// instead of a chain of ternaries so the email rule stays readable.
function validateField(name, value) {
  const trimmed = value.trim()
  if (name === 'name') {
    return trimmed ? null : 'Please enter your name.'
  }
  if (name === 'email') {
    if (!trimmed) return 'Please enter your email address.'
    return EMAIL_PATTERN.test(trimmed)
      ? null
      : 'Please enter a valid email address, for example name@example.com.'
  }
  if (name === 'message') {
    return trimmed ? null : 'Please enter a message.'
  }
  return null
}

// Object.fromEntries over FIELDS, filtered down to the fields that actually
// failed, so an all-valid form produces {} rather than three nulls.
function validateAll(values) {
  return Object.fromEntries(
    FIELDS.map((name) => [name, validateField(name, values[name])]).filter(
      ([, error]) => error,
    ),
  )
}

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // One ref per field, so handleSubmit can move focus to the first invalid one.
  // Separate refs rather than a callback-ref map, which would detach and
  // reattach on every render.
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const fieldRefs = { name: nameRef, email: emailRef, message: messageRef }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // A stale confirmation would contradict what the visitor is now typing.
    setSubmitted(false)

    setErrors((prev) => {
      // Re-check this one field, but only if it already has an error. That
      // clears it as soon as the value becomes valid, and never invents a new
      // one before the first submit, so the form does not shout mid-typing.
      // Returning prev unchanged lets React skip the re-render.
      if (!prev[name]) return prev
      const error = validateField(name, value)
      if (error) return { ...prev, [name]: error }
      // Drop the key by copying and deleting rather than with rest destructuring:
      // `const { [name]: _gone, ...rest }` leaves an unused binding, and ESLint
      // 10 reports it because ignoreRestSiblings now defaults to false.
      const rest = { ...prev }
      delete rest[name]
      return rest
    })
  }

  function handleSubmit(event) {
    // Keeps the page from navigating away, which is the default for a form
    // with no action attribute.
    event.preventDefault()

    // Validate the trimmed values, so a field holding only spaces fails the
    // same way an empty one does. HTML's own required attribute treats "   " as
    // present, which is a real gap.
    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    }

    const nextErrors = validateAll(trimmed)
    setErrors(nextErrors)

    const firstInvalid = FIELDS.find((name) => nextErrors[name])
    if (firstInvalid) {
      setSubmitted(false)
      // Move the caret to the first problem, so a keyboard or screen reader user
      // is told what went wrong instead of submitting into silence. The field's
      // aria-describedby then reads the error out with its label.
      fieldRefs[firstInvalid].current?.focus()
      return
    }

    // There is no backend, so nothing is transmitted here. This is where a
    // fetch() to a form service would go.
    setFormData(EMPTY)
    setErrors({})
    setSubmitted(true)
  }

  // The border is left out of this shared string on purpose. The valid and
  // invalid states use different border widths, and two competing width classes
  // on one element would depend on which one Tailwind happens to emit last.
  //
  // bg-moss-100, not bg-moss-200: the form below is itself a moss-200 card, and
  // a field the same colour as its card is invisible. This is the same inset
  // pattern ProjectCard uses for its tech tags -- a darker fill nested on a
  // lighter panel.
  const fieldClass =
    'w-full rounded-lg bg-moss-100 px-4 py-3 text-base text-ink-900 transition-colors focus-visible:border-moss-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-600/40'
  const validBorder = 'border border-moss-400'
  // 2px rather than 1px is deliberate, and berry rather than moss. Under the old
  // dark theme an error was signalled by thickness alone because moss-600 was
  // the only accent in play. On cream that is not enough, and moss-600 for the
  // error TEXT measures just 4.20:1 on the moss-200 card, which fails AA for
  // 14px copy. berry-700 is 6.15:1 here. The colour is not the only cue: the
  // thicker edge, the message below it and aria-invalid all carry the state too.
  const invalidBorder = 'border-2 border-berry-700'

  return (
    // No <main> -- Layout.jsx owns the page's single <main> landmark.
    <div className="space-y-12">
      {/* Promoted from <h2> in increment 8. /contact was the last page on the
          site with no top-level heading, so it never appeared in a screen
          reader's heading list. Heading order here is now a single 1. */}
      <h1 id="contact-heading" className="text-3xl font-extrabold sm:text-4xl">
        Contact
      </h1>

      <p className="max-w-2xl text-ink-500">
        Have a project in mind or a question? Send a message below.
      </p>

      {/* Always rendered, empty when there is nothing to say. A live region is
          announced when its CONTENT changes, so a role="status" element that
          mounts together with its text is announced by most screen readers but
          not reliably by all -- the region has to already be in the DOM.
          aria-live is implied by role="status" and is written out only to make
          the intent obvious. The copy says outright that nothing was sent,
          because with no backend "message sent" would be a false claim. The
          classes are conditional so no empty bordered box is left behind. */}
      <p
        role="status"
        aria-live="polite"
        className={
          submitted
            ? 'max-w-2xl rounded-lg border border-bark-700 bg-moss-50 p-4 font-medium text-bark-700'
            : ''
        }
      >
        {submitted
          ? 'Thanks, your form validated and reset. There is no backend wired up yet, so nothing was actually sent.'
          : ''}
      </p>

      {/* noValidate switches off the browser's own validation bubbles, which
          would otherwise block the submit and mean our inline errors never
          appear. The required attributes stay, because they are what tells
          assistive tech the field is mandatory. */}
      {/* Card-wrapped in increment 9 so this is not the only content block on
          the site with no surface of its own: same border-moss-400 /
          bg-moss-200 treatment as the project, education and skill cards. */}
      <form
        noValidate
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-8 rounded-xl border border-moss-400 bg-moss-200 p-6"
      >
        <div className="space-y-2">
          <label htmlFor="contact-name" className="block font-medium text-ink-900">
            Name
          </label>
          {/* text-base is 16px on purpose: iOS Safari zooms the viewport when a
              focused input is smaller than that, which is jarring at 375px. */}
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            ref={nameRef}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={`${fieldClass} ${errors.name ? invalidBorder : validBorder}`}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-sm font-medium text-berry-700">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className="block font-medium text-ink-900">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            ref={emailRef}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={`${fieldClass} ${errors.email ? invalidBorder : validBorder}`}
          />
          {errors.email && (
            <p
              id="contact-email-error"
              className="text-sm font-medium text-berry-700"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-message" className="block font-medium text-ink-900">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            ref={messageRef}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={`${fieldClass} ${errors.message ? invalidBorder : validBorder} resize-y`}
          />
          {errors.message && (
            <p
              id="contact-message-error"
              className="text-sm font-medium text-berry-700"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* The same shared component as the hero calls to action and the 404
            link, so every button on the site is identical by construction.
            w-full until sm keeps it a comfortable tap target at 375px; the
            visual identity comes from StyledButton, not from this class. */}
        <StyledButton
          type="submit"
          $variant="primary"
          className="w-full sm:w-auto"
        >
          Send message
        </StyledButton>
      </form>
    </div>
  )
}
