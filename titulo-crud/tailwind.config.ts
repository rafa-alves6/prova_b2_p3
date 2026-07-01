import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102A43',
        gold: '#D9A441',
        sand: '#F5F1E8',
      },
    },
  },
  plugins: [],
};

export default config;
