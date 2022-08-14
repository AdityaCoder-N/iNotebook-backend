import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom";
import styles from "../css/notescss.module.css"

function Notes(props) {
  const context = useContext(noteContext)
  const { notes, getNotes ,editNote} = context;


  const [note,setNote] = useState({id:"",etitle:"" ,edescription:"",etag:"default"})

  let navigate = useNavigate();

  useEffect(() => {

    if(localStorage.getItem("token"))
    {
      getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    
  }
  const handleClick = (e) => {

    editNote(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert("Note Updated Successfully","success");
    refClose.current.click();

  }
  const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content"  style={{backgroundColor:"#563eb3"}}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label" style={{color:"white"}}>Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label" style={{color:"white"}}>Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label" style={{color:"white"}}>Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className={styles.btn} onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <AddNote showAlert={props.showAlert}/>

      <div style={{display:"flex",alignItems:"center",justifyContent: "center"}}>

      
      <div className='row container' style={{width:"60%",margin:"0 0",padding:"0 0",marginTop:"10px",color:"white"}}>
        <h1 className='my-3'>Your Notes</h1>
        <div className = 'container'>
          {notes.length===0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;

        })}
      </div>
      </div>
    </>
  )
}

export default Notes