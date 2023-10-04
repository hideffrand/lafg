import '../index.css'
import { Navigate, useNavigate, useParams } from "react-router-dom"
import PageHelmet from "../SEO/PageHelmet"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import Loader from '../components/Loader';

export default function DetailRenungan() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const dbRenungan = import.meta.env.VITE_REACT_RENUNGAN_DBNAME
    const { id, index } = useParams()
    const [details, setDetails] = useState([])

    async function getDetailRenungan() {
        setLoading(true)
        const res = await getDoc(doc(db, dbRenungan, id));
        if (res.exists()) {
            setDetails(res.data())
            setLoading(false)
        } else {
            <Navigate to='*' />
            console.log("No such document!");
        }
    }
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getDetailRenungan()
    }, [])

    return (
        <>  
            {/* <Helmet>
                <title>COba</title>
            </Helmet> */}
            {/* <PageHelmet title={details.title} desc={'Renungan Pagi Hari'} type={'article'} setName={'Solafide Generation'} /> */}
            {loading && <Loader />}
            <Navbar />
            <div className="detailRenungan">
                <div className="container">
                    <h1>{details.title}</h1>
                    <p id='verse'>{details.verse}</p>
                    <br />
                    <p id='content'>{details.content}</p>
                    <br />
                    <p>{details.author}</p>
                    <p>{details.postedAt}</p>
                    <span>
                        <span></span>
                        <div className="buttons">
                            <button><ion-icon name="heart-outline"></ion-icon></button>
                            <div className="shareContainer">
                                <button></button>
                            </div>
                        </div>
                    </span>
                    {/* <button onClick={() => navigate(`/renungan/${}/${index + 1}`)}>Next</button> */}
                </div>
            </div>
            <Footer />
        </>
    )
}