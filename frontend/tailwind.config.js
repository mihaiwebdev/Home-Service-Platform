module.exports = {
    content: [
        "./index.html",
        "./src/App.jsx",
        "./src//pages/Homepage.jsx",
        "./src//pages/Welcomepage.jsx",
        "./src/pages/LoginPage.jsx",
        "./src/components/Navbar.jsx",
        "./src/components/Navigation.jsx",
    ],

    theme: {
        colors: {
            lime: "rgba(193, 241, 50, 0.749)",
            limeMatch: "#f4f1de",
            dark: "#212529",
            gray: "#dad7cd",
            white: "#f8f9fa",
            red: "#e63946",
            transparent: "transparent",
        },

        fontFamily: {
            raleway: 'Raleway, sans-serif',
            sourcesanspro: 'Source Sans Pro, sans-serif'
        },

        extend: {
            screens: {
                'short': { 'raw' : '(max-height: 600px)'},
                'short2': { 'raw' : '(max-height: 750px)'},
                '3xl': '1920px'
            },
            boxShadow: {
                '3xl': 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;'
            },
        },

        borderRadius: {
            'full': '9999px',
            '3xl': '40px'
        }
    },

    plugins: [
        require('tailwindcss-pseudo-elements')
    ]
}