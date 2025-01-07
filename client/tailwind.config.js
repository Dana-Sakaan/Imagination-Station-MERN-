/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#0A7273",   
        color2:"#E9E3D5", 
        color3: "#033043",
        color4: "#FDA521",          
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px", //tablet
      sm: "768px", //tablet
      md: "1060px",//laptops
      lg: "1200px",
      xl: "1700px",
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      lg: '1.15rem',
      xl: '1.25rem',
      '1xl': '1.4rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
  },
  plugins: [],
}
}
