import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const AllAuctions = () => {
    const [data1, setData] = useState([])
    const now = new Date().getTime();
    const nav = useNavigate()

    useEffect(() => {
        post()
    }, [])

    async function post() {
        const post = {}
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(post)
        }

        const res = await fetch('http://localhost:4000/getAll', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        console.log(data.find)
        setData(data.find)
    }

const mapped = data1.map((x, i) =>
    <div onClick={() => nav(`/getSingle/${x._id}`)} className='postCard d-flex space-btw a-center' key={i}>
        <div className='d-flex '>
            <img src={x.picture} alt=""/>
            <div className='d-flex j-center column'>
                <div style={{fontWeight: "700"}}>{x.title}</div>
                <div>Created by: {x.user}</div>
                <div>{x.price} Eur</div>
            </div>
        </div>
        <div className='d-flex column j-center'>
           <div>End Time: {new Date(x.endTime).toLocaleTimeString('lt-LT')}</div>
            <div>Status: {x.endTime >= now ? <span style={{color: 'darkGreen'}}>Active</span> : <span style={{color: 'darkRed'}}>Not Active</span>}</div>
        </div>
    </div>
)

    return (
        <div className='d-flex column-reverse j-center a-center'>
            {mapped}
        </div>
    );
};

export default AllAuctions;
