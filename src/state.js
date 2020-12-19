import React, { useState } from 'react'
import './App.css';
import { login } from './utils'

export default function LogingUseState() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, showLoader] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        setError('');
        showLoader(true);
        try {
            await login({ username, password});
            setIsLoggedIn(true);
            showLoader(false); 
            setPassword('');
            setUsername('');

        } catch (error) {
            setError('Incorrect username or passwprd!');
            showLoader(false);
            setUsername('');
            setPassword('');
        }
    };
    return (
        <div className='App'>
          <div className='login-container'>
            {isLoggedIn ? (
              <>
                <h1>Welcome {username}!</h1>
                <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
              </>
            ) : (
              <form className='form' onSubmit={onSubmit}>
                {error && <p className='error'>{error}</p>}
                <h2>Please Login!</h2>
                <input
                  type='text'
                  placeholder='username'
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <input
                  type='password'
                  placeholder='password'
                  autoComplete='new-password'
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
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