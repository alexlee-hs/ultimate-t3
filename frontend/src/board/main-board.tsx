import React, { useState } from 'react';
import { Player } from './board-status';
import { getWinner } from './util';
import BigBoard from './big-board';

export interface Move {
    blockIndex: number,
    cellIndex: number
}

interface MainBoardProp {
    player: Player;
    turn: Player;
    lastMoveIndex: number;
    gameState: Player[][];
    makeMove: (move: Move) => void;
}

export default function MainBoard({player, turn, lastMoveIndex, gameState, makeMove: updateGameState }: MainBoardProp) {
    const [blockState, setBlockState] = useState(gameState.map(block => getWinner(block)));

    const allowedBlocks = lastMoveIndex === -1 || getWinner(gameState[lastMoveIndex]) !== Player.NONE ? [...Array(9).keys()] : [lastMoveIndex];

    function makeMove(move: Move): void {
        if (player !== turn || !allowedBlocks.includes(move.blockIndex)) {
            return;
        }
        updateGameState(move);
        const winner = getWinner(gameState[move.blockIndex]);
        if (winner !== Player.NONE) {
            blockState[move.blockIndex] = winner;
            setBlockState([...blockState]);
        }
    }

    const overallWinner = getWinner(blockState);
    const gameEnd = overallWinner !== Player.NONE;

    return (
        <div className='main-board'>
            { !gameEnd ? `Turn: ${turn}` : `Winner: ${overallWinner}` }
            <BigBoard matrix={gameState} allowedBlocks={gameEnd ? [] : allowedBlocks} makeMove={makeMove} />
        </div>
    );
}