import { Link } from 'react-router-dom'
import busyWomanImg from '../assets/busy-woman.png'
import cleanHouseImg from '../assets/house-cleaning.png'

const Welcomepage = () => {
    return (
        
        <div className="pt-16 short:pt-8 h-screen relative md:pt-28">
            <h1 className='font-sourcesanspro py-5 text-center text-dark
                font-extrabold px-8 text-4xl short2:text-2xl md:mb-12'>
                Eliberează-te de sarcinile <img className='inline-block' width={40} height={40} src={cleanHouseImg} alt="clean-house" /> casnice  
                
            </h1>

            <div className='h-full bg-lime shadow-3xl rounded-t-3xl pt-1 home-cta md:flex md:flex-col-reverse md:flex-col md:pb-32 md:justify-around lg:flex-row lg:justify-around lg:flex-row-reverse'>
                <img className='mt-8 mx-auto short2:mt-2 short2:w-4/5 sm:w-2/3
                    md:object-contain md:w-4/5 md:h-3/5 lg:w-1/2 lg:h-4/6 lg:mt-12' src={busyWomanImg} alt="woman-cleaning" />
                <div className='lg:w-2/4 lg:mt-20 xl:mt-32'>
                    <p className='text-center mt-4 text-xl font-sourcesanspro font-bold short2:text-base md:text-3xl'><span className='block'>Servicii de curățenie și întreținere</span> la doar un clic distanță</p>
                    <p className='hidden lg:block text-center text-xl font-sourcesanspro font-semibold short2:text-base md:text-3xl'><span className='block'>O casă curată și ordonată,</span>  un stil de viață mai bun</p>
                    <div className='flex justify-center mt-8 short:mt-2 short2:mt-4'>
                        <Link to='' className='bg-dark py-1.5 pl-3 pr-1 rounded-full short:py-0.5 short:pl-2 '>
                            <span className='text-white font-sourcesanspro '>Gaseste ajutor</span>
                            <div className='inline-block bg-white rounded-full ml-3 py-1.5 px-2.5 short:py-0.5 short:px-1.5'>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcomepage
