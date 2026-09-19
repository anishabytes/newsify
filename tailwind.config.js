/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#263330', pine: '#27564b', terracotta: '#b85f45', paper: '#f7f5ef', line: '#dcded5', muted: '#717974' },
      fontFamily: { display: ['Libre Baskerville', 'serif'], sans: ['DM Sans', 'sans-serif'] },
    },
  },
}
