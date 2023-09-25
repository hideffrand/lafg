import '../index.css'
import logoLafg from '../assets/logolafg.jpg'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    return (
        <nav>
            <section>
                <img src={logoLafg} alt="LA(F)-G" id='logolafg' />
                <p>La(F)-G</p>
            </section>
            <div className="navLinks">
                <a href="">Jadwal</a>
                <a href="#news">News</a>
                <a href="">Gallery</a>
                <a href="" onClick={() => navigate("/renungan")}>Renungan</a>
                <a href="">Info</a>
            </div>
        </nav>
    )
}