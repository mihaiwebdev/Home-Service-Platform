import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetContractsQuery } from '../../slices/contracts/contractsApiSlice'
import { setContracts } from '../../slices/contracts/contractsSlice'
import Loader from '../../components/shared/Loader'
import ErrorMsg from '../../components/shared/ErrorMsg'

const OrdersPage = () => {

    const dispatch = useDispatch();
    
    const { availableContracts } = useSelector(state => state.contracts);
    const {data, isLoading, error} = useGetContractsQuery();

    useEffect(() => {
        
        dispatch(setContracts({...data}));

    }, [dispatch, data]);

    console.log(availableContracts)

    return (
        <div className='mt-24 px-4'>
            {isLoading ? <Loader /> : error && <ErrorMsg message={error?.data?.message || error.error} /> }

            {availableContracts && availableContracts.map(contract => (
                <div key={contract._id} className='mb-6 pb-4'>
                    <div className='flex items-center border-b border-gray flex-wrap'>
                        <p className='font-bold text-xl mr-4'>
                            {contract.service && 
                            contract.service[0].toUpperCase() + contract.service.slice(1)}                        
                        </p>
                        <p className='font-semibold text-lg mr-4'>{new Date(contract.date).toLocaleDateString()}</p>
                        <p className='font-semibold text-lg'>Ora {contract.hour}:00</p>
                    </div>
                    <p className='font-semibold text-lg'> Pret: {contract.price} RON / ora</p>
                    <p><span className='font-semibold'>Adresa:</span> {contract.address}</p>
                    <p><span className='font-semibold'>Detalii adresa: </span> {contract.addressDetail}</p>
                    
                    <p className='mt-2 '><span className='text-md font-semibold'>Angajat: </span>
                     <span className='text-xl'>Mihai</span></p>
                     <p>Numar telefon angajat: 0759467923</p>
                     <p>Vezi profilul angajatului</p>
                    
                </div>
             ))}        
        </div>
    )
}

export default OrdersPage
