import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase'
import '../index.css'

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
        setListRenungan(listData)
    }

    useEffect(() => {
        getRenungan()
    }, [])

    return (
        <div className="renungan">
            {listRenungan?.map((item, i) => (
                <div className="" key={i}>
                    <p onClick={() => navigate(`/renungan/${item.docId}`)}>{item.data.postedAt}</p>
                    
                </div>
            ))}
        </div>
    )
}