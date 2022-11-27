/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "point-blue": "#0197F6",
            },
        },
    },
    plugins: [require("daisyui")],
};
