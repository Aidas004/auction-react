import React, {useRef, useState} from 'react';

const CreateAuction = () => {


    const [time, setTime] = useState()
    const titleRef = useRef()
    const pictureRef = useRef()
    const priceRef = useRef()
    function set (e) {
        const now = new Date().getTime();
        if (e === '1 min') {
            setTime(now + 60000)
        }
        if (e === '5 min') {
            setTime(now + 300000)
        }
        if (e === '10 min') {
            setTime(now + 600000)
        }
        if (e === '1 hour') {
            setTime(now + 3600000)
        }

    }
    async function post() {
        const post = {
            title: titleRef.current.value,
            price: priceRef.current.value,
            picture: pictureRef.current.value,
            endTime: time,
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(post)
        }

        const res = await fetch('http://localhost:4000/create', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        console.log(data)
    }

    return (
        <div className='registration h100vh w100 d-flex'>
            <div className="card d-flex column j-center a-center">
                <div>Create New Auction</div>
                <input ref={titleRef} placeholder='Title' type="text"/>
                <input ref={pictureRef} placeholder='Image Link' type="text"/>
                <input ref={priceRef} placeholder='Start Price' type="number"/>
                <select id="myList" onChange={event => set(event.target.value)}>
                    <option> End Time</option>
                    <option> 1 min</option>
                    <option> 5 min</option>
                    <option> 10 min</option>
                    <option> 1 hour</option>
                </select>
                <button onClick={post}>Create</button>
            </div>

        </div>
    );
};

export default CreateAuction;
