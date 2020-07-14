import React, {useReducer} from 'react'
import { AlertContext } from './AlertContext'
import { AlertReducer } from './AlertReducer'
import { SHOW, HIDE } from '../types'

export const AlertState = ({children}) => {

    const [state, dispatch] = useReducer(AlertReducer, {visible: false})

    const show = (text, type = 'warning') => {
        dispatch({
            type: SHOW,
            payload: {text, type}
        })
        setTimeout(() => hide(), 4000)
    }

    const hide = () => {
        dispatch({
            type: HIDE
        })
    }

    return (
        <AlertContext.Provider value={{
            alert: state, show, hide
        }}>
            {children}
        </AlertContext.Provider>
    )
}