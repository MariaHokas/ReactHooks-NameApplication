import React, { useReducer, useState } from "react";
import Todo from './Todo.js';
import { ACTIONS } from './Actions';

//import ACTIONS from './Actions';
//dev web simpllyfier
// export const ACTIONS = {
//     TODO_ADD: 'Add',
//     TODO_TOGGLE: 'TODO_TOGGLE',
//     DELETE: 'delete',
// }


function reducer(todos, action) {
    switch (action.type) {
        case ACTIONS.TODO_ADD:
        return [...todos, newTOdo(action.payload.name)]


        case ACTIONS.TODO_TOGGLE:
            return todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo
            })
        case ACTIONS.DELETE:
            return todos.filter(todo => todo.id !== action.payload.id)
        default:
            return todos;
    }
}
function newTOdo(name) {
    return { id: Date.now(), name: name, completed: false }
}



export default function NewTry() {
    const [todos, dispatch] = useReducer(reducer, [])
    const [name, setName] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        dispatch({ type: ACTIONS.TODO_ADD, payload: { name: name } })
        setName('')
    }
console.log(todos)

    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/> 
            </form>
             {todos.map(todo => { return <Todo key={todo.id} todo={todo} dispatch={dispatch} /> })}
            </div>
        </>
    )
}