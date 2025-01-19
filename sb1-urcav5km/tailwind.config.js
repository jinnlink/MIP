/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        miku: {
          primary: 'var(--miku-primary)',
          secondary: 'var(--miku-secondary)',
          accent: 'var(--miku-accent)',
        }
      }
    },
  },
  plugins: [],
}