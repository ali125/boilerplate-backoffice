/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4",
        primary2: "#06b6d4",
        secondary: "#5b21b6",
        // grc: {
        //   icon: '#6be4ff',
        //   tertiary: '#235b85',
        //   tertiaryDark: '#1a4768',
        //   secondary: '#2dd4bf', // teal-400
        // }
      },
      // fontFamily: {
      //   iranyekan: [
      //     "IRANYekanX, sans-serif"
      //   ],
      //   yekanbakh: [
      //     "Yekan Bakh, sans-serif"
      //   ],
      // },
    },
  },
  plugins: [],
  important: 'body',
}