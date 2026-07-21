/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#070707',
        'surface-container': '#0c0c0e',
        'surface-container-low': '#121214',
        'surface-container-lowest': '#070707',
        'secondary-container': '#d6041d',
        'on-surface-variant': '#9a9a9f',
        'on-surface': '#e5e2e1',
        'primary': '#c9c6c5',
        'outline-variant': 'rgba(255,255,255,0.06)',
        'outline': '#4e4e54',
      },
      spacing: {
        'section-gap': '140px',
        'container-max': '1440px',
        'gutter': '32px',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
};
