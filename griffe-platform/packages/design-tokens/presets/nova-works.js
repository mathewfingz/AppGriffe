/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Nova Works store dashboard colors
        dashboard: {
          bg: "hsl(var(--dashboard-bg))",
          card: "hsl(var(--dashboard-card))",
          text: "hsl(var(--dashboard-text))",
          "text-muted": "hsl(var(--dashboard-text-muted))",
          border: "hsl(var(--dashboard-border))",
          success: "hsl(var(--dashboard-success))",
          danger: "hsl(var(--dashboard-danger))",
        },
        store: {
          primary: '#3B82F6',
          secondary: '#6B7280',
          success: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
          bg: '#F9FAFB',
          card: '#FFFFFF',
          border: '#E5E7EB',
        },
      },
      spacing: {
        '14': '3.5rem',
        '18': '4.5rem',
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'store': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'store-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};