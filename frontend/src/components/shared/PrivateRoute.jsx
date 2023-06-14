import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'


const PrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return !userInfo ? <Navigate to='/login' replace/> : <Outlet/>
}

export default PrivateRoute
