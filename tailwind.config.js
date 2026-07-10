module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tossBlue: '#3182f6',
        tossGrayBg: '#f9faeb',
        tossCard: '#ffffff',
        tossTextMain: '#191f28',
        tossTextSub: '#4e5968',
        tossRed: '#f04452',
        tossDecrease: '#3182f6',
      },
    },
  },
  plugins: [],
};
