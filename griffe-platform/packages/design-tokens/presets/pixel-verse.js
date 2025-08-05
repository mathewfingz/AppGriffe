/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        // Griffe design system colors (pixel-verse)
        griffe: {
          navy: "rgb(var(--griffe-navy))",
          blue: "rgb(var(--griffe-blue))",
          "blue-light": "rgb(var(--griffe-blue-light))",
          white: "rgb(var(--griffe-white))",
          gray: {
            high: "rgb(var(--griffe-gray-high))",
            default: "rgb(var(--griffe-gray-default))",
            low: "rgb(var(--griffe-gray-low))",
          },
          border: {
            primary: "rgb(var(--griffe-border-primary))",
            default: "rgb(var(--griffe-border-default))",
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'griffe': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'griffe-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
};