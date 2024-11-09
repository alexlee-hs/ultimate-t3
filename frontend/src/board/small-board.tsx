import clsx from "clsx";
import { Player } from "./board-status";
import React from 'react';
import BasicItem from "./basic-item";
import { getWinner } from "./util";

interface SmallBoardProps {
    matrix: Player[],
    allowed: boolean,
    makeMove: (cellIndex: number) => void,
};

export default function SmallBoard({ matrix, allowed, makeMove }: SmallBoardProps) {
    const winner = getWinner(matrix);
    return (
        <div className={clsx(
            'base-board relative border-solid border-2 divide-white cursor-default',
            allowed && winner === Player.NONE ? 'bg-slate-700' : '',
            winner === Player.O ? 'bg-green-600': '',
            winner === Player.X ? 'bg-red-600': '',
        )}>
            {
                [0, 1, 2].map(i => {
                    return (<div key={`row_${i}`} className='flex flex-row'>
                        {[0, 1, 2].map(j => {
                            return (<div key={`col_${j}`}>
                                {
                                    <BasicItem val={matrix[j + 3*i]} clickListener={() => {
                                        if (winner === Player.NONE && allowed) {
                                            makeMove(j + 3*i);
                                        }
                                    }}/>
                                }
                            </div>)
                        })}
                    </div>)
                })
            }
            <div className='absolute left-0 bottom-0 text-xl opacity-50 w-full h-full pointer-events-none'>
                {
                    winner !== Player.NONE ?
                        <img className='w-full h-full' src={winner === Player.O ? '/circle.png' : '/cross.png'}/> : ''
                }
            </div>
        </div>
    );
}