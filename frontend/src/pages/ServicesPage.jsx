import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import cleaningIcon from '../assets/housekeeping.png'
import grassIcon from '../assets/grass-cutter.png'
import babyIcon from '../assets/baby-girl.png'
import cleanHome from '../assets/clean-home.jpg'

const SearchPage = () => {

    const { userInfo } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        };

    }, [userInfo])

    return (
        <div className="pt-16 min-h-screen h-full bg-lightLime">

            <img src={cleanHome} alt="clean-house" className='short:h-auto mx-auto object-cover h-72 md:max-w-3xl md:rounded-t-md md:h-auto' />

            <div className='mx-auto p-5 pb-10 max-w-3xl mt-auto bg-lightLime rounded-t-lg -translate-y-6 lg:-translate-y-20'>
                <Link to='/' className='my-4 h-24 cursor-pointer shadow-md bg-lightLime flex items-center rounded-md'>
                    <img src={cleaningIcon} alt="house cleaning" className='short:py-4 p-3 bg-gray w-auto h-full rounded-md shadow-lg' />
                    <div className='pr-4 p-2 short2:pr-0'>
                        <h2 className='font-semibold text-base'>Curățenie | Spălat vase | Călcat</h2>
                        <p className='opacity-60 font-semibold text-sm short2:text-xs'>Eliberează-te de grija curățeniei cu ajutorul nostru!</p>
                    </div>

                    <i className="short2:hidden fa-solid my-auto mr-2 fa-chevron-right text-xl opacity-50"></i>
                </Link>

                <Link to='/' className='my-4  h-24 shadow-md cursor-pointer bg-lightLime text-black flex items-center rounded-md'>
                    <img src={grassIcon} alt="house cleaning" className='short:py-4 p-3 w-20 h-20 bg-gray w-auto h-full rounded-md shadow-lg'/>
                    <div className='p-2 pr-4 short2:pr-0'>
                        <h2 className='font-semibold text-base'>Tuns iarba</h2>
                        <p className='opacity-60 font-semibold text-sm short2:text-xs'>Bucură-te de o grădină frumoasă și îngrijită fără eforturi suplimentare.</p>
                    </div>

                    <i className="short2:hidden fa-solid my-auto mr-2 fa-chevron-right text-xl opacity-50"></i>
                </Link>

                <Link to='/' className='my-4  h-24 shadow-md bg-lightLime flex cursor-pointer items-center rounded-md'>
                    <img src={babyIcon} alt="house cleaning" className='short:py-4 p-3 w-20 h-20 bg-gray w-auto h-full rounded-md shadow-lg'/>
                    <div className='pr-4 p-2 short2:pr-0'>
                        <h2 className='font-semibold text-base'>Babysitting</h2>
                        <p className='opacity-60 font-semibold text-sm short2:text-xs'>Servicii de babysitting la îndemâna ta, pentru momente de liniște și siguranță!</p>
                    </div>

                    <i className="short2:hidden fa-solid my-auto mr-2 fa-chevron-right text-xl opacity-50"></i>
                </Link>
            </div>
        </div>
    )
}

export default SearchPage
