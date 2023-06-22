import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Navigation = () => {

    const location = useLocation();
    const { userInfo } = useSelector(state => state.auth);

    if (location.pathname === '/' || location.pathname === '/login'
        || location.pathname === '/register'
    )
        return null;

    return (
        <div className={`p-4 w-full z-10 fixed shadow-top bg-white bottom-0 ${!userInfo && 'hidden'}
         flex justify-around items-center max-w-5xl left-2/4 -translate-x-2/4`}>
            {userInfo && userInfo.role === 'client' ? (
                <>
                    <Link to='/services' className="flex flex-col items-center justify-center">                
                        <i className={`text-black fa-solid fa-house text-xl 
                            ${location.pathname === '/services' ? 'text-lime' : 'text-black' }`}></i>  
                    </Link>

                    <Link to='/orders' className="flex flex-col items-center justify-center">
                        
                        <i className={`text-black fa-solid fa-cart-shopping text-xl 
                            ${location.pathname === '/orders' ? 'text-lime' : 'text-black' }`}></i>                
                    </Link>

                    <Link to='/profile' className="flex flex-col items-center justify-center">
                        <i className={`${location.pathname === '/profile' ? 'text-lime' : 'text-black'}
                            text-black fa-user fa-solid text-xl`}></i>
                    </Link>
                </>
            ) : (
                <>
                    <Link to='/worker' className="flex flex-col items-center justify-center">                
                        <i className={`fa-solid fa-house text-xl 
                            ${location.pathname === '/worker' ? 'text-lime' : 'text-black' }`}></i>  
                    </Link>

                    <Link to='/orders' className="flex flex-col items-center justify-center">
                        
                        <i className={`fa-solid fa-cart-shopping text-xl 
                            ${location.pathname === '/orders' ? 'text-lime' : 'text-black' }`}></i>                
                    </Link>

                    <Link to='/worker/profile' className="flex flex-col items-center justify-center">
                        <i className={`${location.pathname === '/worker/profile' ? 'text-lime' : 'text-black'}
                            fa-user fa-solid text-xl`}></i>
                    </Link>
                </>
            )}
            
        </div>
    )
}

export default Navigation
