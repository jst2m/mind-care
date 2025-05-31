// tailwind.config.ts
import typography from '@tailwindcss/typography'
import lineClamp  from '@tailwindcss/line-clamp'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: { 50: '#f5f1eb' },
        olive: { 600: '#6b5f3d', 700: '#51472e', 800: '#453d28' },
      },
    },
  },
  plugins: [
    typography,
    lineClamp,
  ],
}
