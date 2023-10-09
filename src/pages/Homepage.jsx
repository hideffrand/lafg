import GoogleMaps from '../components/Maps'
import '../index.css'

export default function Homepage() {
    return (
        <>
            <div className="homepage">
                <div className="container">
                    <h1>Bertumbuh dalam <span>iman</span> bersama kami.</h1>
                </div>
            </div>
            <div className="news" id='news'>
                <div className="container">
                    <div className="text">
                        <h1>Join us!</h1>
                        <br />
                        <p>
                            Yuk, bangun iman kamu dan bertumbuh menjadi generasi Kristus bersama kami setiap hari Sabtu 18:00 WIB di 
                            GKIN Hosana, Malang.
                        </p>
                        <br />
                        <a href="#maps" className='primaryButton'>Lokasi</a>
                    </div>
                    <div className="poster">
                        <img src="https://i.ibb.co/G9HpbCg/LOOK-BEYOND-4.png" alt="Poster kegiatan | Sabtu 18:00 WIB di GKIN Hosana, Malang." />
                    </div>
                    <div className="text" id='text2'>
                        <h1>Join us!</h1>
                        <br />
                        <p>
                            Yuk, bangun iman kamu dan bertumbuh menjadi generasi Kristus bersama kami setiap hari Sabtu 18:00 WIB di 
                            GKIN Hosana, Malang.
                        </p>
                        <br />
                        <a href="#maps" className='primaryButton'>Lokasi</a>
                    </div>
                </div>
            </div>
            <div className="highlight">
                <h1>Hihglihts</h1>
            </div>
            <GoogleMaps />
        </>
    )
}