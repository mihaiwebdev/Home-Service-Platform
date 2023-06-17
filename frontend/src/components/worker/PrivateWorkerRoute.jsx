import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

const PrivateWorkerRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return (userInfo && userInfo.role === 'worker') ?  <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateWorkerRoute
