import { useNavigate } from 'react-router-dom'
import '../index.css'

export default function Sidebar() {
    const navigate = useNavigate()

    return (
        <div className="sidebar">
            <div className="container">
                <p className="primaryButton" onClick={() => navigate('/')}>Home</p>
                <p className="primaryButton" onClick={() => navigate('/#news')}>News</p>
                <p className="primaryButton">Gallery</p>
                <p className="primaryButton" onClick={() => navigate('/renungan')}>Renungan</p>
            </div>
        </div>
    )
}