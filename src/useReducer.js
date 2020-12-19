import React, { useReducer } from 'react';
import { login } from './utils';
import './App.css';

function loginReducer(state, action) {
    switch (action.type) {
        case 'field': {
          return {
            ...state,
            [action.fieldName]: action.payload,
          };
        }
        case 'login': {
            return {
                ...state,
                error: '',
                isLoading: true,
            };
        }
        case 'success': {
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
            };
        }
        case 'error': {
            return{
            ...state,
            error: 'Incorrect username or password',
            isLoggedIn: false,
            isLoading: false,
            username: '',
            password: '',
        }
        }
        case 'logOut': {
            return {
                ...state,
                isLoggedIn: false,
            };
        }
        default:
            return state;
    }
}

const initialState = {
    username: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
};

export default function LoginUserReducer() {
    const [state, userDispatch] = useReducer(loginReducer, initialState);
    const { username, password, isLoading, isLoggedIn, error } = state;

    const onSubmit = async (e) => {
        e.preventDefault();

        userDispatch({ type: 'login' });
        try {
            await login({ username, password })
            userDispatch({ type: 'success' });
        } catch (error) {
            userDispatch({ type: 'error' })
        }
    };

    return (
        <div className='App'>
        <div className='login-container'>
          {isLoggedIn ? (
            <>
              <h1>Welcome {username}!</h1>
              <button onClick={() => userDispatch({type: 'logOut'})}>Log Out</button>
            </>
          ) : (
            <form className='form' onSubmit={onSubmit}>
              {error && <p className='error'>{error}</p>}
              <h2>Please Login!</h2>
              <input
                type='text'
                placeholder='username'
                value={username}
                onChange={(e) => userDispatch({
                    type: 'field',
                    fieldName: 'username',
                    payload: e.currentTarget.value})}
              />
              <input
                type='password'
                placeholder='password'
                autoComplete='new-password'
                value={password}
                onChange={(e) => userDispatch({
                    type: 'field',
                    fieldName: 'password',
                    payload: e.currentTarget.value})}
              />
              <button className='submit' type='submit' disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          )}      
        </div>
      </div>
    );
}

