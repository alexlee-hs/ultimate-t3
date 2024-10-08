import React, { useEffect } from 'react'
import OnlineGame from '../online-game';
import { Player } from '../../../board/board-status';
import MainBoard from '../../../board/main-board';
// post-match game display

// 'updateGameState' sends payload to server
// payload from server triggers 'setGameState' to render new game state

// pass in websocket connection from matching?

// TODO
export default function RandomMatching() {
    const [websocket, setWebsocket] = React.useState<WebSocket>(null);
    const vals: number[][] = [];
    for (let i = 0; i < 9; i++) {
        // vals.push([...Array(9)].map(() => Math.floor(Math.random()*3)));
        vals.push([...Array(9)].map(() => 0));
    }
    function convertToBoardStatusMatrix(matrix: number[][]) {
        return matrix.map(row => {
        return row.map(val => {
            switch (val) {
            case 0:
                return Player.NONE;
            case 1:
                return Player.O;
            default:
                return Player.X;
            }
        });
        });
    }

    const [gameState, setGameState] = React.useState<Player[][]>(convertToBoardStatusMatrix(vals));
    const [gameUUID, setGameUUID] = React.useState<string>(null);
    const [player, setPlayer] = React.useState<Player>(null);
    const [turn, setTurn] = React.useState<Player>(Player.O);
    const [lastMoveIndex, setLastMoveIndex] = React.useState<number>(-1);
    
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws');
        ws.onopen = () => {
            console.log('open socket');
        };
        setWebsocket(ws);
    }, []);

    if (websocket?.OPEN) {
        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (gameUUID === null) {
                setGameUUID(data.gameUUID);
                setPlayer(data.player === 'O' ? Player.O : Player.X);
            } else {
                setGameState(data.gameState);
                setTurn(turn === Player.O ? Player.X : Player.O);
                setLastMoveIndex(data.index);
            }
        }
    }
    
    function sendGameState(gameState: Player[][], index: number) {
        websocket.send(JSON.stringify({ 'gameUUID': gameUUID, 'gameState': gameState, 'index': index }));
    }

    return (<div>
        {
            gameUUID === null && <h1>Matching</h1>
        }
        {
            gameUUID !== null && <h1>You are {player}</h1>
        }
        {
            gameUUID !== null && <MainBoard player={player} turn={turn} gameState={gameState} updateGameState={sendGameState} lastMoveIndex={lastMoveIndex} />
        }

    </div>);
}