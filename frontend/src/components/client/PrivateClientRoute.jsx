import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

const PrivateClientRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return userInfo.role !== 'client' ? <Navigate to='/worker/edit' replace/> : <Outlet/>
}

export default PrivateClientRoute
