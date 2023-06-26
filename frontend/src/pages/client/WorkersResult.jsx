import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useGetAvailableWorkersQuery } from '../../slices/workers/workersApiSlice'
import { setAvailableWorkers } from '../../slices/workers/workersSlice'
import { motion } from 'framer-motion'
import ErrorMsg from '../../components/shared/ErrorMsg'
import Rating from '../../components/worker/Rating'
import Loader from '../../components/shared/Loader'

const WorkersResult = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const service = searchParams.get('service')
    const address = searchParams.get('address')
    const date = searchParams.get('date')
    const hour = searchParams.get('hour')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { availableWorkers } = useSelector(state => state.worker);

    const {data, error, isLoading} = useGetAvailableWorkersQuery({service, address, date, hour});

    useEffect(() => {
        if (data) {
            dispatch(setAvailableWorkers({...data}))
        }
        
    }, [data, dispatch]);

    return (
        <motion.div initial={{x: 200}} animate={{x: 0}} 
         transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8
         }}
         className="py-20 min-h-100dvh h-max px-2"
        >    
            <div className='mb-2'>
                <i onClick={() => navigate(-1)} className="fa-solid short2:mb-6 ms-4
                    bg-lime rounded-full py-2 px-3 fa-chevron-left left-8 "></i>
            </div>

            <div className='px-2 mb-8'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold tracking-wide'>{service[0].toUpperCase() + service.slice(1)}</h1>
                    <p className='ml-4 font-semibold opacity-80 text-end'>{address}</p>
                </div>
                <p className='opacity-80 font-semibold text-sm'>{date} {hour}:00</p>
            </div>

            <h1 className='text-center mb-4 font-bold text-xl'>Persoane disponibile: <span className='opacity-70'>{data && data.count}</span></h1>

            {isLoading ? (<div className='my-auto'><Loader /></div>) : error ? <ErrorMsg message={error?.data?.message || error?.error} /> 
             : availableWorkers && availableWorkers.map((worker,idx) => (

                <Link to={`${worker._id}`}
                    key={worker._id} className={`${idx === 0 && 'border-t'} flex p-4 py-6 border-b border-gray w-full relative`}>
                    <div className='w-24'>
                        <motion.img initial={{opacity: 0}} animate={{opacity:1}}
                            transition={{duration: 1.5}}
                            className='w-full h-28 object-cover rounded-md shadow-md'
                        src={worker.photo} alt="imagine" />
                    </div>
                    
                    <div className='me-4 ms-2 w-2/3'>
                        <div className='flex items-center'>
                            <h2 className='me-2 font-bold text-xl tracking-wide'>{worker.user.name}</h2>
                            <div className='relative'>
                                <i className="fa-solid fa-certificate text-lime fa-lg"></i>
                                <i className="fa-solid fa-check absolute text-xs left-1 text-bold top-1 text-white"></i>
                            </div>
                        </div>
                        
                        <p className='text-sm opacity-80'>{worker.description.slice(0,100)}...</p>
                    </div>

                    <div className='absolute top-3 right-0'>
                        <Rating value={4.5} color={"#ffea00"} />
                    </div>

                    <div className='ml-auto self-end'>
                        <p className='font-semibold text-limetext-end text-3xl'>{worker.services.map(item => item.service === service && item.price)}</p>
                        <p className='text-end text-sm'>RON</p>
                        <p className='text-end text-sm'>ora</p>
                    </div>
                </Link>
            ))}

        </motion.div>
    )
}

export default WorkersResult
