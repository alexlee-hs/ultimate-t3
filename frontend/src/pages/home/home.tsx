import React from 'react';
import { useNavigate } from 'react-router';

interface HomeProp {
    toOffline: () => void;
}

export default function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>ULTIMATE TICTACTOE</h1>
            
            <button className='bg-black border-2 rounded-lg p-5 my-5' onClick={() => navigate('/offline')}>
                Offline 1v1
            </button>
        </div>
    );
}