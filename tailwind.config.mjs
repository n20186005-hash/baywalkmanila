/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'sunset-orange': '#E8772E',
        'sunset-pink': '#D4547A',
        'sunset-purple': '#5E4B8B',
        'ocean-deep': '#1E3A5F',
        'ocean-mid': '#2E6B9A',
        'ocean-light': '#6BA3C9',
        'sand-warm': '#F5E6D3',
        'sand-light': '#FAF3E7',
        'palm-green': '#3D7A3D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(135deg, #E8772E 0%, #D4547A 50%, #5E4B8B 100%)',
        'ocean-gradient': 'linear-gradient(180deg, #6BA3C9 0%, #2E6B9A 50%, #1E3A5F 100%)',
      },
    },
  },
  plugins: [],
};
