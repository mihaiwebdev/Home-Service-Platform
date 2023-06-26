import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetContractsQuery } from '../slices/contracts/contractsApiSlice'
import { setContracts } from '../slices/contracts/contractsSlice'
import Loader from '../components/shared/Loader'
import ErrorMsg from '../components/shared/ErrorMsg'

const OrdersPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { userInfo } = useSelector(state => state.auth);
    const { availableContracts } = useSelector(state => state.contracts);
    const {data, isLoading, error, refetch} = useGetContractsQuery();  


    useEffect(() => {
        
       dispatch(setContracts({...data}));
       refetch()

    }, [dispatch, refetch, data]);
   
    return (
        <div className='pt-16 px-4 h-100dvh'>
             <i onClick={() => userInfo.role === 'worker' ? navigate(-1) : navigate('/services')} className="fa-solid
                bg-lime rounded-full mt-10 py-2 px-3 fa-chevron-left absolute left-6"></i>
            {isLoading ? <Loader /> : error && <ErrorMsg message={error?.data?.message || error.error} /> }
                <h1 className='mt-10 text-center font-bold text-2xl mb-8'>Comenzile tale</h1>

            {availableContracts && availableContracts.length < 1 && (
                <div className='flex flex-col w-full'>
                    <p className='font-semibold mx-auto mb-4'>Momentan nu ai nicio comanda</p>
                    {userInfo.role === 'client' ? (
                        <Link to='/services' className='rounded-sm mx-auto font-semibold bg-dark text-white p-2'>Fa o comanda</Link>
                    ) : (
                        <Link to='/worker/program' className='rounded-sm mx-auto font-semibold bg-dark text-white p-2'>Selecteaza-ti programul</Link>                        
                    )}

                </div>
            )}

            {availableContracts && availableContracts.map(contract => (
                <div key={contract._id} className='mb-6 pb-4 shadow p-1 rounded-sm'>
                    <div className='flex items-center border-b border-gray flex-wrap'>
                        <p className='font-bold text-xl mr-4 text-yellow'>
                            {contract.service && 
                            contract.service[0].toUpperCase() + contract.service.slice(1)}                        
                        </p>
                        <p className='font-semibold text-lg mr-4'>{new Date(contract.date).toLocaleDateString()}</p>
                        <p className='font-semibold text-lg'>Ora {contract.hour}:00</p>
                        <i className='fa-solid fa-edit ml-auto text-yellow'></i>
                    </div>
                    <p className='font-semibold text-lg'> Pret: {contract.price} RON / ora</p>
                    <p><span className='font-semibold'>Adresa:</span> {contract.address}</p>
                    <p><span className='font-semibold'>Detalii adresa: </span> {contract.addressDetail}</p>
                    
                    {userInfo.role === 'client' ? (
                        <>
                            <p className='mb-4'> <span className='font-semibold'>Numar telefon angajat: </span> <span className='text-lg'>{contract.workerPhone}</span></p>
                            <Link to={`/workers/${contract.worker}`} className='bg-lime 
                                p-2 rounded-sm font-semibold px-4 mt-2'>Vezi profilul angajatului</Link>
                        </>

                    ) : (
                        <>
                            <p> <span className='font-semibold'>Numar telefon client: </span> <span className='text-lg'>????</span></p>                        
                            {contract.message && (
                                <p className='mb-4'> <span className='font-semibold'>Mesaj: </span> <span className='text-sm'>{contract.message}</span></p>                        
                            )}
                        </>

                    )}
                     
                    
                </div>
             ))}        
        </div>
    )
}

export default OrdersPage
