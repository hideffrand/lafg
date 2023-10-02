import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoutes() {
    let getToken = localStorage.getItem('token')
    return (
        getToken ? <Outlet /> : <Navigate to="/login" />
    )
}