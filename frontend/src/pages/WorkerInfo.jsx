import Modal from '../components/Modal'
import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useGetWorkerInfoQuery } from '../slices/workers/workersApiSlice'
import { setWorkerInfo } from '../slices/workers/workersSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ErrorMsg from '../components/ErrorMsg'
import Rating from '../components/Rating'
import Reviews from '../components/Reviews'
import Loader from '../components/Loader'


const WorkerInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = location.pathname.split('/')[2]

    const { workerInfo } = useSelector(state => state.worker);
    const { data, error, isLoading } = useGetWorkerInfoQuery(id)
    
    useEffect(() => {
        if (!workerInfo || workerInfo._id !== id) {
            dispatch(setWorkerInfo({...data}))
        };
    
    }, [dispatch, workerInfo, id, data])

    const reviews = [{author: 'Mihai', text:'A lasat luna si bec', rating: 5}, 
    {author: 'Nelu', text:'Foarte bine lucrat', rating: 4}]

    return (
        <div className='min-h-screen h-screen max-h-full flex overflow-auto'>
            <Modal extraClass={'relative px-6 pb-20'}>
                <i onClick={() => navigate(-1)} className="fa-solid
                    bg-lime rounded-full py-2 px-3 fa-chevron-left absolute left-8 "></i>
                    {isLoading ? < Loader /> : error ? <ErrorMsg message={error.data.message || error.error} />
                     : workerInfo && (
                        <>
                            
                            <h1 className='font-bold text-2xl'>{workerInfo.user.name}</h1> 
                            <div className='absolute top-9 right-6'>
                                <Rating value={4.5} color={"#ffea00"} />
                            </div>
                            
                            <div className='mt-6 w-full px-10'>
                                <img src={`../src/assets/profiles/${workerInfo.photo}`} alt={workerInfo.photo} 
                                className='rounded-full h-44 w-full shadow object-cover'/>
                            </div>

                            <div className='w-full mt-4 border-b border-gray pb-4'>
                                <p className='text-lg font-bold opacity-70'>Descriere:</p>
                                <p className='text-sm font-semibold'>{workerInfo.description}</p>
                            </div>

                            <div className='w-full mt-2 border-b border-gray pb-4'>
                                <div className='flex flex-wrap'>
                                    <h2 className='text-lg font-bold opacity-70'>Servicii:</h2>
                                    {workerInfo.services.map((service,idx) => (
                                        <p key={idx} className={`font-semibold mx-2 px-2 py-1 rounded-full
                                         max-w-fit ${idx % 2 === 0 ? 'bg-lime' : 'bg-lightLime'}
                                         text-sm`}
                                        >
                                            {service.service[0].toUpperCase() + service.service.slice(1)}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            
                            <div className='w-full mt-2 mb-6'>
                                <h2 className='text-lg font-bold opacity-70 mb-2'>Review-uri:</h2>
                                <Reviews reviews={reviews}/>
                            </div>

                            <div className='w-full mt-2'>
                                <small className='opacity-60'>*Optional</small>
                                <textarea className='w-full border-b border-gray p-2 shadow-sm rounded-md 
                                bg-lightLime focus:outline-none'
                                placeholder='Scrie un mesaj cu detalii'/>
                             </div>
                            <button className='bg-lime py-2 px-12 rounded-full
                             font-bold shadow-lg mt-4'>Propune</button>   
                        </>
                    )}
            </Modal>
        </div>
    )
}

export default WorkerInfo
