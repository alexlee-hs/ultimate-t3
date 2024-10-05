import { ReactNode } from 'react';
import { Player } from './board-status';

export interface BaseBoardItem {
    render: () => ReactNode;
    getValue: () => Player;
}