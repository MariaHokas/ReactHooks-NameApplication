import React, { useReducer, useRef } from "react";

export default function ShoppingList() {
    const inputRef = useRef()
    const [items, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'add':
                return [
                    ...state,
                    {
                        id: state.length,
                        name: action.name
                    }
                ];
            case 'delete':
                return state.filter((_, index) => index !== action.index);
            case 'clear':
                return [];
            default:
                return state;
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: 'add',
            name: inputRef.current.value
        });
        inputRef.current.value = '';
    }
    return (
        <>
        <h2>Shopping List</h2>
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} />
            </form>
            {/* if you put clear to inside of the form it will clear the screen after every enter */}
            <button onClick={() => dispatch({ type: 'clear' })} >Clear</button>
            <ul>
                {items.map((item, index) => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => dispatch({ type: 'delete', index })} >Delete Item</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

