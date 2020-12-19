import React, { useReducer } from "react";

//import ACTIONS from './Actions';

const ACTIONS = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
}

export default function Count() {
    const [count, dispatch] = useReducer((state, action) => {
        switch (action) {
            case ACTIONS.INCREMENT:
                return state + 1;
            case ACTIONS.DECREMENT:
                return state - 1;
            default:
                return state;
        }
    }, 0);

    return (
        <>
        <h2>Count</h2>
            <div>{count}
                <br />
                <button onClick={() => dispatch(ACTIONS.INCREMENT)}>+</button>
                <button onClick={() => dispatch(ACTIONS.DECREMENT)}>-</button>
            </div>
        </>
    )
}