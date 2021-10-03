module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      textColor: {
        primary: '#ef4444',
      },
      colors: (theme) => ({
        primary: '#ef4444',
        secondary: '#2563eb',
      }),
      fontFamily: {
        lato: 'Lato',
        roboto: 'Roboto',
        rubik: 'Rubik',
      },
      backgroundImage: {
        showcase: "url('/images/showcase.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
