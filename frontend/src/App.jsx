import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Header from "./components/shared/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from "./firebase";

const App = () => {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    getMessaging(app);
  }, [firebaseConfig]);

  return (
    <div className="overflow-hidden min-h-100dvh relative 3xl:container 2xl:mx-auto">
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />

      <Navbar />
      <Header />

      <Outlet />
    </div>
  );
};

export default App;
