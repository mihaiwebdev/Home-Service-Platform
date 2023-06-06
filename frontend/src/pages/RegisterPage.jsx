import { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [password, setPassword] = useState('');

    const handleForm = (e) => {
        e.preventDefault();
        console.log(email, password)
    }

    return (
        <div className="h-screen text-center flex flex-col items-center justify-end">
            <div>
                <h1 className="font-bold text-2xl">Înregistrează-te</h1>
                <p className="font-semibold mt-2">Aici găsești soluții personalizate <span className="block">pentru a-ți elibera agenda și a te relaxa</span></p>
            </div>

            <form onSubmit={handleForm} className="bg-lime shadow-3xl rounded-t-3xl w-full flex flex-col items-center mt-6 h-3/4">
                <div className='w-full max-w-3xl flex flex-col items-center mx-auto'>
                    <div className="flex flex-col items-start mt-10 w-5/6">
                        <label htmlFor="name" className="font-semibold mb-1 ms-2">Numele tău</label>
                        <input type="email" value={name} onChange={(e) => setName(e.target.value)} 
                        className="bg w-full rounded-full p-2 pl-4 border border-gray" placeholder="Adaugă-ți numele"/>
                    </div>

                    <div className="flex flex-col items-start mt-2 w-5/6">
                        <label htmlFor="email" className="font-semibold mb-1 ms-2">Adresa ta email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="bg w-full rounded-full p-2 pl-4 border border-gray" placeholder="john@gmail.com"/>
                    </div>

                    <div className="flex flex-col items-start mt-2 w-5/6">
                        <label htmlFor="password" className="font-semibold mb-1 ms-2">Parola</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="bg w-full rounded-full p-2 pl-4 border border-gray" placeholder="Introdu parola"/>
                    </div>

                    <div className="flex flex-col items-start mt-2 w-5/6">
                        <label htmlFor="confirm-password" className="font-semibold mb-1 ms-2">Confirmă Parola</label>
                        <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} 
                        className="bg w-full rounded-full p-2 pl-4 border border-gray" placeholder="Reintrodu parola"/>
                    </div>

                    <input type="submit" className="mt-8 p-3 bg-dark text-white w-5/6 rounded-full" value={'Continua'}/>

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
