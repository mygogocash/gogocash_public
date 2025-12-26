/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '401px',
        //   sm: '640px',
        //   md: '768px',
        //   lg: '1024px',
        //   xl: '1280px',
        //   '2xl': '1536px',
      },
      colors: {
        'primary-1': 'rgba(231, 249, 239, 1)',
        'primary-2': 'rgba(208, 242, 223, 1)',
        'primary-3': 'rgba(131, 220, 154, 1)',
        'primary-4': 'rgba(0, 177, 79, 1)',
        'primary-5': 'rgba(43, 140, 84, 1)',
        'primary-6': 'rgba(11, 90, 45, 1)',

        'black-1': 'rgba(245, 245, 245, 1)',
        'black-2': 'rgba(224, 224, 224, 1)',
        'black-3': 'rgba(169, 169, 169, 1)',
        'black-4': 'rgba(104, 104, 104, 1)',
        'black-5': 'rgba(64, 64, 64, 1)',
        'black-6': 'rgba(0, 0, 0, 1)',

        'grey-1': 'rgba(223, 223, 223, 1)',
        'grey-2': 'rgba(217, 217, 217, 1)',
      },
    },
  },
  plugins: [],
};
