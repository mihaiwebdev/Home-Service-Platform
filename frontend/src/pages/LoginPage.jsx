import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate =  useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/')
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
        <div className="h-screen text-center flex flex-col items-center justify-end">
            <div>
                <h1 className="font-bold text-2xl">Loghează-te</h1>
                <p className="font-semibold mt-2">Aici găsești soluții personalizate <span className="block">pentru a-ți elibera agenda și a te relaxa</span></p>
            </div>

            <form onSubmit={submitHandler} className="bg-lime shadow-3xl rounded-t-3xl w-full mt-6 h-3/4">
                <div className='w-full max-w-3xl flex flex-col items-center mx-auto'>
                    <div className="flex flex-col items-start mt-10 w-5/6">
                        <label htmlFor="email" className="font-semibold mb-1 ms-2">Adresa ta email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="bg w-full rounded-full p-2 pl-4 border border-gray" placeholder="nume@gmail.com"/>
                    </div>

                    <div className="flex flex-col items-start mt-3 w-5/6">
                        <label htmlFor="password" className="font-semibold mb-1 ms-2">Parola</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="bg w-full rounded-full p-2 pl-4 border border-gray" placeholder="Introdu parola"/>
                    </div>

                    <input type="submit" className="mt-8 p-3 bg-dark text-white w-5/6 rounded-full" value={'Continua'}/>
                    
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
