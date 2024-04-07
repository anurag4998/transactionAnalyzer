/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          customBorder: '#e2e2e7', // Replace '#ff9900' with your custom color code
          buttonHighLighted : 'rgba(2, 6, 12, 0.15)',
          dashedBorder : '#d3d3d3'
          // Add more custom colors as needed
        },
      },
      fontFamily: {
        'sans': ['Nunito', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        
      },
    },
    plugins: [],
  }