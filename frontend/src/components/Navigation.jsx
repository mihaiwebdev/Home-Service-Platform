import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Navigation = () => {
    const location = useLocation();

    if (location.pathname === '/' || location.pathname === '/login'
        || location.pathname === '/register'
    )
        return null;

    return (
        <div className="p-5 w-full absolute bottom-0 flex justify-around items-center">
            <Link to='/' className="flex flex-col items-center justify-center">
                <i className="text-dark fa-solid fa-house text-xl"></i>
            </Link>

            <Link to='/orders' className="flex flex-col items-center justify-center">
                <i className="text-dark fa-solid fa-cart-shopping text-xl"></i>
            </Link>

            <Link to='/profile' className="flex flex-col items-center justify-center">
                <i className="text-dark fa-solid fa-user text-xl"></i>
            </Link>
        </div>
    )
}

export default Navigation
