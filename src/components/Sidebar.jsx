import { useNavigate } from 'react-router-dom'
import '../index.css'

export default function Sidebar() {
    const navigate = useNavigate()

    return (
        <div className="sidebar">
            <div className="container">
                <p onClick={() => navigate('/')}>Home</p>
                <p onClick={() => navigate('/#news')}>News</p>
                <p>Gallery</p>
                <p onClick={() => navigate('/renungan')}>Renungan</p>
            </div>
        </div>
    )
}