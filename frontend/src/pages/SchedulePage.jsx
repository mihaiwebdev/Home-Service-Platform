import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const SchedulePage = () => {

    const location = useLocation();
    console.log(location)

    return (
        <div className="pt-20 min-h-screen px-2 h-full bg-lightLime">
            <h1 className="text-center text-xl font-semibold">Adauga locatia pentru curatenie</h1>
        </div>
    )
}

export default SchedulePage
