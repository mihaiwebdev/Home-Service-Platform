import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useGetServicesQuery } from '../../slices/services/servicesApiSlice';
import { setServices } from '../../slices/services/servicesSlice';
import { toast } from 'react-toastify'
import Modal from '../../components/shared/Modal'
import Loader from '../../components/shared/Loader'
import DeleteAcc from '../../components/shared/DeleteAcc'
import ChangePw from '../../components/shared/ChangePw'


const ProfilePage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [city, setCity] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    
    const { userInfo } = useSelector(state => state.auth);
    const { services } = useSelector(state => state.service);

    const { data } = useGetServicesQuery();
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setAddress(userInfo.address || '');
            setAddressDetail(userInfo.addressDetail || '');
            setCity(userInfo.city || '');
        }

        if (!services) {
            dispatch(setServices({...data}))
        }

    }, [userInfo, services, data]);


    const updateProfile = async (e) => {
        e.preventDefault();
        
        try {
            const res = await updateUser({name, email, address, addressDetail, city}).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Actualizare cu success');
            navigate(-1);

        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
    <div>
        <Modal extraClass={`pb-14 ${location.hash ? 'hidden' : ''}`}>
            <div className='relative w-full mb-4'>
                <i onClick={() => navigate(-1)} className="fa-solid
                bg-lime rounded-full py-2 px-3 fa-chevron-left absolute left-8 "></i>
                <h1 className='text-center font-bold text-xl'>Profilul Tau</h1>
            </div>

            <form onSubmit={updateProfile} className='w-full max-w-3xl flex 
            flex-col items-center mx-auto relative'>

                <div className="flex flex-col items-start mt-8 w-full short:mt-4">
                    <label htmlFor="name" className="font-semibold ms-2 ">Nume</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none"/>
                        </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-full short:mt-4">
                    <label htmlFor="email" className="font-semibold ms-2 ">Email</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none"/>
                        </div>
                </div>  

                <div className="flex flex-col items-start mt-6 w-full short:mt-4">
                    <label htmlFor="city" className="font-semibold ms-2 ">Oras</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text"  value={city} required
                            onChange={(e) => setCity(e.target.value)} 
                        className="w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Introdu orasul tau'/>
                        </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-full short:mt-4">
                    <label htmlFor="adress" className="font-semibold ms-2 ">Adresa</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Strada si numar'/>
                        </div>
                </div>
            
                <div className="flex flex-col items-start mt-6 w-full short:mt-4">
                    <label htmlFor="addressDetails" className="font-semibold ms-2">Detalii Adresa</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" value={addressDetail} 
                            onChange={(e) => setAddressDetail(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Punct de reper, apartament, scara'/>
                        </div>
                </div>  

                <div className='w-full flex flex-col mt-14 items-center bg-dark p-4 
                    rounded-md relative'>
                    <h2 className='bg-lime px-10 py-1 font-bold mb-2 
                    text-sm absolute left-4 -top-4 rounded-sm'>Securitate</h2>

                    <Link to='/profile#changepw' className='text-white flex justify-between mt-5 mb-2 w-full items-center'>
                        <h2>Modifica parola</h2>
                        <i className="fa-solid fa-chevron-right"></i>
                    </Link>

                    <hr className=' mt-1 text-lime w-full'/>

                    <Link to='/profile#deleteuser' className='text-white mt-3 flex justify-between mb-2 w-full items-center'>
                        <h2>Sterge cont</h2>
                        <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                </div>

                {isLoading ? <Loader /> : (
                    <input type="submit" className="disabled:opacity-75 w-2/3 
                        px-3 py-2.5 tracking-wide text-sm bg-lime text-dark mt-8 sticky
                       border border-gray bottom-10 z-10 font-bold rounded-full shadow-3xl" value={'SALVEAZA'}/> 
                )}

            </form>
                 
        </Modal>
        
        <ChangePw />
        <DeleteAcc />
    </div>
    )
}

export default ProfilePage
