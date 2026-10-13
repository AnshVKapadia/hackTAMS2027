module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        c2: '#a7b2d6',
        c3: '#53586d',
        c4: '#bfcff2',
        c5: '#414247',
        c9: '#f3f4f9',
        c12: '#b38f80',
        c15: '#6a463d',
        c18: '#8f99b8',
        c20: '#7f8aad',
        c21: '#122f4c'
      },
      backgroundOpacity: {
        '15': '0.15',
      }
    },
  },
  plugins: [
  ],
}
