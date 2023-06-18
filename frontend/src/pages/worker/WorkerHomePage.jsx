import { Link } from 'react-router-dom'

const WorkerHomePage = () => {
    return (
        <div className="mt-24 px-4 text-center">
            <h1 className="text-2xl font-bold">Fă-ți propriul program de lucru în domeniul treburilor casnice.</h1>
            <h1 className="mt-2 text-lg font-semibold"> Noi îți aducem clienții, tu îți aduci abilitățile.</h1>
            <div className='mt-10'>
                <p className='mb-6 text-lg'>Adauga-ti disponibilitatea acum!</p>
                <Link to='/worker/program' className='bg-lime py-3 px-8 shadow-xl
                 font-bold rounded-sm'>Programator</Link>
            </div>
        </div>
    )
}

export default WorkerHomePage
