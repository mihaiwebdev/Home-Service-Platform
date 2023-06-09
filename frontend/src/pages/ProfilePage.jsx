import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import UpdatePwModal from '../components/UpdatePwModal'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'


const ProfilePage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { userInfo } = useSelector(state => state.auth);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);

        if (userInfo.address)
            setAddress(userInfo.address);

        if (userInfo.addressDetail)
            setAddressDetail(userInfo.addressDetail);

    }, [userInfo])

    const updateProfile = async (e) => {
        e.preventDefault();
        
        try {
            const res = await updateUser({name, email, address, addressDetail}).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Actualizare cu success');
            navigate(-1);

        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <div className='pt-12 min-h-screen h-full bg-lightLime'>
            <div className="bg-white min-h-screen h-full pt-8 shadow-2xl rounded-t-3xl 
             w-full flex flex-col items-center mt-6 h-3/4 short:mt-4 short2:pb-20 relative">

                <div className='relative w-full mb-4'>
                    <i onClick={() => navigate(-1)} className="fa-solid
                    bg-lime rounded-full py-2 px-3 fa-chevron-left absolute left-8 "></i>
                    <h1 className='text-center font-bold text-xl'>Profilul Tau</h1>
                </div>

                <form onSubmit={updateProfile} className='w-full max-w-3xl flex flex-col 
                items-center mx-auto relative'>
                    <div className="flex flex-col items-start mt-8 w-5/6 short:mt-4">
                        <label htmlFor="name" className="font-semibold ms-2 ">Nume</label>
                        <div className='w-full relative'>
                            <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                            className="bg-white  w-full opacity-80 border-b 
                            border-gray text-sm pb-1 pl-2 focus:outline-none"/>
                         </div>
                    </div>

                    <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                        <label htmlFor="email" className="font-semibold ms-2 ">Email</label>
                        <div className='w-full relative'>
                            <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                            className="bg-white w-full opacity-80 border-b 
                            border-gray text-sm pb-1 pl-2 focus:outline-none"/>
                         </div>
                    </div>

                    <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                        <label htmlFor="adress" className="font-semibold ms-2 ">Adresa</label>
                        <div className='w-full relative'>
                            <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                            <input type="text" value={address} 
                             onChange={(e) => setAddress(e.target.value)} 
                            className="bg-white w-full opacity-80 border-b 
                            border-gray text-sm pb-1 pl-2 focus:outline-none" placeholder='Strada si numar'/>
                         </div>
                    </div>

                    <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                        <label htmlFor="addressDetails" className="font-semibold ms-2">Detalii Adresa</label>
                        <div className='w-full relative'>
                            <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                            <input type="text" value={addressDetail} 
                             onChange={(e) => setAddressDetail(e.target.value)} 
                            className="bg-white w-full opacity-80 border-b 
                            border-gray text-sm pb-1 pl-2 focus:outline-none" placeholder='Punct de reper, apartament, scara'/>
                         </div>
                    </div>                    

                    <div className='w-5/6 flex flex-col mt-14 items-center bg-dark p-4 
                     rounded-md relative'>
                        <h2 className='bg-lime px-10 py-1 font-bold mb-2 
                        text-sm absolute left-4 -top-4 rounded-sm'>Securitate</h2>

                        <Link to='/profile#changepw' className='text-white flex justify-between mt-5 mb-2 w-full items-center'>
                            <h2>Modifica parola</h2>
                            <i className="fa-solid fa-chevron-right"></i>
                        </Link>

                        <hr  className=' mt-1 text-lime w-full'/>

                        <div className='text-white mt-3 flex justify-between mb-2 w-full items-center'>
                            <h2>Sterge cont</h2>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>

                    {isLoading ? <Loader /> : (
                        <input type="submit" className="disabled:opacity-75 w-2/3 
                            px-3 py-2.5 tracking-wide text-sm bg-lime text-dark mt-8
                            bottom-0 z-10 font-bold rounded-full shadow-xl" value={'SALVEAZA'}/> 
                    )}

                </form>

                <UpdatePwModal />
            </div>
        </div>
    )
}

export default ProfilePage
