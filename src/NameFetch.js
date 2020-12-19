import React, { useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import NamesBasic from './NamesBasic';
import { ACTIONS } from './Actions';
import './App.css'

const initialState = {
    loading: true,
    error: '',
    names: [],
}
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_INIT:
            return {
                ...state,
                loading: true,

            }
        case ACTIONS.FETCH_SUCCESS:
            return {
                loading: false,
                names: action.payload,
                error: ''
            }
            case ACTIONS.FETCH_JAR_SUCCESS:
                return{
                    loading: false,
                    mostpopular: action.payload,
                    error: '',
                }
        case ACTIONS.FETCH_ERROR:
            return {
                loading: false,
                names: [],
                error: 'something went wrong...'
            }
        default:
            return state
    }
}

export default function NameFetch() {
    const [state, dispatch] = useReducer(dataFetchReducer, initialState)
    const { names, loading, error } = state
    const [tayty, setTayte] = useState('all')

    useEffect(() => {
        dispatch({ type: ACTIONS.FETCH_INIT })
        axios.get(`https://localhost:5001/names/${tayty}`)
            .then(response => {
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: response.data });
                console.log('response');
            })
            .catch(error => {
                console.log(error, 'message from Maria')
                dispatch({ type: ACTIONS.FETCH_ERROR })
            })
    }, [tayty])

    return (
        <div>
            <button onClick={() => setTayte('all')}>all</button>
            <button onClick={() => setTayte('mostpopular')}>mostpopular</button>
            <button onClick={() => setTayte('alphabeticalorder')}>alphabeticalorder</button>
            <button onClick={() => setTayte('takeonename')}>takeonename</button>

            <NamesBasic loading={loading} name={names} error={error} />
            {/* {testi ? <NamesBasic loading={loading} name={mostpopular} error={error} /> : null}     */}
            {/* <NamesBasic loading={loading} name={names} error={error} /> */}
            <div></div>
        </div>
    );
}