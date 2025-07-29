/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Decision-focused color palette
                'deep-slate': '#1a1a2e',
                'electric-blue': '#16213e',
                'decision-green': '#00f5ff',
                'choice-orange': '#ff6b35',
                'neural-purple': '#6c5ce7',
                'warm-gray': '#a8a8a8',
            },
            fontFamily: {
                'primary': ['Inter', 'system-ui', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Monaco', 'monospace'],
                'display': ['Clash Display', 'Inter', 'sans-serif'],
            },
            animation: {
                'decision-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'branch-grow': 'branch-grow 0.3s ease-out',
                'fade-in': 'fadeIn 0.5s ease-in-out',
            },
            keyframes: {
                'branch-grow': {
                    '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
                    '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'decision-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            },
        },
    },
    plugins: [],
} 