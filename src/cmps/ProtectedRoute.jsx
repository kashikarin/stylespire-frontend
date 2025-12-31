import { Navigate, Outlet } from "react-router-dom"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"
import { Loader } from "../cmps/Loader"

export function ProtectedRoute() {
    const { loggedInUser, loading } = useIsLoggedInUser() 
    if (loading) return <Loader /> 
    if (!loggedInUser) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

