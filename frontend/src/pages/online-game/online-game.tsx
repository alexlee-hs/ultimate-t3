import React, { useEffect } from 'react'
// post-match game display

// 'updateGameState' sends payload to server
// payload from server triggers 'setGameState' to render new game state

// pass in websocket connection from matching?

// TODO
export default function OnlineGame() {
    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8000/ws');
        websocket.onopen = () => {
            console.log('open socket');
        };
    }, [])

    return (<div></div>);
}