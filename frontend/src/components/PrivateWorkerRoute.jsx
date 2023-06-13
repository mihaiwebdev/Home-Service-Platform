import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

const PrivateWorkerRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return userInfo.role !== 'worker' ? <Navigate to='/' replace/> : <Outlet/>
}

export default PrivateWorkerRoute
