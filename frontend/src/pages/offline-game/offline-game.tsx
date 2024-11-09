import React from 'react';
import { Player } from '../../board/board-status';
import MainBoard, { Move } from '../../board/main-board';

export default function OfflineGame() {
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

  function updateGameState(move: Move) {
    gameState[move.blockIndex][move.cellIndex] = player;
    setPlayer(player === Player.O ? Player.X : Player.O);
    setLastMoveIndex(move.cellIndex);
    setGameState(gameState);
  }

  return (<MainBoard
    player={player}
    turn={player}
    lastMoveIndex={lastMoveIndex}
    gameState={gameState}
    makeMove={(move) => updateGameState(move)}
  />);
}