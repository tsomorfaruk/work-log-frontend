/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
