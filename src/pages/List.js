import React, {useContext, useEffect} from 'react'
import FirebaseContext from '../context/firebase/FirebaseContext'
import { Items } from '../components/Items'

const List = function() {

    const { notes, fetchNotes, removeNote, currentEditNote } = useContext(FirebaseContext)

    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="row row-cols-1 row-cols-md-3 card-group">
            {notes.map(note => {
                return <Items note={note} key={note.id} onRemove={removeNote} onEdit={currentEditNote} />
            })}
        </div>
    )
}

export default List