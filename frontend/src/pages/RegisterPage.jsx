import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/shared/Loader'
import emailIcon from '../assets/email.png'
import padlockIcon from '../assets/padlock.png'

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, {isLoading}] = useRegisterMutation();
    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/services')
        }

    }, [navigate, userInfo])

    const handleForm = async(e) => {
        e.preventDefault();
        const data = {name, email, password, role}

        if (password !== confirmPw) {
            toast.error('Parolele diferă');

        } else if (password.length < 6) {
            toast.error('Parola trebuie sa conțină minim 6 caractere')

        } else {
            try {
                const res = await register(data).unwrap();
                dispatch(setCredentials({...res}));

                role === 'worker' ? navigate('/worker/profile/edit')
                 : navigate('/services');
    
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div className="min-h-100dvh h-screen max-h-max bg-white text-center flex flex-col items-center justify-end short:h-full short:pt-16">
            <div className='short:mt-4'>
                <h1 className="font-bold text-2xl short2:text-xl">Înregistrează-te</h1>
                {role === 'client' ? (
                    <p className="font-semibold mt-2 short2:mt-0 short2:text-sm px-2">Ai nevoie de ajutor în treburile casnice? <span className="block">Alătură-te comunității noastre pentru a găsi soluții adaptate nevoilor tale.</span></p>
                ) : (
                    <p className="font-semibold mt-2 short2:mt-0 short2:text-sm px-2">Fă-ți propriul program de lucru 
                        <span className='block'>în domeniul treburilor casnice.</span>
                        <span className="block"> Noi îți aducem clienții, tu îți aduci abilitățile.</span>
                    </p>
                )}
            </div>

            <form onSubmit={handleForm} className="bg-lime shadow-3xl rounded-t-3xl w-full flex flex-col items-center mt-6 h-3/4 short:mt-4 short2:pb-10">
                <div className='flex justify-around w-full'>
                    <div className={`w-full py-2 rounded-tl-3xl relative
                        ${role === 'client' ? 'bg-gray border-b-2 border-dark shadow-inner' : 'bg-limeMatch border-b border-gray'}`}>
                        <input type="radio" name="user-role" className='w-full h-full cursor-pointer opacity-0 absolute top-0 left-0' value="client"
                            onClick={(e) => setRole(e.target.value)}/>
                        <label className='font-semibold' htmlFor="client">Client</label>
                    </div>
                    
                    <div className={`w-full py-2 rounded-tr-3xl relative
                        ${role === 'worker' ? 'bg-gray border-b-2 border-dark shadow-inner' : 'bg-limeMatch border-b border-gray'}`}>
                        <input type="radio" name="user-role" className='w-full h-full cursor-pointer  opacity-0 absolute top-0 left-0' value="worker"
                         onClick={(e) => setRole(e.target.value)}/>
                        <label className='font-semibold' htmlFor="worker">Worker</label>
                    </div>
                </div>
                

                <div className='w-full max-w-3xl flex flex-col items-center mx-auto'>
                    <div className="flex flex-col items-start mt-8 w-5/6 short:mt-4">
                        <label htmlFor="name" className="font-semibold mb-1 ms-2">Numele tău</label>
                        <div className='w-full relative'>
                            <i className="fa-regular fa-user absolute opacity-60 left-4 top-3"></i>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                            className="bg-white w-full rounded-full p-2 pl-10 border border-gray focus-within:shadow-lg focus:outline-limeMatch"
                            placeholder="Adaugă-ți numele"/>
                         </div>
                    </div>

                    <div className="flex flex-col items-start mt-2 w-5/6">
                        <label htmlFor="email" className="font-semibold mb-1 ms-2">Adresa ta email</label>
                        <div className='w-full relative'>
                            <img src={emailIcon} width={18} height={18}
                                className='absolute opacity-60 left-3.5 top-3' alt="emailIcon" />
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                            className="bg-white w-full rounded-full p-2 pl-10 border border-gray focus-within:shadow-lg focus:outline-limeMatch" 
                            placeholder="Introdu email-ul"/>
                         </div>
                    </div>

                    <div className="flex flex-col items-start mt-2 w-5/6">
                        <label htmlFor="password" className="font-semibold ms-2">Parola</label>
                        <small className='ms-2 mb-1'> * minim 6 caractere</small>
                        <div className='w-full relative'>
                            <img src={padlockIcon} width={18} height={18}
                                    className='absolute opacity-60 left-3.5 top-3' alt="emailIcon" />
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} 
                            className="bg-white w-full rounded-full p-2 pl-10 border border-gray focus-within:shadow-lg focus:outline-limeMatch" 
                            placeholder="Introdu parola"/>
                         </div>
                    </div>

                    <div className="flex flex-col items-start mt-2 w-5/6">
                        <label htmlFor="confirm-password" className="font-semibold mb-1 ms-2">Confirmă Parola</label>
                        <div className='w-full relative'>
                            <img src={padlockIcon} width={18} height={18}
                                    className='absolute opacity-60 left-3.5 top-3' alt="emailIcon" />
                            <input type="password" required value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} 
                            className="bg-white w-full rounded-full p-2 pl-10 border border-gray focus-within:shadow-lg focus:outline-limeMatch" 
                            placeholder="Reintrodu parola"/>
                         </div>
                    </div>
                    {isLoading ? <Loader /> : (
                        <input type="submit" disabled={email && password && confirmPw && name ? false : true}
                            className="disabled:opacity-75 mt-8 p-3 bg-dark text-white w-5/6 rounded-full" value={'Continuă'}/> 
                    )}

                    <div className='mt-10'> 
                        <span className='mr-2'>Ai deja un cont?</span>
                        <Link to='/login' className='font-semibold underline'>Loghează-te aici</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
