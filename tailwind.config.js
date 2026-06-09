/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#c97efd',
        energy: '#ff8e06',
        ink: '#0a0a0a',
        pitch: '#050505',
        cloud: '#f5f5f7',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-22px)' },
        },
      },
    },
  },
  plugins: [],
}
