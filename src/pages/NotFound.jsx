import { useNavigate } from 'react-router-dom'
import '../index.css'

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="notFound">
            <h1>404 | Page Not Found</h1>
            <button onClick={() => navigate('/')}>Back to Homepage</button>
        </div>
    )
}