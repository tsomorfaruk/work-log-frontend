import animate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // screens: {
    //   xs: "400px",
    //   sm: "640px",
    //   md: "768px",
    //   lg: "1024px",
    //   xl: "1280px",
    //   "2xl": "1440px", // ✅ now overridden
    // },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "400px",
      },
      colors: {
        686868: "#686868",
        CFE6F1: "#CFE6F1",
        303030: "#303030",
        FFFFFF: "#FFFFFF",
        ACACAC: "#ACACAC",
        "007B99": "#007B99",
        F2FCFF: "#F2FCFF",
      },
      boxShadow: {
        "custom-1": "0px 1px 3px 1px #00000026",
        "custom-2": "0px 1px 2px 0px #0000004D",
      },
    },
  },
  plugins: [animate],
};
