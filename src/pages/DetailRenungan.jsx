import '../index.css'
import { useNavigate, useParams } from "react-router-dom"
import PageHelmet from "../SEO/PageHelmet"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import Loader from '../components/Loader';

export default function DetailRenungan() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const dbRenungan = import.meta.env.VITE_REACT_RENUNGAN_DBNAME
    const { id } = useParams()
    const [details, setDetails] = useState([])
    const [metaProps, setMetaProps] = useState({})

    async function getDetailRenungan() {
        setLoading(true)
        const res = await getDoc(doc(db, dbRenungan, id));
        if (res.exists()) {
            setDetails(res.data())
            setLoading(false)
        } else {
            navigate("*")
            console.log("No such document!");
        }
    }
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getDetailRenungan()
        setMetaProps({
            title: details.title,
            author: `${details.author}, hideffrand`,
            desc: `${details.verse} | ${details.content?.slice(0, 100)}...`,
            url: `https://www.lafg.online/renungan/${id}`
        })
    }, [])

    return (
      <>  
        <PageHelmet
            title={metaProps.title}
            author={metaProps.author}
            desc={metaProps.desc}
            url={metaProps.url}
        />
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
              <button className='primaryButton' onClick={() => history.back()}>Back</button>
            </span>
            <br />
            <h2>Lainnya</h2>
          </div>
        </div>
        <Footer />
      </>
    )
}