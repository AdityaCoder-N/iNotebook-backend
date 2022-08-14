import React ,{useContext}from 'react'
import noteContext from '../context/notes/noteContext'

function NoteItem(props) {

    const {note,updateNote} = props;
    const context = useContext(noteContext)
    const {deleteNote} = context;

  
  return (
    <div className='col-md-3'>
        <div className="card my-3" >
            <div className="card-body" style={{color:"black"}}>
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className='card-text'><small className="text-muted">{new Date(note.date).toUTCString().slice(0,11)}</small></p>

                <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully","success"); }}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>(updateNote(note))}></i>
            </div>
        </div>

    </div>
  )
}

export default NoteItem