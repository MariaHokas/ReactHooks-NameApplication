import React from 'react'
import './App.css'

export default function NamesBasic({name, dispatch, loading, error} ) {
    return (
        <div>
        <h2>Fetch from database tömnönönönö</h2>
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