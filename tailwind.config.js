/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        'custom-blue': '#52a0fe',
        'add': '#d0f501',
        'header-bg': '#0d0d13',
        'error': '#ec0358',
        'bg-input': '#f1f5f9',
        'add-product': '#64748b'
      },
    },
  },
  plugins: [],
}
