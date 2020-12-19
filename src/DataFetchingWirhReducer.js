import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const initialState = {
    loading: true,
    error: '',
    name: []
}
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                name: action.payload,
                error: ''
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                name: [],
                error: 'something went wrong...'
            }
        default:
            return state
    }
}

export default function DataFetching() {
    const [state, dispatch] = useReducer(dataFetchReducer, initialState)
    const { name, loading, error } = state

    useEffect(() => {
        dispatch({ type: 'FETCH_INIT' })
        axios.get('https://localhost:5001/names')
            .then(response => {
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
                console.log('response');
            })
            .catch(error => {
                console.log(error, 'message from Maria')
                dispatch({ type: 'FETCH_ERROR' })
            })
    },[dispatch])
    return (
        <div>
        <h2>Fetch from database</h2>
            {loading ? 'loading ' : 
            <table>
                <tbody>
                {name.map(luokka =>
                    <tr key={luokka.nameGuid}>
                        <td>{luokka.name1}</td>
                        <td>{luokka.amount}</td>
                    </tr>)}
                    </tbody>
            </table>}

            {error ? error : null}
        </div>
    );
}