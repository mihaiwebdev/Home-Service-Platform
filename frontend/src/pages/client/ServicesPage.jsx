import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGetServicesQuery } from '../../slices/services/servicesApiSlice';
import { setServices } from '../../slices/services/servicesSlice';
import { motion } from 'framer-motion';
import ErrorMsg from '../../components/shared/ErrorMsg'
import Loader from '../../components/shared/Loader'
import cleanHome from '../../assets/clean-home.jpg'

const SearchPage = () => {

    const { services } = useSelector(state => state.service);

    const {data, error, isLoading} = useGetServicesQuery();
    
    const dispatch = useDispatch();

    useEffect(() => {

        if (!services) {
            dispatch(setServices({...data}));
        }
        
    }, [services, data, dispatch])
    
    return (
        <div className="pt-16 min-h-screen h-full">

            <motion.img initial={{opacity: 0}} animate={{opacity: 1}} 
             transition={{duration: 1}}
             src={cleanHome} alt="clean-house" className='short:h-auto mx-auto object-cover 
             h-72 md:max-w-3xl md:rounded-t-md md:h-auto rounded-t-sm' />

            <motion.div  initial={{y: 500, opacity:0}}
             animate={{y: -24, opacity: 1,}}
             transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8
             }}
             className='mx-auto p-5 pb-10 max-w-3xl mt-auto bg-lightLime rounded-t-lg 
             -translate-y-6 lg:-translate-y-20'>

                <h1 className='text-center font-bold text-lg '>Cu ce te putem ajuta?</h1>

                {isLoading ? <Loader /> : error ? <ErrorMsg message={error?.data?.message || error?.error} /> 
                 : services && services.map(service => (

                    <Link key={service._id} to={`/schedule#${service.slug}`} className='my-4 min-h-20 pb-2 cursor-pointer 
                     border-b border-gray bg-lightLime flex items-center '>
                        <img src={`src/assets/${service.photo}`} alt="house cleaning" className='short:py-4 h-20 p-4 
                            bg-lightLime w-auto rounded-md ' />
                        <div className='pr-4 p-2 short2:pr-0'>
                            <h2 className='font-semibold'>{service.name} </h2>
                            <p className='opacity-70 text-sm short2:text-xs'>{service.text}</p>
                        </div>

                        <i className="short2:hidden fa-solid my-auto ml-auto mr-2 fa-chevron-right 
                            bg-lime rounded-full py-1 px-2.5 text-sm"></i>
                    </Link>

                ))}
               
            </motion.div>
        </div>
    )
}

export default SearchPage
