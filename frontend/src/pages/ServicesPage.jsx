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

            <img src={cleanHome} alt="clean-house" className='short:h-auto mx-auto object-cover 
             h-72 md:max-w-3xl md:rounded-t-md md:h-auto' />

            <div className='mx-auto p-5 pb-10 max-w-3xl mt-auto bg-lightLime rounded-t-lg 
             -translate-y-6 lg:-translate-y-20'>
                <h1 className='text-center font-bold text-lg '>Cu ce te putem ajuta?</h1>
                <Link to='/schedule#curatenie' className='my-4 min-h-20 pb-2 cursor-pointer 
                 border-b border-gray bg-lightLime flex items-center '>
                    <img src={cleaningIcon} alt="house cleaning" className='short:py-4 h-20 p-4 
                     bg-lightLime w-auto rounded-md ' />
                    <div className='pr-4 p-2 short2:pr-0'>
                        <h2 className='font-semibold'>Curățenie </h2>
                        <p className='opacity-70 text-sm short2:text-xs'>Eliberează-te de grija 
                         curățeniei cu ajutorul nostru!</p>
                    </div>

                    <i className="short2:hidden fa-solid my-auto ml-auto mr-2 fa-chevron-right 
                     bg-lime rounded-full py-1 px-2.5 text-sm"></i>
                </Link>
                
                <Link to='/schedule#tuns-iarba' className='my-4 min-h-20 pb-2 cursor-pointer 
                 bg-lightLime border-b border-gray text-black flex items-center'>
                    <img src={grassIcon} alt="house cleaning" className='short:py-4 p-4 w-20 h-20 
                    bg-lightLime w-auto rounded-md'/>

                    <div className='p-2 pr-4 short2:pr-0'>
                        <h2 className='font-semibold'>Tuns iarba</h2>
                        <p className='opacity-70 text-sm short2:text-xs'>Bucură-te de o grădină 
                         frumoasă și îngrijită fără eforturi suplimentare.</p>
                    </div>

                    <i className="short2:hidden fa-solid my-auto mr-2 ml-auto fa-chevron-right 
                     bg-lime rounded-full py-1 px-2.5 text-sm"></i>
                </Link>

                <Link to='/schedule#babysitting' className='my-4 min-h-20 pb-2 border-b border-gray
                 bg-lightLime flex cursor-pointer items-center'>
                    <img src={babyIcon} alt="house cleaning" className='short:py-4 p-4 w-20 h-20 
                    bg-lightLime w-auto rounded-md'/>
                    
                    <div className='pr-4 p-2 short2:pr-0'>
                        <h2 className='font-semibold'>Babysitting</h2>
                        <p className='opacity-70 text-sm short2:text-xs'>Babysitting la îndemâna ta,
                         pentru momente de liniște și siguranță!</p>
                    </div>

                    <i className="short2:hidden fa-solid my-auto mr-2 ml-auto fa-chevron-right 
                     bg-lime rounded-full py-1 px-2.5 text-sm"></i>
                </Link>
            </div>
        </div>
    )
}

export default SearchPage
