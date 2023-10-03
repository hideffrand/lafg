import '../index.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Navbar() {
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <>
            {showSidebar && <Sidebar />}
            <nav style={{backgroundColor: showSidebar ? 'white' : 'transparent'}}>
                <img src="https://i.ibb.co/vzBMgtG/logolafg-min.webp" alt="LA(F)-G" id='logolafg' onClick={() => navigate('/')}/>
                <div className="hamburger" onClick={() => setShowSidebar(!showSidebar)}>
                    <ion-icon id="icon" name={showSidebar ? 'close-outline' : 'menu-outline'} style={{color: showSidebar ? 'black' : 'white'}}></ion-icon>
                </div>
                <div className="navLinks">
                    <button className='primaryButton' onClick={() => navigate("/")}>Home</button>
                    <button className='primaryButton' onClick={() => navigate("/#news")}>News</button>
                    <button className='primaryButton' onClick={() => navigate("/")}>Gallery</button>
                    <button className='primaryButton' onClick={() => navigate("/renungan")}>Renungan</button>
                </div>
            </nav>
        </>
    )
}