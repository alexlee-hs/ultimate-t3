import React from 'react';
import { Player } from './board-status';



export default function BasicItem(val: Player, clickListener: () => void) {
    return (<div onClick={() => clickListener()} className='w-12 h-12 border border-slate'>{val}</div>);
}