import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { clearCredentials } from "../../slices/authSlice";
import { clearWorkerInfo } from "../../slices/workers/workersSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logout] = useLogoutMutation();

  const logoutUser = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());

      if (userInfo.role === "worker") {
        dispatch(clearWorkerInfo());
      }

      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleNav = (e) => {
    if (
      e.target.className === "hamburger" ||
      e.target.className === "hamburger-line"
    ) {
      setIsOpen(true);
      document.body.classList.add("overflow-hidden");
    }

    if (
      e.target.classList.contains("hamburger-nav") ||
      e.target.tagName === "LI" ||
      e.target.tagName === "I"
    ) {
      setIsOpen(false);
      document.body.classList.remove("overflow-hidden");
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      }}
      className="top-0 z-30 left-0 w-full absolute font-raleway"
    >
      <div className="pt-2 z-10 ps-4 font-bold absolute text-white">
        Logo <i className="fa-solid fa-broom text-2xl"></i>
      </div>

      <div
        onClick={toggleNav}
        className={location.pathname === "/worker/profile/edit" ? "hidden" : ""}
      >
        <div className="hamburger px-1.5">
          <div className="hamburger-line"></div>
        </div>

        <div
          className={`hamburger-nav z-50  flex flex-col
                items-end absolute top-0 right-0 ${isOpen ? "show" : ""}`}
        >
          <div className="nav-actions bg-white flex flex-col justify-between">
            <div className="h-auto ">
              <div className="bg-white shadow text-dark p-5 rounded-tl-md">
                <i className="cursor-pointer fa-solid fa-x absolute right-5 top-3 text-red text-xl p-2"></i>
                <h1 className="font-semibold text-xl">
                  Salut {userInfo && userInfo.name}
                </h1>
              </div>

              <ul className=" mt-6 rounded-t-md pt-6 px-2 ">
                <Link
                  to={
                    userInfo && userInfo.role === "worker"
                      ? "/worker"
                      : "/services"
                  }
                  className="font-semibold"
                >
                  <li className="text-md shadow  font-bold py-1.5 mb-6 bg-primary border text-white border-primary rounded-md text-center flex items-center ps-8">
                    <i className="text-white mr-4 text-xl fa-solid fa-house text-base"></i>{" "}
                    Acasă
                  </li>
                </Link>
              </ul>

              {!userInfo ? (
                <ul className=" rouded-b-md px-2">
                  <Link to="/login" className="font-semibold">
                    <li className="text-md shadow font-bold py-1.5 mb-6 bg-primary text-white  border border-primary  rounded-md text-center flex items-center ps-8">
                      <i className="text-white mr-4 text-xl fa-solid fa-arrow-right-to-bracket text-base"></i>{" "}
                      Logare
                    </li>
                  </Link>

                  <Link to="/register" className="font-semibold">
                    <li className="text-md shadow font-bold py-1.5 mb-6 bg-primary text-white border border-primary rounded-md text-center flex items-center ps-8">
                      <i className="text-white mr-4 text-xl fa-solid fa-user-plus text-base"></i>{" "}
                      Înregistrare
                    </li>
                  </Link>
                </ul>
              ) : (
                <ul className="flex  flex-col  px-2">
                  <Link
                    to={
                      userInfo.role === "worker"
                        ? "/worker/profile"
                        : "/profile"
                    }
                    className="font-semibold"
                  >
                    <li className="text-md shadow font-bold py-1.5 mb-6 bg-primary text-white rounded-md bordprimary order-dark text-center flex items-center ps-8">
                      <i className="text-white mr-4 text-xl fa-regular fa-user text-base"></i>{" "}
                      Profil
                    </li>
                  </Link>

                  {userInfo.role === "worker" && (
                    <Link to="/worker/program" className="font-semibold">
                      <li className="text-md shadow font-bold py-1.5 mb-4 bg-primary text-white  border border-primary  rounded-md flex items-center ps-8">
                        <i className="text-white mr-4 text-xl fa-regular fa-calendar-days text-base"></i>{" "}
                        Calendar
                      </li>
                    </Link>
                  )}

                  <Link to="/orders" className="font-semibold">
                    <li className="text-md shadow font-bold py-1.5 mb-4 bg-primary text-white  border border-primary  rounded-md text-center flex items-center ps-7">
                      <i
                        className={`text-white mr-4 text-xl fa-solid
                                             ${
                                               userInfo.role === "worker"
                                                 ? "fa-file-invoice-dollar "
                                                 : "fa-cart-shopping"
                                             } text-base`}
                      ></i>
                      Comenzi
                    </li>
                  </Link>

                  <li
                    onClick={logoutUser}
                    className="font-semibold text-dark me-2 mt-8 ms-auto"
                  >
                    <i className=" text-dark mb-2 pe-2 fa-solid fa-arrow-right-from-bracket text-base"></i>{" "}
                    Ieși din cont
                  </li>
                </ul>
              )}
            </div>

            <div className="pt-1 p-8 bg-white text-dark shadow flex flex-col pt-2">
              <Link to="/" className="opacity-90">
                Termeni
              </Link>

              <Link to="/" className="opacity-90">
                Confidențialitate
              </Link>

              <Link to="/" className="opacity-90">
                Ajutor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
