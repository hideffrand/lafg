import GoogleMaps from '../components/Maps'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../config/firebase'
import '../index.css'
import { useEffect, useState } from 'react';
import ImgSkeleton from '../components/ImgSkeleton';

export default function Homepage() {
    const [newsData, setNewsData] = useState({})
    const [loadingImage, setLoadingImage] = useState(false)
    function getNews() {
        onSnapshot(doc(db, "news", "frontpage-news"), (doc) => {
            setNewsData(doc.data())
            setLoadingImage(false)
            // setTimeout(() => {
            //     setLoadingImage(false)
            // }, 800);
        })
    }
    
    useEffect(() => {
        setLoadingImage(true)
        getNews()
    }, [])

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
                    </div>
                    <div className="poster">
                        {
                            loadingImage ? <ImgSkeleton /> :
                            <img src={newsData.img} alt="Poster kegiatan | Sabtu 18:00 WIB di GKIN Hosana, Malang." />
                        }
                    </div>
                    <div className="text" id='text2'>
                        <h1>On This Weekend!</h1>
                        <p>{newsData.dateTime}</p>
                        <br />
                        <a href="#maps" className='primaryButton'>Lokasi</a>
                    </div>
                </div>
            </div>
            <div className="highlight">
                <h1>Highlihts</h1>
            </div>
            <GoogleMaps />
        </>
    )
}