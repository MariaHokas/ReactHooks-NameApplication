import React, { useReducer, useEffect, useRef } from "react";
import axios from 'axios';

const initialState = {
    luokkahuoneId: '',
    luokkaNimi: ''
}

function AddReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [
                ...state,
                {
                    luokkaNimi: action.name
                }
            ];
        default:
            return state;
    }
}

export default function AddLuokka() {
    const inputRef = useRef()
    const [luokka, dispatch] = useReducer(AddReducer, initialState)

    useEffect(() => {
    axios.post('http://localhost:4000/api/luokat/add', {luokka})
    // dispatch({
    //     type: 'add',
    //     luokkaNimi: inputRef.current.value})
    .then(response => console.log(response.data))
    .catch(error => console.error('There was an error!', error))
    },[luokka])



    function handleChange(e) {
        e.preventDefault();
        dispatch({
            type: 'add',
            luokkaNimi: inputRef.current.value
        });
        inputRef.current.value = '';
    }

    return (
        <div>
            <form onSubmit={handleChange}>
                <input ref={inputRef} placeholder="Luokkahuoneen nimi" ></input>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}