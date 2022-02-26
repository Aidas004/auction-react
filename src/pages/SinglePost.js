import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";

const SinglePost = ({user, setUser, timeNow}) => {
    const {id} = useParams()
    const [data1, setData] = useState([])
    const [message, setMessage] = useState()
    const now = new Date().getTime();
    const priceRef = useRef()

    useEffect(() => {
        post()
    }, [data1])
    async function post() {
        const send = {
            id: id
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(send)
        }

        const res = await fetch(`http://localhost:4000/getSingle/${id}`, options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        setData(data.find)
    }
    async function bid() {
        const user1 = {
            money: user.money - priceRef.current.value,
            email: user.email,
            password: user.password,
            _id: user._id
        }
        if (priceRef.current.value < data1.price) {
            setMessage(`minimum bid is: ${data1.price}`)
            return console.log({message: `minimum bid is: ${data1.price}`})

        }
        if (user.money < priceRef.current.value) {
            setMessage('not enough money')
            return console.log({message: 'not enough money'})

        }
        setUser(user1)
        const send = {
            price: priceRef.current.value,
            email: user.email,
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(send)
        }

        const res = await fetch(`http://localhost:4000/bid/${id}`, options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        setData(data.find)
        }
        let mapped;
if (data1.hasOwnProperty('bids')) {

     mapped = data1.bids.map((x, i) =>
        <div className='bidCard d-flex' key={i}>
            <div>User: {x.email}</div>
            <div>Bid: {x.price} Eur</div>
        </div>)
}
if (data1.endTime === now) {
    setMessage("asdasdasd")
}


    return (
        <div className='w100 h100vh d-flex a-center j-center'>
            <div className="d-flex column postContainer">
                <div className='d-flex'>
                    <div className='flex1 d-flex j-center a-center'>
                        <img src={data1.picture} alt=""/>
                    </div>
                    <div className='flex1 d-flex j-center column'>
                        <div>{data1.title}</div>
                        <div>{data1.price} Eur</div>
                        <div>Created by: {data1.user}</div>
                        <div>End Time: {new Date(data1.endTime).toLocaleTimeString('lt-LT')}</div>
                        <div>Status: {data1.endTime >= now ? <span style={{color: 'darkGreen'}}>Active</span> : <span style={{color: 'darkRed'}}>Not Active</span>}</div>
                    </div>
                </div>
                <div className='d-flex column a-center'>
                    <div className='d-flex a-center space-around w100'>
                        {data1.endTime >= now && user ? <div className='mbt-20 d-flex a-center'>
                            <input ref={priceRef} type="number"/>
                            <button onClick={bid}>Bid</button>
                        </div> : null}
                        {message ? <div> {message} </div> : null}
                    </div>

                    {mapped}
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
