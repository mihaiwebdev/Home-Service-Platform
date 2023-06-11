import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useGetAvailableWorkersQuery } from '../slices/workers/workersApiSlice'
import { setAvailableWorkers } from '../slices/workers/workersSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Rating from '../components/Rating'
import Loader from '../components/Loader'



const WorkersResult = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const [loading, setLoading] = useState(false);
    const service = searchParams.get('service')
    const address = searchParams.get('address')
    const date = searchParams.get('date')
    const hour = searchParams.get('hour')

    const dispatch = useDispatch();
    const { availableWorkers } = useSelector(state => state.worker);

    const {data, error, isLoading} = useGetAvailableWorkersQuery({service, address, date, hour});

    useEffect(() => {
        if (data) {
            dispatch(setAvailableWorkers({...data}))
        }
    }, [data, dispatch, setAvailableWorkers])

    return (
        <motion.div initial={{x: 200}} animate={{x: 0}} 
         transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8
         }}
         className="py-20 min-h-screen px-2 h-full"
        >    
            <div className='px-2 mb-8'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold tracking-wide'>{service[0].toUpperCase() + service.slice(1)}</h1>
                    <p className='ml-4 font-semibold opacity-80'>{address}</p>
                </div>
                <p className='opacity-80 font-semibold text-sm'>{date} {hour}:00</p>
            </div>

            <h1 className='text-center mb-4 font-bold text-xl'>Persoane disponibile: <span className='opacity-70'>{data.count}</span></h1>
            {isLoading ? (<div className='my-auto'><Loader /></div>) : availableWorkers
             && availableWorkers.map(worker => (
                <div key={worker._id} className='flex p-4 border-t border-b border-gray w-full relative'>
                    <div className=''>
                        <img className='w-32 object-cover rounded-md shadow-md'
                         src={`src/assets/profiles/${worker.photo}`} alt="imagine" />
                    </div>
                    
                    <div className='ms-3 me-4 w-full'>
                        <div className='flex items-center'>
                            <h2 className='me-2 font-bold text-xl tracking-wide'>{worker.user.name}</h2>
                            <div className='relative'>
                                <i className="fa-solid fa-certificate text-lime fa-lg"></i>
                                <i className="fa-solid fa-check absolute text-xs left-1 text-bold top-1 text-white"></i>
                            </div>
                        </div>
                        
                        <p className='text-sm opacity-80'>{worker.description.slice(0,130)}...</p>
                    </div>

                    <div className='absolute top-3 right-0'>
                        <Rating value={4.5} color={"#ffea00"} />
                    </div>

                    <div className='ml-auto self-end'>
                        <p className='font-semibold text-limetext-end text-3xl'>{worker.services.map(item => item.service === service && item.price)}</p>
                        <p className='text-end text-sm'>RON</p>
                        <p className='text-end text-sm'>ora</p>
                    </div>
                </div>
            ))}
        </motion.div>
    )
}

export default WorkersResult
