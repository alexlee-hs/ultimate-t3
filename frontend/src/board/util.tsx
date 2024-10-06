import { BaseBoardItem } from './base-board-item';
import { Player, WinCombinations } from './board-status';

export function getBoardStatus(items: BaseBoardItem[]): Player {
    return getWinner(items.map(item => item.getValue()));
}

export function getWinner(items: Player[]): Player {
    const finished = WinCombinations.find(combination => {
        return matches(combination.map(ind => items[ind]));
    });
    if (finished === undefined) {
        return Player.NONE;
    }
    return items[finished[0]];
}

function matches(arr: Player[]) {
    return arr[0] !== Player.NONE && arr.length > 0 && arr.every(val => val === arr[0]);
}