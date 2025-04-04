/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                f1: {
                    red: "var(--f1-red)",
                    black: "var(--f1-black)",
                    white: "var(--f1-white)",
                    bgLight: "var(--f1-bg-light)",
                    bgDark: "var(--f1-bg-dark)",
                    gray: "var(--f1-gray)",
                    darkGray: "var(--f1-dark-gray)",
                    border: "var(--f1-border)",
                    yellow: "var(--f1-yellow)",
                    blue: "var(--f1-blue)",
                    green: "var(--f1-green)",
                    orange: "var(--f1-orange)",
                    purple: "var(--f1-purple)",
                },
            },
            fontFamily: {
                sans: ["Titillium Web", "Arial", "sans-serif"],
                number: ["JetBrains Mono", "sans-serif"],
            },
            boxShadow: {
                card: "0px 4px 10px rgba(255, 24, 1, 0.2)",
                glow: "0px 0px 20px rgba(255, 24, 1, 0.5)",
            },
            borderRadius: {
                xl: "12px",
                "2xl": "20px",
            },
            fontSize: {
                xxs: "10px",
                xs: "12px",
                sm: "14px",
                base: "16px",
                lg: "20px",
                xl: "24px",
                "2xl": "36px",
                "3xl": "48px",
            },
        },
    },
    plugins: [],
};
