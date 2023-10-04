import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Renungan from './pages/Renungan.jsx'
import Login from './pages/Login.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import DetailRenungan from './pages/DetailRenungan.jsx'
import NotFound from './pages/NotFound.jsx'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/renungan" element={<Renungan />} />
                <Route path="/renungan/:id" element={<DetailRenungan />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}