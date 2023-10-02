import '../index.css'
import logoLafg from '../assets/logolafg.jpg'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    return (
        <nav>
            <section onClick={() => navigate('/')}>
                <img src={logoLafg} alt="LA(F)-G" id='logolafg' />
                <h1>La(F)-G</h1>
            </section>
            <div className="navLinks">
                <a href="#news">News</a>
                <a href="">Gallery</a>
                <a href="" onClick={() => navigate("/renungan")}>Renungan</a>
            </div>
        </nav>
    )
}