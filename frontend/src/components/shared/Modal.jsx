import { motion } from "framer-motion";

const Modal = ({ children, extraClass }) => {
  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: -100 }}
      transition={{
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      }}
      className={`bg-white z-10 relative mx-auto pt-8 shadow-xl
            rounded-md w-full flex flex-col items-center px-5 shot2:px-4
            ${extraClass}`}
    >
      {children}
    </motion.div>
  );
};

export default Modal;
