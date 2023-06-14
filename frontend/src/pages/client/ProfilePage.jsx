import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useGetServicesQuery } from '../../slices/services/servicesApiSlice';
import { setServices } from '../../slices/services/servicesSlice';
import { toast } from 'react-toastify'
import axios from 'axios'
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

    const [phone, setPhone] = useState();
    const [description, setDescription] = useState(''); 
    const [providedServices, setProvidedServices] = useState([]);
    const [servicesWithPrice, setServicesWithPrice] = useState([]);

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

    const handleSelectServices = (e) => {
    
        const alreadySelected = providedServices.find((service) => service === e.target.value);

        if (alreadySelected) {
            setProvidedServices(state => [...state.filter(service => service !== e.target.value)])
            setServicesWithPrice(state => [...state.filter(item => item.service !== e.target.value)]);

        } else {
            setProvidedServices(state => [...state, e.target.value])
        }
    };

    const handleServicePrice = (e) => {
        setServicesWithPrice(state => [...state.filter(item => item.service !== e.target.id), {
            service: e.target.id,
            price: e.target.value
        }]);
    };

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

    const uploadPhotoHandler = async(e) => {
        const file = e.target.files[0]

        const formData = new FormData();
        formData.append('file', file);

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        try {
            
            const { data } = await axios.put(`/api/v1/workers/${userInfo._id}/upload-photo`,
             formData, config)
            
            data.success && toast.success('Fotografie adaugata!')

        } catch (err) {
            toast.error(err?.data?.message || err.error)
        };
    }

    const updateWorkerProfile = async (e) => {
        e.preventDefault();
    }



    return (
    <div className='min-h-screen h-screen max-h-full flex overflow-auto'>
        <Modal extraClass={`pb-14 ${location.hash ? 'hidden' : ''}`}>
            <div className='relative w-full mb-4'>
                <i onClick={() => navigate(-1)} className="fa-solid
                bg-lime rounded-full py-2 px-3 fa-chevron-left absolute left-8 "></i>
                <h1 className='text-center font-bold text-xl'>Profilul Tau</h1>
            </div>

            <form onSubmit={updateProfile} className='w-full max-w-3xl flex 
            flex-col items-center mx-auto relative'>

                <div className="flex flex-col items-start mt-8 w-5/6 short:mt-4">
                    <label htmlFor="name" className="font-semibold ms-2 ">Nume</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none"/>
                        </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                    <label htmlFor="email" className="font-semibold ms-2 ">Email</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none"/>
                        </div>
                </div>  

                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                    <label htmlFor="city" className="font-semibold ms-2 ">Oras</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text"  value={city} required
                            onChange={(e) => setCity(e.target.value)} 
                        className="w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Introdu orasul tau'/>
                        </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                    <label htmlFor="adress" className="font-semibold ms-2 ">Adresa</label>
                    <div className='w-full relative'>
                        <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                        <input type="text" value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Strada si numar'/>
                        </div>
                </div>
                
                {userInfo.role === 'client' && (
                    <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                        <label htmlFor="addressDetails" className="font-semibold ms-2">Detalii Adresa</label>
                        <div className='w-full relative'>
                            <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                            <input type="text" value={addressDetail} 
                                onChange={(e) => setAddressDetail(e.target.value)} 
                            className="bg-white w-full opacity-80 border-b 
                            border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Punct de reper, apartament, scara'/>
                            </div>
                    </div>  
                )}                  

                {userInfo.role === 'worker' && (
                    <>
                      <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                        <label htmlFor="phoneNumber" className="font-semibold ms-2 ">Numar telefon</label>
                        <div className='w-full relative'>
                            <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                            <input type="number" value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                            className="bg-white w-full opacity-80 border-b 
                            border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='0712345678'/>
                        </div>
                      </div>

                      <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                        <h2 className='font-semibold '
                        >
                            Selecteaza serviciile pe care le oferi
                        </h2>
                        <div className='flex flex-wrap mt-2'>
                            {services && services.map((service) => (
                                <div key={service._id} className='flex mr-1 bg-lime rounded-sm px-2 py-1 mb-2
                                 font-semibold text-sm shadow'>  
                                    <input type='checkbox' id={`service-${service._id}`}
                                     className={`font-semibold mr-1 
                                    py-1 rounded-full max-w-fit bg-lime text-sm`} value={service.slug}
                                    onClick={handleSelectServices}/>
                                    <label htmlFor={`service-${service._id}`}> {service.name} </label>
                                </div>
                                    
                            ))}  
                        </div>
                      </div>  
                                
                      {providedServices && providedServices.map((service, idx) => {
                        const fieldValue = servicesWithPrice.filter(item => item.service === service)
                        
                        return (
                            <div key={idx} className='w-5/6'>
                                <label htmlFor={service} className='font-semibold ms-2 text-sm'>Adauga Pret ({service})</label>
                                <input required id={service} type="number" className='bg-white w-full opacity-80 border-b 
                                border-gray text-sm pb-1 py-1 font-semibold pl-2 focus:outline-none' placeholder={`Pretul tau RON / ora - ${service}`}
                                value={fieldValue.length > 0 && fieldValue[0].price}
                                onChange={handleServicePrice} />
                             </div>
                      )})}

                      <div className="flex flex-col items-start mt-4 w-5/6 ">
                        <label htmlFor="description" className="font-semibold ms-2">Descriere</label>
                        <div className='w-full relative'>
                            <textarea type="text" value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            className="bg-white w-full opacity-80 border-b 
                            border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Scrie ceva despre tine si experienta ta'/>
                            </div>
                      </div>  

                      <div className='flex flex-col items-start mt-4 w-5/6 '>
                        <label htmlFor="photo" className='font-semibold ms-2 mb-1'>Adauga o fotografie de profil</label>
                        <input type="file" onChange={uploadPhotoHandler} id='photo'/>
                      </div>
                  </>
                )}

                <div className='w-5/6 flex flex-col mt-14 items-center bg-dark p-4 
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
                        px-3 py-2.5 tracking-wide text-sm bg-lime text-dark mt-8
                        bottom-0 z-10 font-bold rounded-full shadow-xl" value={'SALVEAZA'}/> 
                )}

            </form>
                 
        </Modal>
        
        <ChangePw />
        <DeleteAcc />
    </div>
    )
}

export default ProfilePage
