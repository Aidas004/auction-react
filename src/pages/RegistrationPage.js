import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordTwoRef = useRef()
    const [error, setError] = useState()
    const navigate = useNavigate()



    async function register () {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordTwo: passwordTwoRef.current.value,

        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }

        const res = await fetch('http://localhost:4000/register', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        console.log(data)
        setError(data.message)
        if (data.message === "user registered successful") {
            navigate('/login')
        }
    }


    return (
        <div className='h100vh w100 registration d-flex'>
            <div className="card d-flex column j-center a-center">
                <div>Register new account</div>
                <input ref={emailRef} placeholder='Email' type="text"/>
                <input ref={passwordRef} placeholder='Password' type="text"/>
                <input ref={passwordTwoRef} placeholder='Password Two' type="text"/>
                <button onClick={register}>Register</button>
                {error ? <div style={{color: 'red', fontSize: '12px'}}>* {error}</div> : null}
            </div>

        </div>
    );
};

export default RegistrationPage;
