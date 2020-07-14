import React, { useReducer, useState, useEffect } from 'react';
import FirebaseContext from './FirebaseContext';
import { FirebaseReducer } from './FirebaseReducer';
import { REMOVE_NOTES, ADD_NOTE, FETCH_NOTES } from '../types';
import axios from 'axios';

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children, history}) => {

    const initialState = {
        notes: []
    }

    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    const [value, setValue] = useState({})
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        setDisabled(true)
    }, [disabled])

    const fetchNotes = async () => {
        const res = await axios.get(`${url}/cards.json`)
        if (res.data === null) {
            return
        } else {
        const payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key], 
                    id: key  
                }
            })

            dispatch({
                type: FETCH_NOTES,
                payload
            })
        }    
    }  

    const addNote = async (note) => {
        try {
            const res = await axios.post(`${url}/cards.json`, note)
            const payload = {
                ...note,
                id: res.data.name
            }
            dispatch({
                type: ADD_NOTE,
                payload
            })
        } catch (e) {
            throw new Error(e.message)
        }
        note.history.push("/list")
    }

    const removeNote = async id => {
        await axios.delete(`${url}/cards/${id}.json`)

        dispatch({
            type: REMOVE_NOTES,
            payload: id
        })
    }

    
    const updateNote = async (note, id) => {
        await axios.patch(`${url}/cards/${id}.json`, note)
        setDisabled(false)
        note.history.push('/list')
    }

    const currentEditNote = currentNote => {
        setValue(currentNote)
    }

    return (
        <FirebaseContext.Provider value={{ 
            addNote, removeNote, fetchNotes, notes: state.notes, value, setValue, currentEditNote, updateNote, disabled
        }}>
          {children}
        </FirebaseContext.Provider>
      )
}