import { BaseBoardItem } from './base-board-item';
import React from 'react';
import { getBoardStatus } from './util';
import { Player } from './board-status';

interface BaseBoardProps {
    items: BaseBoardItem[];
}

export default function BaseBoard({ items }: BaseBoardProps) {
    if (items.length !== 9) {
        return <div></div>;
    }

    const winner = getBoardStatus(items);

    return (
        <div className='base-board relative border-solid border-2 divide-white cursor-default'>
            {
                [0, 1, 2].map(i => {
                    return (<div key={`row_${i}`} className='flex flex-row'>
                        {[0, 1, 2].map(j => {
                            return (<div key={`col_${j}`}>
                                {
                                    items[j + 3*i].render()
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