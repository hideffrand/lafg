import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase'
import '../index.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

export default function Renungan() {
    const navigate = useNavigate()
    const dbRenungan = import.meta.env.VITE_REACT_RENUNGAN_DBNAME
    const [listRenungan, setListRenungan] = useState([])
    
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

    useEffect(() => {
        getRenungan()
            .then((res) => setListRenungan(res))
            
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
                        <p>{listRenungan[getRandomInt(listRenungan.length)]?.data.postedAt}</p>
                    </div>
                    <div className="rightSection">
                        {listRenungan?.map((item, i) => (
                            <div className="" key={i}>
                                <p onClick={() => navigate(`/renungan/${item.docId}`)}>{item.data.postedAt}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}