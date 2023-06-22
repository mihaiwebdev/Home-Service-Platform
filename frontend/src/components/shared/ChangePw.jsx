import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUpdatePasswordMutation } from '../../slices/usersApiSlice'
import { toast } from 'react-toastify'
import Modal from './Modal'
import Loader from './Loader'


const ChangePw = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    
    const changePassword = async (e) => {
        e.preventDefault();
        
        if (confirmPw !== newPassword) {
            toast.error('Parolele difera');

        } else {
            try {
                await updatePassword({currentPassword, newPassword}).unwrap();
                toast.success('Parola a fost schimbata!')
                navigate(-1)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }        
        };
    
    }; 

    return (
        <Modal extraClass={`${location.hash === '#changepw' ? 'h-92% overflow-hidden' : 'hidden'}`}>
            <div className='relative w-full mb-4'>
                <i onClick={() => navigate(-1)} className="fa-solid
                bg-lime rounded-full py-2 px-3 fa-chevron-left absolute left-2 "></i>
                <h1 className='text-center font-bold text-xl'>Modifica parola </h1>
            </div>

            <form onSubmit={changePassword} className='w-full max-w-3xl flex flex-col 
                items-center mx-auto relative'>
                <div className="flex flex-col items-start mt-6 w-full short:mt-4">
                    <label htmlFor="currentPassword" className="font-semibold ms-2">Parola curenta</label>
                    <div className='w-full relative'>
                        <input type="password" required value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-gray text-sm pb-1 pl-2 focus:outline-none" placeholder='Introdu parola curenta'/>
                        </div>
                </div>  

                <div className="flex flex-col items-start mt-6 w-full short:mt-4">
                    <label htmlFor="newPassowrd" className="font-semibold ms-2">Parola noua</label>
                    <div className='w-full relative'>
                        <input type="password" required value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-gray text-sm pb-1 pl-2 focus:outline-none" placeholder='Introdu parola noua'/>
                        </div>
                </div>  

                <div className="flex flex-col items-start mt-6 w-full short:mt-4">
                    <label htmlFor="confirmPassword" className="font-semibold ms-2">Repeta parola</label>
                    <div className='w-full relative'>
                        <input type="password" required value={confirmPw} 
                        onChange={(e) => setConfirmPw(e.target.value)} 
                        className="bg-white w-full opacity-80 border-b 
                        border-gray text-sm pb-1 pl-2 focus:outline-none" placeholder='Reintrodu parola noua'/>
                    </div>
                </div>  

                {isLoading ? <Loader /> : (
                    <input type="submit" className="disabled:opacity-75 w-2/3 
                        px-3 py-2.5 tracking-wide text-sm bg-lime text-dark mt-8
                        bottom-0 z-10 font-bold rounded-full " value={'SALVEAZA'}/> 
                )}
            </form>

        </Modal>
    )
}


export default ChangePw
