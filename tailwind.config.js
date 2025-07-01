/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        border: '#e5e7eb',
        background: '#f3f4f6',
        foreground: '#111827',
        ring: '#3b82f6',
      }
    },
  },
  plugins: [],
}