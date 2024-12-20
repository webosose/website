/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif']
      },
      colors: {
        'active-red':'#FD312E',
        'heritage-red': '#A50034',
        'warm-grey': '#F0ECE4'
      }
    },
  },
  plugins: [],
};
