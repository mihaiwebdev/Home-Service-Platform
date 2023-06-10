import { motion } from 'framer-motion'

const Modal = ({children, extraClass}) => {

    return (
        <div className='pt-12 min-h-screen h-full bg-lightLime'>
            <motion.div initial={{y: 300, opacity:0}}
            animate={{y: 0, opacity: 1,}}
            transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }}
            className={`bg-white min-h-screen h-full pt-8 shadow-2xl rounded-t-3xl 
                w-full flex flex-col items-center mt-6 h-3/4 short:mt-4 short2:pb-20 ${extraClass}`}
            >
                {children}
            </motion.div>        
        </div>        
    )
}

export default Modal
