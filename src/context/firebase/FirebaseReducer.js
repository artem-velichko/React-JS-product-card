import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTES } from "../types"

export const FirebaseReducer = (state, action) => {
    switch(action.type) {
        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }

        case FETCH_NOTES:
            return {
                ...state,
                notes: action.payload
            }

        case REMOVE_NOTES:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        default: 
            return state
    }
}
























/*
const handlers = {
    DEFAULT: state => state,
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload]
    }),
    [FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload}),
    [REMOVE_NOTES]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    })
}

export const FirebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    handle(state, action)
}
*/