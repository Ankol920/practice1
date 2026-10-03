import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // tailwindcss() scans your .jsx files and injects only the CSS you use.
  // In v4 this replaces the old tailwind.config.js + postcss.config.js pair.
  plugins: [react(), tailwindcss()],
})
