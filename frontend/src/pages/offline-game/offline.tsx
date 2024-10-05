import React from 'react';
import { Player } from '../../board/board-status';
import MainBoard from '../../board/main-board';

export default function Offline() {
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
  const [player, setPlayer] = React.useState<Player>(Player.O);
  const [lastMoveIndex, setLastMoveIndex] = React.useState<number>(-1);

  function updateGameState(newState: Player[][], index: number) {
    setPlayer(player === Player.O ? Player.X : Player.O);
    setLastMoveIndex(index);
    setGameState(newState);
  }

  return (<MainBoard
    player={player}
    turn={player}
    lastMoveIndex={lastMoveIndex}
    gameState={gameState}
    updateGameState={(gameState, index) => updateGameState(gameState, index)}
  />);
}