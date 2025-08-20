/** @type {import('tailwindcss').Config} */
export default {
  // This is the key setting for manual dark mode toggling.
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your custom colors and other extensions go here
      colors: {
        'gray-950': '#030712',
        'gray-900': '#111827',
        'gray-800': '#1F2937',
        'indigo-950': '#110530',
        'indigo-600': '#4F46E5',
        'indigo-500': '#6366F1',
        'indigo-400': '#818CF8',
        'pink-500': '#EC4899',
        'pink-400': '#F472B6',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
        'gray-400': '#9CA3AF',
        'gray-500': '#6B7280',
      }
    },
  },
  plugins: [],
}