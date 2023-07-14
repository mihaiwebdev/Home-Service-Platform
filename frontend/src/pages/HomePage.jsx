import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import busyWomanImg from "../assets/busy-woman.png";
import cleanHouseImg from "../assets/house-cleaning.png";
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
          Eliberează-te de sarcinile{" "}
          <img
            className="inline-block short:hidden"
            width={40}
            height={40}
            src={cleanHouseImg}
            alt="clean-house"
          />{" "}
          casnice
        </motion.h1>
        <img
          className="mt-8 mx-auto short2:mt-2 short2:w-4/5 sm:w-2/3
                    md:object-contain md:w-4/5 md:h-3/5 lg:w-1/2 lg:h-4/6 lg:mt-12"
          src={busyWomanImg}
          alt="woman-cleaning"
        />
        <div className="">
          <h1 className="text-center mt-4 text-xl font-bold font-raleway short2:text-base">
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
