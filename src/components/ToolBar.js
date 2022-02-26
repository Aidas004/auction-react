import React from 'react';
import {  useNavigate } from "react-router-dom";

const ToolBar = ({user, timeNow}) => {
    const navigate = useNavigate()
    return (
        <div className='toolbar d-flex'>
            {!user ?
                <div className='d-flex w100 space-btw'>
                    <div className='d-flex'>
                        <div onClick={() => navigate('/register')} className='btn'>Registration</div>
                        <div onClick={() => navigate('/login')} className='btn'>Login</div>
                    </div>
                    <div>
                        {timeNow}
                    </div>

                </div> :

                <div className='d-flex w100 space-btw'>
                    <div className='d-flex'>
                        <div onClick={() => navigate('/')} className='btn'>All Auctions</div>
                        <div onClick={() => navigate('/create')} className='btn'>New Auction</div>
                        <div onClick={() => navigate('/login')} className='btn'>My stats</div>
                    </div>
                    <div className='d-flex'>
                        {user ? <div className='mr-20'>Money: {user.money}</div> : null}
                        {timeNow}
                    </div>
                </div>
                    }

        </div>
    );
};

export default ToolBar;
