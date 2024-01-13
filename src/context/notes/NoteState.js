import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)


    const authToken = localStorage.getItem('Auth-token');

    const getNotes = async ()=>{
        const url = `${host}/api/notes/fetchnotes`
        const response = await fetch(url, {

            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': `${authToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" 
        });
        const json = await response.json()
        console.log(json);
        setNotes(json)
    }

    const addNote = async (title, description, tag) => {
        const url = `${host}/api/notes/addnotes`
        const response = await fetch(url, {

            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': `${authToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deletenotes/${id}`;
        await fetch(url,{
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': `${authToken}`
            },     
        });
        console.log("Deleting a note");
        const newNotes = notes.filter((note) => { return note._id !== id });
        if (!newNotes) {
            setNotes("You Don't have any notes.")
        }
        setNotes(newNotes);
    }

    const editNote = async (id, title, description, tag) => {
        console.log(id);
        const url = `${host}/api/notes/updatenotes/${id}`
        const response = await fetch(url, {

            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': `${authToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description ,tag}), // body data type must match "Content-Type" header

        });
         // parses JSON response into native JavaScript objects
         let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children};
        </NoteContext.Provider>
    );
};

export default NoteState;