/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Design system colors from curry-landing (mobile)
        'design-background': '#FFFFFF',
        'design-foreground-high': '#101828',
        'design-foreground-default': '#344054',
        'design-foreground-low': '#98A2B3',
        'design-primary': '#1570EF',
        'design-primary-light': '#D1E9FF',
        'design-outline-default': '#D0D5DD',
        'design-surface': '#FCFCFD',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
    },
  },
};