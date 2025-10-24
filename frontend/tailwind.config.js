/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f0',   // Very light coral
          100: '#ffe8dc',  // Light peachy
          200: '#ffd1b8',  // Soft coral
          300: '#ffb894',  // Medium coral
          400: '#ff9f70',  // Bright coral
          500: '#ff8752',  // Main coral/peach (converted from oklch)
          600: '#ff6e34',  // Deep coral
          700: '#e85a28',  // Darker coral
          800: '#c24820',  // Very dark coral
          900: '#9a3a1a',  // Almost black coral
        },
        dark: {
          50: '#18181b',   // Near black
          100: '#27272a',  // Dark gray
          200: '#3f3f46',  // Medium dark
          300: '#52525b',  // Gray
          400: '#71717a',  // Light gray
          500: '#a1a1aa',  // Lighter gray
        }
      }
    },
  },
  plugins: [],
}
