import Modal from '../../components/shared/Modal'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useGetWorkerInfoQuery } from '../../slices/workers/workersApiSlice'
import { setWorkerInfo } from '../../slices/workers/workersSlice'
import ErrorMsg from '../../components/shared/ErrorMsg'
import Rating from '../../components/worker/Rating'
import Reviews from '../../components/worker/Reviews'
import Loader from '../../components/shared/Loader'


const WorkerProfilePage = () => {

    const dispatch = useDispatch();

    const { workerInfo } = useSelector(state => state.worker);
    const { userInfo } = useSelector(state => state.auth);
    const { data, error, isLoading } = useGetWorkerInfoQuery(userInfo._id)

    useEffect(() => {
        
        if (data && !workerInfo) {
            dispatch(setWorkerInfo({...data}))
        }
        
    }, [dispatch, data, workerInfo])

    const reviews = [{author: 'Mihai', text:'A facut luna si bec', rating: 5}, 
    {author: 'Nelu', text:'Foarte bine lucrat', rating: 4}]

    return (
        <Modal extraClass={'relative pb-20'}>
            
                {isLoading ? < Loader /> : error ? <ErrorMsg message={error?.data?.message || error.error} />
                    : workerInfo && (
                    <>  
                        <h1 className='font-bold text-2xl text-start w-full'>{userInfo.name}</h1> 
                        
                        <div className='absolute top-9 right-6'>
                            <Rating value={4.5} color={"#ffea00"} />
                        </div>
                        <div className='mt-4 mb-2 border border-lightLime rounded-md h-52
                            shadow w-full flex items-center short2:items-start'>
                            <img src={`../src/assets/profiles/${workerInfo.photo}`} alt={workerInfo.photo} 
                            className='rounded-md h-full w-2/4 shadow-lg object-cover 
                                object-center short2:h-40'/>

                            <div className='px-4 h-full flex flex-col items-center justify-center
                                rounded-r-lg '>
                                <div className='w-full border-b border-gray pb-1'>
                                    <p className='font-bold opacity-70'>Email:</p>
                                    <p className='text-sm font-semibold'>{userInfo.email}</p>
                                </div>

                                <div className='w-full mt-2 border-b border-gray pb-1 flex items-center flex-wrap'>
                                    <p className='font-bold opacity-70'>Telefon:</p>
                                    <p className='text-sm ms-2 font-semibold'>{workerInfo.phone}</p>
                                </div>

                                <div className='w-full mt-2 pb-1'>
                                    <p className='font-bold opacity-70'>Adresa:</p>
                                    <p className='text-sm font-semibold'>
                                        {workerInfo.location.street + ', ' + workerInfo.location.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link to='/worker/profile/edit' className='mt-2 border-b border-lime font-semibold text-dark'>
                            <i className='fa-solid fa-edit'></i> Editeaza Profilul
                        </Link>

                        <div className='w-full mt-4 border-b border-gray pb-4'>
                            <p className='text-lg font-bold opacity-70'>Descriere:</p>
                            <p className='text-sm font-semibold'>{workerInfo.description}</p>
                        </div>

                        <div className='w-full mt-2 border-b border-gray pb-4'>
                            <div className='flex'>
                                <h2 className='text-lg font-bold opacity-70'>Servicii:</h2>
                                <div className='flex flex-wrap'>
                                    {workerInfo.services.map((service,idx) => (
                                        <div key={idx} className='mb-1 bg-lightLime flex 
                                            rounded-sm border border-gray mx-1 px-1 flex-col 
                                            items-center justify-center'>
                                            <p className={`font-semibold pt-1 px-1 
                                                text-sm border-b border-gray`}
                                            >
                                                {service.service[0].toUpperCase() + service.service.slice(1)}
                                            </p>
                                            <span className='w-full font-semibold opacity-90 text-xs block text-center px-1 text-sm '>{service.price} RON / h</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className='w-full mt-2 mb-6'>
                            <h2 className='text-lg font-bold opacity-70 mb-2'>Review-uri: ({reviews.length})</h2>
                            <Reviews reviews={reviews}/>
                        </div>
                    </>
                )}
        </Modal>
    )
}

export default WorkerProfilePage
