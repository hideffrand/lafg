import '../index.css'
import logo from '../assets/logolafg.jpg'

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <span>
                    <img src={logo} alt="logo lafg" />
                    <p>Solafide Generation @ 2023 | All Rights Reserved</p>
                </span>
                <span>
                    <a href=""><ion-icon name="logo-instagram"></ion-icon></a>
                </span>
            </div>
        </footer>
    )
}