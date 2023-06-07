import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify';
import emailIcon from '../assets/email.png'
import padlockIcon from '../assets/padlock.png'

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate =  useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/services')
        };

    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');

        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="h-screen text-center flex flex-col items-center justify-end short:h-full short:pt-20">
            <div>
                <h1 className="font-bold text-2xl short2:text-xl">Loghează-te</h1>
                <p className="font-semibold mt-2 px-2 short2:mt-0 short2:text-sm">Conectăm persoanele cu experiență în treburile casnice și pe cei care au nevoie de ajutor.</p>
            </div>

            <form onSubmit={submitHandler} className="bg-lime shadow-3xl rounded-t-3xl w-full mt-6 h-3/4 short:mt-4 short2:pb-24">
                <div className='w-full max-w-3xl flex flex-col items-center mx-auto'>
                    <div className="flex flex-col items-start mt-10 w-5/6 short:mt-4">
                        <label htmlFor="email" className="font-semibold mb-1 ms-2">Adresa ta email</label>
                        <div className='w-full relative'>
                            <img src={emailIcon} width={18} height={18}
                             className='absolute opacity-60 left-3.5 top-3' alt="emailIcon" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                            className="bg-white w-full rounded-full p-2 pl-10 border border-gray focus-within:shadow-lg focus:outline-limeMatch"
                            placeholder="Introdu email-ul"/>
                         </div>
                    </div>

                    <div className="flex flex-col items-start mt-3 w-5/6">
                        <label htmlFor="password" className="font-semibold mb-1 ms-2">Parola</label>
                        <div className='w-full relative'>
                        <img src={padlockIcon} width={18} height={18}
                             className='absolute opacity-60 left-3.5 top-3' alt="emailIcon" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                         className="bg-white w-full rounded-full p-2 pl-10 border border-gray focus-within:shadow-lg focus:outline-limeMatch"
                         placeholder="Introdu parola"/>
                         </div>
                    </div>
                    

                    {isLoading ? <Loader /> : (
                        <input type="submit" disabled={!email && !password ? true : false}
                         className="disabled:opacity-75 mt-8 p-3 bg-dark text-white w-5/6 rounded-full" value={'Continuă'}/>
                    )}
                    
                    <div className='flex justify-between w-full px-10 mt-10'>
                        <Link to='/register' className='font-semibold underline'>Înregistrează-te</Link>
                        <Link to='/forgotpassword' className='font-semibold underline'>Parolă uitată</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
