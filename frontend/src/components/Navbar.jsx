import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { clearCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Navbar = () => {

    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const openNavbar = (e) => {
        const navbar = document.querySelector('.hamburger-nav');

        if (e.target.className === 'hamburger' || e.target.className === 'hamburger-line') {
            navbar.classList.add('show');
           
        }
    };

    const closeNavbar = (e) => {
        const navbar = document.querySelector('.hamburger-nav');
    
        if (!e.target.classList.contains('nav-actions')) 
        {
            navbar.classList.remove('show');
        }
    };

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

    return (
        <div className="navbar top-0 left-0 w-full absolute">
            <div className="pt-2 ps-4 font-bold">
                Logo <i className="fa-solid fa-broom text-2xl"></i>
            </div>

            <div onClick={openNavbar} className="hamburger">
                <div className="hamburger-line"></div>
            </div>
            <div onClick={closeNavbar} className="hamburger-nav hide flex flex-col items-end absolute top-0 right-0 z-10">
                <div  className="nav-actions bg-white flex flex-col justify-between h-full p-5">
                    <div>
                        <i className="cursor-pointer fa-solid fa-x absolute right-5 text-red text-xl"></i>
                        <h1 className="font-semibold text-xl">Salut {userInfo && userInfo.name}!</h1>
                        <ul  className="mt-8">
                            <Link to={userInfo ? '/services' : '/'} className="font-semibold">
                                <li>
                                    <i className="text-dark mr-2 bg-lime mb-5 rounded-full px-2 py-1 fa-solid fa-house text-xl"></i> Acasă
                                </li>
                            </Link>
                        </ul>
                        {!userInfo ? (
                            <ul >
                                <Link to='/login' className="font-semibold">
                                    <li>
                                        <i className="text-dark mr-2 bg-lime mb-5 rounded-full px-2 py-1 fa-solid fa-arrow-right-to-bracket text-xl"></i> Logare
                                    </li>
                                </Link>

                                <Link to='/register' className="font-semibold">
                                    <li>
                                        <i className="text-dark mr-2 bg-lime mb-5 rounded-full px-1.5 py-1 fa-solid fa-user-plus text-xl"></i> Înregistrare
                                    </li>
                                </Link>
                            </ul>
                        ) : (
                            <ul >
                                <Link to='/' className="font-semibold">
                                    <li>
                                        <i className="text-dark mr-2 bg-lime mb-5 rounded-full px-2.5 py-1 fa-solid fa-user text-xl"></i> Profil
                                    </li>
                                </Link>
                                
                                <Link to='/' className="font-semibold">
                                    <li>
                                        <i className="text-dark mr-2 bg-lime mb-5 rounded-full py-1 px-2 fa-solid fa-cart-shopping text-xl"></i> Comenzi
                                    </li>
                                </Link>
                                
                                <Link to='/' className="font-semibold">
                                    <li>
                                        <i className="text-dark mr-2 bg-lime mb-5 rounded-full py-1 px-2 fa-solid fa-file-invoice-dollar text-xl"></i> Facturi
                                    </li>
                                </Link>

                                <Link to='/' className="font-semibold">
                                    <li>
                                        <i className="text-dark mr-2 bg-lime mb-5 rounded-full px-1.5 py-1 fa-solid fa-user-xmark text-xl"></i> Șterge cont
                                    </li>
                                </Link>

                                <li onClick={logoutUser} className='font-semibold'>    
                                    <i className=" text-dark mr-2 bg-lime mb-5 rounded-full px-2 py-1 fa-solid fa-arrow-right-from-bracket text-xl"></i> Ieși din cont
                                </li>
                            </ul>
                        )}
                        
                    </div>

                    <div className="border-t pt-1">
                        <li>
                            <Link to='/' >Termeni</Link>
                        </li>
                        <li>
                            <Link to='/' >Confidențialitate</Link>
                        </li>
                        <li>
                            <Link to='/' >Ajutor</Link>
                        </li>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Navbar
