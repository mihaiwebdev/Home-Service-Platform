module.exports = {
    content: [
        "./index.html",
        "./src/App.jsx",
        "./src/pages/Homepage.jsx",
        "./src/pages/ServicesPage.jsx",
        "./src/pages/LoginPage.jsx",
        "./src/pages/RegisterPage.jsx",
        "./src/components/Navbar.jsx",
        "./src/components/Navigation.jsx",
    ],

    theme: {
        colors: {
            lime: "rgba(193, 241, 50, 0.76)",
            limeMatch: "#f4f1de",
            dark: "#212529",
            gray: "#dad7cd",
            white: "#fff",
            red: "#e63946",
            lightLime: "#fffcf2"
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
                '3xl': 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;',
                'cm-md': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'
            },
        },

        borderRadius: {
            'full': '9999px',
            'md': '15px',
            'lg': '25px',
            '3xl': '40px'
        }
    },

    plugins: [
        require('tailwindcss-pseudo-elements')
    ]
}