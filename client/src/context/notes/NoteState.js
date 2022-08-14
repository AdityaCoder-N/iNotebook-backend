import React, { useState } from 'react'

import noteContext from './noteContext'

const NoteState = (props) => {

  const host = "http://localhost:3001";

    const notesInitial = []
    
    const [notes,setNotes] = useState(notesInitial)

    // Get All notes
    const getNotes = async ()=>{

      // api calls
      const url = `${host}/api/notes/fetchallnotes`
      const response = await fetch(url, {
        method: 'GET', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem("token")
          
        }
      });
      
      const json = await response.json()
      setNotes(json);
      
      }

    // add a note
    const addNote = async (title,description,tag)=>{

      // api calls
      const url = `${host}/api/notes/addnote`
      const response = await fetch(url, {
        method: 'POST', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem("token")
          
        },
        
        body: JSON.stringify({title,description,tag})
      });
      
      // adding in client side
        
      const note = await response.json();
      setNotes(notes.concat(note));
      }

    // delete a note

    const deleteNote = async(id) =>{

      //API call to delete from database
      
      const url = `${host}/api/notes/deletenote/${id}`
      const response = await fetch(url, {
        method: 'DELETE', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem("token")
          
        } 
      });
      
      // Deleting from client
      const newNotes = notes.filter((note)=>{ return note._id!==id})

      setNotes(newNotes);
    }

    // edit a note

    const editNote = async(id,title,description,tag)=>{

      // api calls
      const url = `${host}/api/notes/updatenote/${id}`
      const response = await fetch(url, {
        method: 'PUT', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem("token")
          
        },
        
        body: JSON.stringify({title,description,tag}) 
      });
     
      
      // const json= response.json();
    
      // logic to edit in client
      let newNotes = JSON.parse(JSON.stringify(notes));
      for(let i=0;i<newNotes.length;i++)
      {
        const element = newNotes[i];

        if(element._id===id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);

    }

    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            { props.children }
        </noteContext.Provider>
    )
}

export default NoteState;