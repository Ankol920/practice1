import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import NotFound from './components/NotFound.jsx'

// The parent <Route> has no `path`, which makes it a "layout route": it adds
// no URL segment of its own but wraps every child below it. That is how the
// navbar and footer appear on every page without being repeated.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* `index` matches the parent's own URL, so this renders at "/" */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
        <Route path="contact" element={<Contact />} />

        {/* "*" catches anything left over, so /nope or /about/typo renders
            the 404 instead of a blank page. It sits inside the Layout, so
            the navbar and footer are still visible on the 404. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
