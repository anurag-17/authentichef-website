/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'max': '640px'}, // Define custom screen size 'xs' with a maximum width of 319px
        'lg': {'min': '1024px'}, // Define custom screen size 'xs' with a maximum width of 319px
        'md': {'min': '768px'}, // Define custom screen size 'xs' with a maximum width of 319px
        'xl': {'min': '1280px'}, // Define custom screen size 'xs' with a maximum width of 319px
        '2xl': {'min': '1536px'}, // Define custom screen size 'xs' with a maximum width of 319px
        'xss': {'max': '400px'}, // Define custom screen size 'xs' with a maximum width of 319px
        // 'xss': {'min': '400px'}, // Define custom screen size 'xs' with a maximum width of 319px
        // 'sm': {'max': '640px'},
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
