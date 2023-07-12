import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import busyWomanImg from "../assets/busy-woman.png";
import cleanHouseImg from "../assets/house-cleaning.png";
import { motion } from "framer-motion";

const Welcomepage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="pt-16 bg-white short:pt-8 h-100dvh relative md:pt-28">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="font-sourcesanspro py-5 text-center text-dark
                font-extrabold px-8 text-4xl short2:text-2xl md:mb-12"
      >
        Eliberează-te de sarcinile{" "}
        <img
          className="inline-block"
          width={40}
          height={40}
          src={cleanHouseImg}
          alt="clean-house"
        />{" "}
        casnice
      </motion.h1>

      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        }}
        className="h-full bg-lime shadow-3xl rounded-t-3xl pt-1 md:flex 
             md:flex-col-reverse md:flex-col md:pb-32 md:justify-around lg:flex-row 
             lg:justify-around lg:flex-row-reverse"
      >
        <img
          className="mt-8 mx-auto short2:mt-2 short2:w-4/5 sm:w-2/3
                    md:object-contain md:w-4/5 md:h-3/5 lg:w-1/2 lg:h-4/6 lg:mt-12"
          src={busyWomanImg}
          alt="woman-cleaning"
        />
        <div className="lg:w-2/4 lg:mt-20 xl:mt-32">
          <p className="text-center mt-4 text-xl font-sourcesanspro font-bold short2:text-base md:text-3xl">
            <span className="block">Servicii de curățenie și întreținere</span>{" "}
            la doar un clic distanță
          </p>
          <p className="hidden lg:block text-center text-xl font-sourcesanspro font-semibold short2:text-base md:text-3xl">
            <span className="block">O casă curată și ordonată,</span> un stil de
            viață mai bun
          </p>
          <div className="flex justify-center mt-8 short:mt-2 short2:mt-4">
            <Link
              to={userInfo ? "/services" : "register"}
              className="bg-dark py-1 w-44 pl-3 pr-1 rounded-full short:py-0.5 short:pl-2 
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
      </motion.div>
    </div>
  );
};

export default Welcomepage;
