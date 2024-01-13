import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


function NoteItems(props) {
    const { note,updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleClick = () => {
        deleteNote(note._id)
        console.log(note._id);
    }
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fas fa-trash-alt btn" onClick={handleClick}></i>
                            <i className="far fa-edit btn" data-bs-toggle="modal" onClick={()=>updateNote(note)} data-bs-target="#exampleModal"></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItems
