import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";

const LoginPage = ({setUser}) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    async function login () {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(user)
        }

        const res = await fetch('http://localhost:4000/login', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        setUser(data.userSession)
        navigate('/create')

    }

    return (
        <div className='h100vh w100 registration d-flex'>
            <div className="card d-flex column j-center a-center">
                <div>Log in to your account</div>
                <input ref={emailRef} placeholder='Email' type="text"/>
                <input ref={passwordRef} placeholder='Password' type="text"/>
                <button onClick={login}>Login</button>
            </div>

        </div>
    );
};

export default LoginPage;
