import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../../slices/usersApiSlice'
import { setJobInfo } from '../../slices/contracts/contractsSlice';
import { setCredentials } from '../../slices/authSlice'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Loader from '../../components/shared/Loader'
import Calendar from 'react-calendar'

const SchedulePage = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [saveAddress, setSaveAddress] = useState(false);
    const [date, setDate] = useState(new Date().toDateString());
    const [hour, setHour] = useState(0);
    const hoursArr = Array.from({length: 24}, (x, index) => index + 1);
    
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ updateUser, { isLoading }] = useUpdateUserMutation()

    const { userInfo } = useSelector(state => state.auth);
    const service = location.hash.split('#')[1];

    useEffect(() => {
        if (userInfo) {
            setAddress(userInfo.address || '')
            setAddressDetail(userInfo.addressDetail || '')
            setCity(userInfo.city || '')
        };

        if (!service) {
            navigate('/services')
        };
            
    }, [userInfo, service, navigate, setAddress, setAddressDetail])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const fullAddress = `${address}, ${city}, Romania`

        if (address && addressDetail && date && hour && city){
            
            if (saveAddress) {
                try {
                    const res = await updateUser({city, address, addressDetail}).unwrap();
                    dispatch(setCredentials({...res}));

                } catch (err) {
                    toast.error(err?.data?.message || err.error);
                };
            };

            dispatch(setJobInfo({address: fullAddress, addressDetail,
                date, hour, service
            }));

            navigate(`/workers?service=${service}&address=${fullAddress}&date=${date}&hour=${hour}`)
            
        } else {
            toast.error('Te rugam sa adaugi toate informatiile')
        };
    };
    
    return (
        <motion.div initial={{x: 200}} animate={{x: 0}} 
        transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }}
         className="py-20 min-h-screen px-2 h-full">
            <div className='flex short2:flex-col short2:text-start w-full text-center'>
                <div>
                    <i onClick={() => navigate(-1)} className="fa-solid short2:mb-6 ms-4
                        bg-lime rounded-full py-2 px-3 fa-chevron-left left-8 "></i>
                </div>
                <h1 className="ms-6 border-lime text-lg font-bold">Adauga locatia pentru {service}</h1>
            </div>

            <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col 
            items-center mx-auto relative'>
                
                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                    <label htmlFor="city" className="font-semibold ms-2 ">Oras</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text"  value={city} required
                            onChange={(e) => setCity(e.target.value)} 
                        className="bg-lightLime w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Introdu orasul tau'/>
                        </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                    <label htmlFor="address" className="font-semibold ms-2 ">Adresa</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" value={address} required
                            onChange={(e) => setAddress(e.target.value)} 
                        className="bg-lightLime w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Strada si numar'/>
                        </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                    <label htmlFor="addressDetails" className="font-semibold ms-2">Detalii Adresa</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" value={addressDetail} required
                            onChange={(e) => setAddressDetail(e.target.value)} 
                        className="bg-lightLime w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Punct de reper, apartament, scara'/>
                        </div>
                </div>                    

                <div className='flex justify-start w-5/6 mt-4 items-center'>
                    <input onChange={(e) => setSaveAddress(e.target.checked)} type="checkbox" 
                    id='locationCheckbox' className='mr-2 h-5 w-5'/>
                    <label htmlFor="locationCheckbox" className='font-semibold opacity-80'>Salveaza locatia</label>
                </div>

                <div>
                    <h1 className='font-bold rounded-sm mt-6 mb-4
                    ms-2 '>Selecteaza data</h1>
                    <Calendar value={date} minDate={new Date()} showNeighboringMonth={false} view="month"
                    onChange={(value) => setDate(new Date(value).toDateString())} prev2Label={null} next2Label={null}
                    />
                </div>
                
                <div className='mt-10 relative'>
                    <label htmlFor="hour" className='font-bold rounded-sm  
                    mb-4 ms-2 me-2'>
                        Selecteaza ora:
                    </label>

                    <select name="hour" id="hour" required className='py-1.5 px-6
                    rounded-sm shadow-md font-semibold bg-lime focus:outline-none' 
                    onChange={(e) => setHour(parseInt(e.target.value))} 
                    >
                        <option value="">hh/mm</option>
                        {hoursArr.map(hour => (
                            <option key={hour} className='font-semibold bg-lightLime'
                            value={hour}>{hour}:00 {hour < 12 ? 'AM' : 'PM'}</option>
                        ))}
                    </select>
                </div>
                
                {isLoading ? <Loader /> : (
                    <div className='mt-10 relative bg-dark h-11
                    pl-4 pr-1 rounded-full short:py-1 w-44 relative'>
                       <input type='submit' id='submit' name='submit' className='text-start text-white
                        w-full h-full z-' value={'Gaseste ajutor'} />
   
                       <label htmlFor="submit" className='bg-white rounded-full py-1.5 px-2.5 absolute
                        right-1 top-1'>
                           <i className="fa-solid fa-arrow-right"></i>
                       </label>
                   </div>
                )}
        
            </form>
        </motion.div>
    )
}

export default SchedulePage
