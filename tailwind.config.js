/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // sampled from your logo image
        gluv: {
          blue:   '#3EC2ED', // GrowLuv wordmark
          blue2:  '#72D2F2',
          orange: '#F6B27F', // "EDUCATE."
          red:    '#E15A57', // "EMPOWER."
          ink:    '#0F2F42',
          bg:     '#F6FBF8',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
