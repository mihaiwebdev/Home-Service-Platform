import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

const PrivateClientRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return (userInfo && userInfo.role === 'client') ?  <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateClientRoute
