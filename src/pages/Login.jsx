import '../index.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit() {
        if (username == import.meta.env.VITE_REACT_USERNAME && password == import.meta.env.VITE_REACT_PASSWORD) {
            localStorage.setItem('user-token', 'asdfghjkl')
            console.log('token', localStorage.getItem('user-token'))
            navigate('/dashboard')
        }
    }
    
    useEffect(() => {
        console.log('token', localStorage.getItem('cobatoken'))
    }, [])
    return (
        <div className="login">
            <form action="" >
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => handleSubmit()}>Login</button>
            </form>
        </div>
    )
}