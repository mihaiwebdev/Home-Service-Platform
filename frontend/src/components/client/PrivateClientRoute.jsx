import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

const PrivateClientRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return userInfo.role !== 'client' ? <Navigate to='/profile' replace/> : <Outlet/>
}

export default PrivateClientRoute
