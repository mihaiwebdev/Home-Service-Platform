import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {

    const location = useLocation();

    if (location.pathname === '/' || location.pathname === '/login'
        || location.pathname === '/register'
    )
        return null;

    return (
        <div className="p-5 w-full z-10 absolute bottom-0 flex justify-around items-center max-w-5xl left-2/4 -translate-x-2/4">
            <Link to='/services' className="flex flex-col items-center justify-center">                
                <i className={`text-dark fa-solid fa-house text-xl 
                    ${location.pathname === '/services' ? 'opacity-100' : 'opacity-80' }`}></i>  
            </Link>

            <Link to='/orders' className="flex flex-col items-center justify-center">
                
                <i className={`text-dark fa-solid fa-cart-shopping text-xl 
                    ${location.pathname === '/orders' ? 'opacity-100' : 'opacity-80' }`}></i>                
            </Link>

            <Link to='/profile' className="flex flex-col items-center justify-center">
                <i className={`${location.pathname === '/profile' ? 'opacity-100' : 'opacity-80'}
                    text-dark fa-user fa-solid text-xl`}></i>
            </Link>
        </div>
    )
}

export default Navigation
