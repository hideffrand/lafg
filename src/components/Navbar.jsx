import '../index.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'

export default function Navbar() {
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false)
    const [showNavbar, setShowNavbar] = useState(false)
    
    const handleNavbar = () => {
        if (window.scrollY > 200) {
            setShowNavbar(true)
        } else {
            setShowNavbar(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleNavbar);
        return () => {
            window.removeEventListener('scroll', handleNavbar);
        }
    }, []);

    return (
        <>
            {showSidebar && <Sidebar />}
            <nav style={{
                backgroundColor: showSidebar ? 'white' : 'transparent',
                transform: showNavbar ? 'translateY(-12vh)' : 'translateY(0vh)',
            }}>
                <img src="https://i.ibb.co/vzBMgtG/logolafg-min.webp" alt="LA(F)-G" id='logolafg' onClick={() => navigate('/')}/>
                <div className="hamburger" onClick={() => setShowSidebar(!showSidebar)}>
                    <ion-icon id="icon" name={showSidebar ? 'close-outline' : 'menu-outline'} ></ion-icon>
                </div>
                <div className="navLinks">
                    <button onClick={() => navigate("/")}>Home</button>
                    <a href="#news" >News</a>
                    <button onClick={() => navigate("/renungan")}>Renungan</button>
                    <button onClick={() => navigate("/")}>About us</button>
                </div>
            </nav>
        </>
    )
}