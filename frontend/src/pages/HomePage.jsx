import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cleaning from "../assets/cleaning4.jpg";
import Modal from "../components/shared/Modal";
import { motion } from "framer-motion";

const Welcomepage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="mx-4">
      <Modal>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className=" text-center text-dark
                font-bold  text-2xl short:text-xl"
        >
          Eliberează-te de sarcinile casnice
        </motion.h1>
        <div className="h-62 ">
          <img
            className="h-full object-contain"
            src={cleaning}
            alt="woman-cleaning"
          />
        </div>
        <div className="">
          <h1 className="text-center text-xl font-bold font-raleway short2:text-base">
            Servicii de curățenie și întreținere la doar un clic distanță
          </h1>
          <h1 className="text-darkGray text-center text-sm mt-2 hidden font-sourcesanspro font-semibold short2:text-lg">
            O casă curată și ordonată, un stil de viață mai bun
          </h1>
          <div className="flex justify-center mt-8 short:mt-2 short2:mt-4 mb-12">
            <Link
              to={userInfo ? "/services" : "register"}
              className="bg-dark py-1 w-44 pl-3 pr-1 rounded-full 
                        flex items-center justify-between"
            >
              <span className="ms-2 text-white font-sourcesanspro ">
                Gaseste ajutor
              </span>
              <div className="inline-block bg-white rounded-full  py-1.5 px-2.5 short:py-0.5 short:px-1.5">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Welcomepage;
