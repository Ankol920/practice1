import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

// BrowserRouter is mounted once, as high as possible, so everything below
// it can use routing. It reads and writes the real URL in the address bar,
// which is what makes /about a shareable, refreshable link.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
