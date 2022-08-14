import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'

import styles from "../css/notescss.module.css"

const AddNote = (props) => {

    const context = useContext(noteContext)
    const { addNote } = context;

    const [note,setNote] = useState({title:"" ,description:"",tag:"default"})

    const handleClick = (e) => {
        e.preventDefault();
        
        addNote(note.title,note.description,note.tag);

        props.showAlert("Note Added Successfully","success");

        setNote({title:"" ,description:"",tag:"default"});
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div className="container mt-4" style={{width:"60%",color:"white"}} >

            <h1 className='pt-3'>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className={`form-label ${styles.label}`}>Title</label>
                    <input type="text" value={note.title} className={styles.inputBox} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className={`form-label ${styles.label}`}>Description</label>
                    <input type="text" value={note.description} className={styles.inputBox} id="description" name="description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className={`form-label ${styles.label}`}>Tag</label>
                    <input type="text" value={note.tag} className={styles.inputBox} id="tag" name="tag" onChange={onChange} />
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className={styles.btn} onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote