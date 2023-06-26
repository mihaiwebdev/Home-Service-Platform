import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { clearCredentials } from '../../slices/authSlice'
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
            navigate('/login');
            
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const toggleNav = (e) => {
        
        if (e.target.className === 'hamburger' || e.target.className === 'hamburger-line') {
            setIsOpen(true);
            document.body.classList.add('overflow-hidden');
        };
        
        if (e.target.classList.contains('hamburger-nav') || e.target.tagName === 'LI' || 
            e.target.tagName === 'I')
        {
            setIsOpen(false);
            document.body.classList.remove('overflow-hidden');
        };
        
    };

    return (
        <motion.div initial={{y:-100}} animate={{y: 0}}
        transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }}
         className="top-0 z-30 left-0 w-full absolute">
            <div className="pt-2 z-10 ps-4 font-bold absolute">
                Logo <i className="fa-solid fa-broom text-2xl"></i>
            </div>

            <div onClick={toggleNav}>
                <div className="hamburger">
                    <div className="hamburger-line"></div>
                </div>

                <div className={`hamburger-nav z-20  flex flex-col
                items-end absolute top-0 right-0 ${isOpen ? 'show' : ''}`}>

                    <div  className="nav-actions bg-lightLime flex flex-col justify-between h-full p-5">
                        <div >
                            <i className="cursor-pointer fa-solid fa-x absolute right-5 text-red text-xl"></i>
                            <h1 className="font-semibold text-xl border-b border-gray pb-2 mb-8">Salut {userInfo && userInfo.name}</h1>

                            <ul >
                                <Link to={userInfo && userInfo.role === 'worker' ? '/worker' : '/services'} className="font-semibold">
                                    <li>
                                        <i className="text-dark mr-2 bg-lime mb-3 rounded-full px-2 py-1 fa-solid fa-house text-base"></i> Acasă
                                    </li>
                                </Link>
                            </ul>
                         

                            {!userInfo ? (
                                <ul>
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
                                
                                <ul className='flex h-full flex-col'>
                                    <Link to={userInfo.role === 'worker' ? '/worker/profile' : '/profile'}
                                     className="font-semibold">
                                        <li>
                                            <i className="text-dark mr-2 bg-lime mb-3 rounded-full px-2.5 py-1 fa-regular fa-user text-base"></i> Profil
                                        </li>
                                    </Link>
                                    
                                    {userInfo.role === 'worker' && (
                                        <Link to='/worker/program' className="font-semibold">
                                            <li>
                                                <i className="text-dark mr-2 bg-lime mb-3 rounded-full py-1 px-2 fa-regular fa-calendar-days text-base"></i> Program
                                            </li>
                                        </Link>
                                    )}

                                    <Link to={userInfo.role === 'worker' ? '/worker' : '/orders'} className="font-semibold">
                                       <li>
                                            <i className={`text-dark mr-2 bg-lime mb-3 rounded-full py-1 px-2 fa-solid 
                                             ${userInfo.role === 'worker' ? 'fa-file-invoice-dollar px-2.5' : 'fa-cart-shopping'} text-base`}>
                                            </i>

                                            Comenzi
                                        </li>
                                    </Link>

                                    <li onClick={logoutUser} className='font-semibold mt-2'>    
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
