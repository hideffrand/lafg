import '../index.css'
import { v4 as uuid } from 'uuid'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit() {
        if (username == import.meta.env.VITE_REACT_USERNAME && password == import.meta.env.VITE_REACT_PASSWORD) {
            let newToken = uuid()
            localStorage.setItem('token', newToken)
            navigate('/dashboard')
        }
    }
    
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