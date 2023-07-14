module.exports = {
  content: [
    "./index.html",
    "./src/App.jsx",
    "./src/pages/Homepage.jsx",
    "./src/pages/LoginPage.jsx",
    "./src/pages/RegisterPage.jsx",
    "./src/pages/client/ServicesPage.jsx",
    "./src/pages/client/SelectLocation.jsx",
    "./src/pages/client/SelectDate.jsx",
    "./src/pages/client/ProfilePage.jsx",
    "./src/pages/client/WorkersResult.jsx",
    "./src/pages/client/WorkerInfo.jsx",
    "./src/pages/ordersPage.jsx",
    "./src/pages/worker/WorkerEditPage.jsx",
    "./src/pages/worker/WorkerProfilePage.jsx",
    "./src/pages/worker/ProgramPage.jsx",
    "./src/pages/worker/WorkerHomePage.jsx",
    "./src/components/shared/Navbar.jsx",
    "./src/components/shared/Navigation.jsx",
    "./src/components/shared/UpdatePwModal.jsx",
    "./src/components/shared/Modal.jsx",
    "./src/components/shared/DeleteAcc.jsx",
    "./src/components/shared/ErrorMsg.jsx",
    "./src/components/shared/Pattern.jsx",
    "./src/components/shared/Header.jsx",
    "./src/components/worker/Reviews.jsx",
  ],
  theme: {
    colors: {
      primary: "#483EFF",
      secondary: "#6259FF",
      third: "#BEE2FD",
      orange: "#FFAF7E",
      pink: "#F9818E",
      transparent: "#00000085",
      dark: "#022959",
      gray: "#dad7cd",
      darkGray: "#9699AA",
      white: "#fff",
      red: "#e63946",
      darkRed: "#d90429",
      grayWhite: "#D6D9E6",
      lightGray: "#F8F9FF",
      bodyColor: "#EFF5FF",
      black: "#333",
    },

    fontFamily: {
      raleway: "Raleway, sans-serif",
      sourcesanspro: "Source Sans Pro, sans-serif",
    },

    extend: {
      screens: {
        short: { raw: "(max-height: 600px)" },
        short2: { raw: "(max-height: 750px)" },
        "3xl": "1920px",
      },
      boxShadow: {
        "3xl":
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
        "cm-md": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        top: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;",
      },

      minHeight: {
        "92%": "92dvh",
        "93%": "93dvh",
        "100%": "100%",
        "100dvh": "100dvh",
      },
      maxHeight: {
        "100dvh": "100dvh",
      },
      height: {
        "100dvh": "100dvh",
      },
    },

    borderRadius: {
      xs: "4px",
      full: "9999px",
      sm: "7px",
      md: "15px",
      lg: "25px",
      "3xl": "40px",
    },
  },

  plugins: [require("tailwindcss-pseudo-elements")],
};
