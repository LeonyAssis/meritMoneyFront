import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
    const auth = JSON.parse(localStorage.getItem("user"));

    return (
        auth && auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes;