import React from 'react';
import { Player } from './board-status';

interface BasicItemProp {
    val: Player,
    clickListener: () => void,
}


export default function BasicItem({ val, clickListener }: BasicItemProp) {
    function clickFn () {
        if (val === Player.NONE) {
            clickListener();
        }
    }
    
    return (
        <div onClick={clickFn} className='w-12 h-12 border border-slate'>
            {val}
        </div>
    );
}