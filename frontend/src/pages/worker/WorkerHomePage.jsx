import { Link } from 'react-router-dom'

const WorkerHomePage = () => {
    return (
        <div className="pt-24 px-4 h-screen text-center">
            <h1 className="text-2xl font-bold">Fă-ți propriul program de lucru în domeniul treburilor casnice.</h1>
            <h1 className="mt-2 text-lg font-semibold"> Noi îți aducem clienții, tu îți aduci abilitățile.</h1>
            <div className='mt-10'>
                <p className='mb-6 text-lg'>Adauga-ti disponibilitatea acum!</p>
                <Link to='/worker/program' className='bg-lime py-3 px-8 shadow-xl
                 font-bold rounded-sm'>Programator</Link>
            </div>

            <div className='mt-20 flex justify-around rounded-sm h-20'>
                <Link to='/orders' className='bg-darkGreen  w-36 rounded-sm text-white flex flex-col px-6
                 justify-center items-center'>
                    <h1 className='text-xl'>Verifica</h1>
                    <h1 className='text-xl'>comenzile</h1>
                </Link>

                <Link to='/worker/profile'  className='bg-green w-36 rounded-sm text-white flex flex-col px-6
                 justify-center items-center'>
                    <h1 className='text-xl'>Creeaza</h1>
                    <h1 className='text-xl'>Profilul</h1>
                </Link>
            </div>
        </div>
    )
}

export default WorkerHomePage
