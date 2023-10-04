import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase'
import '../index.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

export default function Renungan() {
    const navigate = useNavigate()
    const dbRenungan = import.meta.env.VITE_REACT_RENUNGAN_DBNAME
    const [randomIndex, setRandomIndex] = useState(0)
    const [listRenungan, setListRenungan] = useState([])
    const [listMannaSurgawi, setListMannaSurgawi] = useState([])
    const [listLentera, setListLentera] = useState([])
    const [listSapaku, setListSapaku] = useState([])
    
    async function getRenungan() {
        let listData = [];
        const querySnapshot = await getDocs(collection(db, dbRenungan));
        querySnapshot.forEach((doc) => {
            listData.push({
                docId: doc.id,
                data: doc.data()
            })
        });
        return listData
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * (max - 0) + 0)
    }

    async function getSpecificSeries(series) {
        const q = query(collection(db, import.meta.env.VITE_REACT_RENUNGAN_DBNAME), where("series", "==", series), limit(3));
        let listData = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            listData.push({
                docId: doc.id,
                data: doc.data(),
            })
        });
        return listData
    }

    useEffect(() => {
        getRenungan().then((res) => setListRenungan(res))
        setRandomIndex(getRandomInt(listRenungan.length))
        getSpecificSeries('Sapaku (Sarapan Pagiku)').then((res) => setListSapaku(res))
        getSpecificSeries('Manna Surgawi').then((res) => setListMannaSurgawi(res))
        getSpecificSeries('Lentera Jiwa').then((res) => setListLentera(res))
    }, [])

    return (
        <>
            <Navbar initColor="black" />
            <div className="renungan">
                <header>
                    <h1><span>Renungan</span> Harian</h1>
                </header>
                <div className="container">
                    <div className="leftSection">
                        <h1>Pilihan hari ini</h1>
                        <div className="card">
                            <h4>{listRenungan[randomIndex]?.data.title}</h4>
                            <p>Oleh: {listRenungan[randomIndex]?.data.author}</p>
                            <br />
                            <p className='content'>{listRenungan[randomIndex]?.data.content}</p>
                            <button className='primaryButton' onClick={() => navigate(`/renungan/${listRenungan[randomIndex].docId}/${randomIndex}`)}>Baca</button>
                        </div>
                    </div>
                    <div className="rightSection">
                        <div className="container" id='seriesChoose'>
                            <p>Series: </p> 
                            <button className='secondaryButton'>Manna Surgawi</button>
                            <button className='secondaryButton'>Lentera Jiwa</button>
                            <button className='secondaryButton'>Sapaku (Sarapan Pagiku)</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}