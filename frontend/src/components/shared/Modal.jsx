import { motion } from 'framer-motion'

const Modal = ({children, extraClass}) => {

    return (
        
        <motion.div initial={{y: 300, opacity:0}}
            animate={{y: 0, opacity: 1,}}
            transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }}
            className={`bg-white min-h-92% h-max max-h-max z-10 mt-16 pt-8 shadow-2xl 
            rounded-t-3xl w-full flex flex-col items-center px-8 short2:pb-20
            short2:mt-20 ${extraClass}`}
            >
                {children}
        </motion.div>        
    )
}

export default Modal
