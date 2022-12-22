/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "point-blue": "#0197F6",
            },
            backgroundImage: {
                "bird-img": "url('/src/image/bird.jpg')",
                "feedImg-img": "url('/src/image/feedImg.jpg')",
                "keyboard-img": "url('/src/image/keyboard.jpg')",
                "Load-img": "url('/src/image/Load.png')",
            },
        },
    },
    plugins: [require("daisyui")],
};
