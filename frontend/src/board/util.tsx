import { BaseBoardItem } from './base-board-item';
import { Player, WinCombinations } from './board-status';

export function getBoardStatus(items: BaseBoardItem[]): Player {
    const finished = WinCombinations.find(combination => {
        return matches(combination.map(ind => items[ind].getValue()));
    });
    if (finished === undefined) {
        return Player.NONE;
    }
    return items[finished[0]].getValue();
}

function matches(arr: Player[]) {
    return arr[0] !== Player.NONE && arr.length > 0 && arr.every(val => val === arr[0]);
}