import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase'
import '../index.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import CardSkeleton from '../components/CardSkeleton';

export default function Renungan() {
    const navigate = useNavigate()
    const dbRenungan = import.meta.env.VITE_REACT_RENUNGAN_DBNAME
    const [randomIndex, setRandomIndex] = useState(0)
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [listRenungan, setListRenungan] = useState([])
    const [listSapaku, setListSapaku] = useState([])
    const [listManna, setListManna] = useState([])
    const [listLentera, setListLentera] = useState([])
    const [showList, setShowList] = useState('manna')
    
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
        setShowSkeleton(true)
        const q = query(collection(db, import.meta.env.VITE_REACT_RENUNGAN_DBNAME), where("series", "==", series));
        let listData = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            listData.push({
                docId: doc.id,
                data: doc.data(),
            })
        });
        setShowSkeleton(false)
        return listData
    }

    useEffect(() => {
        getRenungan().then((res) => setListRenungan(res))
        setRandomIndex(getRandomInt(listRenungan.length))
        getSpecificSeries('Sapaku (Sarapan Pagiku)').then((res) => setListSapaku(res))
        getSpecificSeries('Manna Surgawi').then((res) => setListManna(res))
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
                        {
                            showSkeleton
                            ? 
                            <CardSkeleton />
                            :
                            <div className="card">
                                <h4>{listRenungan[randomIndex]?.data.title}</h4>
                                <p>Oleh: {listRenungan[randomIndex]?.data.author}</p>
                                <br />
                                <p className='content'>{listRenungan[randomIndex]?.data.content}</p>
                                <button className='primaryButton' onClick={() => navigate(`/renungan/${listRenungan[randomIndex].docId}`)}>Baca</button>
                            </div>
                        }
                    </div>
                    <div className="rightSection">
                        <div className="seriesChoose">
                            <p>Series: </p> 
                            <div className="buttons">
                                <button className='secondaryButton' onClick={() => setShowList('sapaku')}>Sapaku</button>
                                <button className='secondaryButton' onClick={() => setShowList('manna')}>Manna Surgawi</button>
                                <button className='secondaryButton' onClick={() => setShowList('lentera')}>Lentera Jiwa</button>
                            </div>
                        </div>
                        {showList == 'manna' &&
                            <ul>
                                <p>Manna Surgawi</p>
                                {listManna?.map((item, i) => (
                                    <li key={i} onClick={() => navigate(`/renungan/${item.docId}`)}>- {item.data.verse}, {item.data.postedAt}</li>
                                ))}
                            </ul>
                        }
                        {showList == 'sapaku' &&
                            <ul>
                                <p>Sapaku (Sarapan Pagiku)</p>
                                {listSapaku?.map((item, i) => (
                                    <li key={i} onClick={() => navigate(`/renungan/${item.docId}`)}>- {item.data.verse}, {item.data.postedAt}</li>
                                ))}
                            </ul>
                        }
                        {showList == 'lentera' &&
                            <ul>
                                <p>Lentera Jiwa</p>
                                {listLentera?.map((item, i) => (
                                    <li key={i} onClick={() => navigate(`/renungan/${item.docId}`)}>- {item.data.verse}, {item.data.postedAt}</li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}