import React from 'react';
import { Player } from '../../board/board-status';
import MainBoard, { Move } from '../../board/main-board';
import { getWinner } from '../../board/util';

export default function CpuGame() {
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
  const player = Player.O;
  const [lastMoveIndex, setLastMoveIndex] = React.useState<number>(-1);

  function updateGameState(move: Move) {
    // have CPU make move
    gameState[move.blockIndex][move.cellIndex] = player;
    const randomMoveIndex = makeNextRandomMove(gameState, move.cellIndex);

    setLastMoveIndex(randomMoveIndex);
    setGameState(gameState);
  }

  function makeNextRandomMove(newState: Player[][], blockIndex: number): number {
    let block: Player[] = newState[blockIndex];

    if (getWinner(block) !== Player.NONE) {
      const possibleBlocks = newState.filter(b => getWinner(b) === Player.NONE);
      block = chooseRandom(possibleBlocks);
    }

    const possible = block
      .map((val, index) => val === Player.NONE ? index : undefined)
      .filter(val => val !== undefined);
    const selected = chooseRandom(possible)!;
    block[selected] = Player.X;
    return selected;
  }

  function chooseRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random()*arr.length)];
  }

  return (<MainBoard
    player={player}
    turn={player}
    lastMoveIndex={lastMoveIndex}
    gameState={gameState}
    makeMove={(move) => updateGameState(move)}
  />);
}