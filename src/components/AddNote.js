import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext'


function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: " ", description: " ", tag: "default" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
    }

    return (<div >
        <div className='container mt-4'>
            <form>
                <div className="mb-3">
                    <h3>Add a note</h3>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text"  minLength={3} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text"  minLength={5} className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Tag</label>
                    <input type="text" required className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" disabled = {note.title.length < 5 || note.description.length < 5} onClick={handleClick}>ADD</button>
            </form>

        </div>
    </div>);
}

export default AddNote;
