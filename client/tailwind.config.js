/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#37a5b8",   
        secondary:"#fdfdf7", 
        gradient1: "bg-gradient-to-bl from-blue-500 to-blue-800" ,          
        text1: "#ffffff",
        text2: "#333333",
        text3: "#969c9e",    
        text4: "#ECE7E2",
        thirdColor: "#5F95E3"
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
