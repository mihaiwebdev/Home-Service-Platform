import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { clearCredentials } from '../slices/authSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const logoutUser = async () => {
        try {
            await logout().unwrap();
            dispatch(clearCredentials());
            toast.success('V-ați delogat');
            navigate('/');
            
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const toggleNav = (e) => {
        
        if (e.target.className === 'hamburger' || e.target.className === 'hamburger-line') {
            setIsOpen(true);
        };
        
        if (e.target.classList.contains('hamburger-nav') || e.target.tagName === 'LI' || 
            e.target.tagName === 'I')
        {
            setIsOpen(false)
        };
        
    };

    return (
        <motion.div initial={{y:-100}} animate={{y: 0}}
        transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }}
         className="navbar top-0 left-0 w-full z-20 absolute">
            <div className="pt-2 ps-4 font-bold">
                Logo <i className="fa-solid fa-broom text-2xl"></i>
            </div>

            <div onClick={toggleNav}>
                <div className="hamburger">
                    <div className="hamburger-line"></div>
                </div>

                <div className={`hamburger-nav flex flex-col
                items-end z-20 absolute top-0 right-0 ${isOpen ? 'show' : ''}`}>

                    <div  className="nav-actions bg-white flex flex-col justify-between h-full p-5">
                        <div>
                            <i className="cursor-pointer fa-solid fa-x absolute right-5 text-red text-xl"></i>
                            <h1 className="font-semibold text-xl border-b border-gray pb-2">Salut {userInfo && userInfo.name}</h1>
                            <ul  className="mt-8">
                                <Link to={userInfo ? '/services' : '/'} className="font-semibold">
                                    <li>
                                        <i className="text-dark mr-2 bg-lime mb-3 rounded-full px-2 py-1 fa-solid fa-house text-base"></i> Acasă
                                    </li>
                                </Link>
                            </ul>
                            {!userInfo ? (
                                <ul >
                                    <Link to='/login' className="font-semibold">
                                        <li>
                                            <i className="text-dark mr-2 bg-lime mb-3 rounded-full px-2 py-1 fa-solid fa-arrow-right-to-bracket text-base"></i> Logare
                                        </li>
                                    </Link>

                                    <Link to='/register' className="font-semibold">
                                        <li>
                                            <i className="text-dark mr-2 bg-lime mb-3 rounded-full px-1.5 py-1 fa-solid fa-user-plus text-base"></i> Înregistrare
                                        </li>
                                    </Link>
                                </ul>
                            ) : (
                                <ul >
                                    <Link to='/profile' className="font-semibold">
                                        <li>
                                            <i className="text-dark mr-2 bg-lime mb-3 rounded-full px-2.5 py-1 fa-regular fa-user text-base"></i> Profil
                                        </li>
                                    </Link>
                                    
                                    <Link to='/' className="font-semibold">
                                        <li>
                                            <i className="text-dark mr-2 bg-lime mb-3 rounded-full py-1 px-2 fa-solid fa-cart-shopping text-base"></i> Comenzi
                                        </li>
                                    </Link>
                                    
                                    <Link to='/' className="font-semibold">
                                        <li>
                                            <i className="text-dark mr-2 bg-lime mb-3 rounded-full py-1 px-2.5 fa-solid fa-file-invoice-dollar text-base"></i> Facturi
                                        </li>
                                    </Link>

                                    <li onClick={logoutUser} className='font-semibold'>    
                                        <i className=" text-dark mr-2 bg-lime mb-3 rounded-full px-2 py-1 fa-solid fa-arrow-right-from-bracket text-base"></i> Ieși din cont
                                    </li>
                                </ul>
                            )}
                            
                        </div>

                        <div className="border-t pt-1 border-gray">
                            <li>
                                <Link to='/' className='opacity-70'>Termeni</Link>
                            </li>
                            <li>
                                <Link to='/' className='opacity-70' >Confidențialitate</Link>
                            </li>
                            <li>
                                <Link to='/' className='opacity-70' >Ajutor</Link>
                            </li>
                        </div>

                    </div>
                </div>
            </div>

        </motion.div>

    )
}

export default Navbar
