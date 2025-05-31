// vite.config.ts
import { defineConfig } from 'vite'
import react         from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [ react() ],
  // tu n’as pas besoin d’autre chose pour Tailwind !
})
