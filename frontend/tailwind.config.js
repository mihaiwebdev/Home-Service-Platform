module.exports = {
    content: [
        "./index.html",
        "./src/App.jsx",
        "./src/pages/Homepage.jsx",
        "./src/pages/LoginPage.jsx",
        "./src/pages/RegisterPage.jsx",
        "./src/pages/client/ServicesPage.jsx",
        "./src/pages/client/SchedulePage.jsx",
        "./src/pages/client/ProfilePage.jsx",
        "./src/pages/client/WorkersResult.jsx",
        "./src/pages/client/WorkerInfo.jsx",
        "./src/pages/worker/WorkerEditPage.jsx",
        "./src/components/shared/Navbar.jsx",
        "./src/components/shared/Navigation.jsx",
        "./src/components/shared/UpdatePwModal.jsx",
        "./src/components/shared/Modal.jsx",
        "./src/components/shared/DeleteAcc.jsx",
        "./src/components/shared/ErrorMsg.jsx",
        "./src/components/worker/Reviews.jsx",
        "./src/components/worker/WorkerProfileFields.jsx",
    ],
    theme: {
        colors: {
            lime: "#cdf161",
            limeMatch: "#f4f1de",
            dark: "#212529",
            gray: "#dad7cd",
            white: "#fff",
            red: "#e63946",
            darkRed: "#d90429",
            lightLime: "#faf8f3"
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
            height: {
                '92%': '92%',
            },
            minHeight: {
                '92%': '92%'
            }
        },

        borderRadius: {
            'full': '9999px',
            'sm':'7px',
            'md': '15px',
            'lg': '25px',
            '3xl': '40px'
        }
    },

    plugins: [
        require('tailwindcss-pseudo-elements')
    ]
}