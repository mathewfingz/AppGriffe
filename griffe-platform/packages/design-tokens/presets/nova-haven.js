/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Nova Haven admin dashboard colors
        admin: {
          bg: '#FAFAFA',
          sidebar: '#EBEBEB',
          text: '#303030',
          border: '#E8E8ED',
          hover: 'rgba(250, 250, 250, 0.5)',
        },
      },
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-admin': 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
        'grid-pattern': 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      boxShadow: {
        'admin': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'admin-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
};