import React from 'react'

export const CTX = React.createContext();

const initState = {
    messgaes: [{"jiayi": "hello"}, {"jiayi2": "what?"}]
}

function reducer(state, action){
    const {user, msg} = action.payload;
    switch(action.type){
        case "RECEIVE_MESSAGE":
            return(
                [...state, {user:msg}]
            )
        default:
            return state
    }
}

export default function Store (props){

    const reducerHook = React.useReducer(reducer, initState);

    return(
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}