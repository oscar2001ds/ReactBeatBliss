/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px', 
        'sm': '640px', 
        'md': '768px', 
        'lg': '1024px', 
        'xl': '1280px', 
      },
      keyframes: {
        'fsong-play': {
          '0%': {
            height: '100%',
          },
          '50%': {
            height: '0',
          },
          '100%': {
            height: '100%',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'song-play': 'fsong-play 1s linear infinite',
      }
    },
  },
  plugins: [
		require("tailwindcss-animated"),
	],
}

