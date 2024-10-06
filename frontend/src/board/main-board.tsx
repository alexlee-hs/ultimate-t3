import React from 'react';
import BaseBoard from './base-board';
import { BaseBoardItem } from './base-board-item';
import BasicItem from './basic-item';
import { Player } from './board-status';
import { getBoardStatus } from './util';

interface MainBoardProp {
    player: Player;
    turn: Player;
    lastMoveIndex: number;
    gameState: Player[][];
    updateGameState: (gameState: Player[][], index: number) => void;
}

export default function MainBoard({ player, turn, lastMoveIndex, gameState, updateGameState }: MainBoardProp) {

    function getBlock(vals: Player[], blockIndex: number): BaseBoardItem {
        const blockItems: BaseBoardItem[] = [];
        for (let i= 0; i < 9; i++) {
            blockItems.push({
                render: () => BasicItem(vals[i], () => onClickItem(blockIndex, i)),
                getValue: () => vals[i],
            });
        };
        return {
            render: () => <BaseBoard items={blockItems} highlighted={ isBlockValid(blockIndex) }/>,
            getValue: () => getBoardStatus(blockItems),
        };
    }

    function isBlockValid(blockIndex: number) {
        return (blockIndex === lastMoveIndex
                || lastMoveIndex === - 1
                || blocks[lastMoveIndex].getValue() !== Player.NONE
            )
            && blocks[blockIndex].getValue() === Player.NONE
            && getBoardStatus(blocks) === Player.NONE;
    }

    function onClickItem(blockIndex: number, index: number): void {
        if (player !== turn || gameState[blockIndex][index] !== Player.NONE) {
            return;
        }
        if (!isBlockValid(blockIndex)) {
            return;
        }
        gameState[blockIndex][index] = player;
        updateGameState([...gameState], index);
    }

    let blocks: BaseBoardItem[] = [];

    for (let i = 0; i < 9; i++) {
        blocks.push(getBlock(gameState[i], i));
    };

    return (
        <div className='main-board'>
            { getBoardStatus(blocks) === Player.NONE ? `Turn: ${turn}` : `Winner: ${getBoardStatus(blocks)}` }
            <BaseBoard items={blocks} highlighted={false} />
        </div>
    );
}