import { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import Calendar from 'react-calendar'

const SchedulePage = () => {
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(1);
    const hoursArr = Array.from({length: 24}, (x, index) => index + 1);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo.address)
            setAddress(userInfo.address)

        if (userInfo.addressDetail)
            setAddressDetail(userInfo.addressDetail)

    }, [userInfo])

    
    return (
        <motion.div initial={{x: 200}} animate={{x: 0}} 
        transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }}
         className="py-20 min-h-screen px-2 h-full bg-lightLime">
            <div className='flex short2:flex-col short2:text-start w-full text-center'>
                <div>
                    <i onClick={() => navigate(-1)} className="fa-solid short2:mb-6 ms-4
                        bg-lime rounded-full py-2 px-3 fa-chevron-left left-8 "></i>
                </div>
                <h1 className="ms-6 border-lime text-lg font-bold">Adauga locatia pentru curatenie</h1>
            </div>

            <form className='w-full max-w-3xl flex flex-col 
            items-center mx-auto relative'>
    
                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                    <label htmlFor="adress" className="font-semibold ms-2 ">Adresa</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                        className="bg-lightLime w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Strada si numar'/>
                        </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                    <label htmlFor="addressDetails" className="font-semibold ms-2">Detalii Adresa</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" value={addressDetail} 
                            onChange={(e) => setAddressDetail(e.target.value)} 
                        className="bg-lightLime w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Punct de reper, apartament, scara'/>
                        </div>
                </div>                    
            </form>

            <div>
                <h1 className='font-bold rounded-sm mt-10 mb-4
                ms-2 '>Selecteaza data</h1>
                <Calendar value={date} minDate={new Date()} showNeighboringMonth={false} view="month"
                onChange={setDate} prev2Label={null} next2Label={null} 
                />
            </div>
            
            <div className='mt-10 relative'>
                <label htmlFor="hour" className='font-bold rounded-sm 
                 mb-4 ms-2 me-2'>
                    Selecteaza ora:
                </label>

                <select name="hour" id="hour" className='py-1.5 px-6
                 rounded-sm shadow-md font-semibold bg-lime' size={1}
                 onChange={(e) => setHour(e.target.value)}
                 >
                    
                    {hoursArr.map(hour => (
                        <option key={hour} className='font-semibold bg-lightLime'
                         value={hour}>{hour}:00</option>
                    ))}
                </select>
            </div>
            
            <div className='flex justify-center mt-10 '>
                <Link to='/' className='bg-dark py-1 w-44 pl-3 pr-1 rounded-full short:py-0.5 short:pl-2 
                flex items-center justify-between'>
                    <span className='ms-2 text-white font-sourcesanspro '>Gaseste ajutor</span>
                    <div className='inline-block bg-white rounded-full py-1.5 px-2.5 '>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </Link>
            </div>
        </motion.div>
    )
}

export default SchedulePage
