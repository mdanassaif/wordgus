import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 6s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotateIn: {
          '0%': { transform: 'rotateY(-90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0)', opacity: '1' },
        },
        colorChange: {
          '0%, 100%': { color: 'inherit' },
          '50%': { color: '#8B5CF6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        audiowide: ['Audiowide', 'cursive'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities: { [key: string]: { animationDelay: string } } = {};
      for (let i = 1; i <= 7; i++) {
        newUtilities[`.animation-delay-${i*100}`] = {
          animationDelay: `${i * 0.1}s`,
        };
      }
      addUtilities(newUtilities);
    }),
  ],
};

export default config;