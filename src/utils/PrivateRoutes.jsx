import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoutes() {
    let useAuth = localStorage.getItem('user-token')
    return (
        useAuth ? <Outlet /> : <Navigate to="/login" />
    )
}