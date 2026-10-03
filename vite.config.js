import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev runs as an SPA. `vite preview` serves the prerendered build as real
// pages (dist/brief/index.html for /brief), matching Netlify.
export default defineConfig(({ isPreview }) => ({
  plugins: [react()],
  appType: isPreview ? 'mpa' : 'spa',
  // 'static' rather than Vite's default 'assets', which would collide with the /assets page
  build: { assetsDir: 'static' },
}))
