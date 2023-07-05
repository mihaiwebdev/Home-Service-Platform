import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/shared/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OneSignal from "react-onesignal";

const App = () => {
  return (
    <div className="bg-lightLime overflow-hidden relative 3xl:container 2xl:mx-auto">
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark"
      />

      <Navbar />

      <Outlet />
    </div>
  );
};

export default App;
