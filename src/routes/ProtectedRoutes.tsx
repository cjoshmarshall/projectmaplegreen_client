import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RootState } from '../redux/store'

function ProtectedRoutes(roles: any) {

    const auth = useSelector((state: RootState) => state.auth)
    const location = useLocation()

    return (
        roles['roles']?.includes(auth?.user.admin)
            ? <Outlet />
            : auth.isLogged
                ? <Navigate to={`/trees/${auth?.user._id}`} state={{ from: location }} replace />
                : <Navigate to='login' state={{ from: location }} replace />
    )
}

export default ProtectedRoutes