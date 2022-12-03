const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--dancing-script)', ...fontFamily.sans],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'brick': '#983711',
      'magenta': '#982A40',
      'darkchocolate': '#190c0a',
      'darknavy': '#39486A',
      'midnight': '#2F4858',
      'whitesmoke': '#f5f5f5',
      'black':'#000000',
      'error':'#ff0000',
      'success':'#9acd32',
      'gray':'#4a5568'
    },
  },
  plugins: [],

  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
}
