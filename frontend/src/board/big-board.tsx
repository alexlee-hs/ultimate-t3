import clsx from "clsx";
import { Player } from "./board-status";
import React from 'react';
import SmallBoard from "./small-board";
import { Move } from "./main-board";

interface BigBoardProps {
    matrix: Player[][],
    allowedBlocks: number[],
    makeMove: (move: Move) => void,
};

export default function BigBoard({ matrix, allowedBlocks, makeMove }: BigBoardProps) {

    return (
        <div className={clsx(
            'base-board relative border-solid border-2 divide-white cursor-default',
        )}>
            {
                [0, 1, 2].map(i => {
                    return (<div key={`row_${i}`} className='flex flex-row'>
                        {[0, 1, 2].map(j => {
                            const blockIndex = j + 3*i;
                            return (<div key={`col_${j}`}>
                                {
                                    <SmallBoard
                                        matrix = {matrix[blockIndex]}
                                        allowed = { allowedBlocks.includes(blockIndex) }
                                        makeMove={ (cell) => makeMove({ blockIndex: blockIndex, cellIndex: cell }) }
                                    />
                                }
                            </div>)
                        })}
                    </div>)
                })
            }
        </div>
    );
}