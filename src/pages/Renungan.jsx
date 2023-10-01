import { useEffect } from 'react'
import '../index.css'

export default function Renungan() {
    useEffect(() => {
        console.log(import.meta.env.VITE_REACT_USERNAME)
    }, [])
    return (
        <div className="renungan">
            halo
        </div>
    )
}