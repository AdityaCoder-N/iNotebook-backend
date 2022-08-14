const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();

const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get All the Notes using : GET "/api/notes/fetchallnotes". Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  
});

// ROUTE 2 : Add Notes using : POST "/api/notes/addnote". Login required

router.post("/addnote",fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5})
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are errors in the user input return them using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // create note
      const note = new Notes({title , description , tag,  user: req.user.id });

      const saveNote = await note.save();

      res.json(saveNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 : Update an exisiting Note using : PUT "/api/notes/updatenote". Login required

router.put("/updatenote/:id",fetchuser,
  async (req, res) => {

    const {title,description,tag} = req.body;

    try {
    // create a new Note object
    const newNote={};

    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    // find a note to be updated and update it

    let note = await Notes.findById(req.params.id);
    // IF note does not exist
    if(!note){ return res.status(404).send("Not Found"); }

    // If the user is trying to edit the note of another user
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
    res.json(note);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 4 : Delete an exisiting Note using : DELETE "/api/notes/deletenote". Login required

router.delete("/deletenote/:id",fetchuser,
  async (req, res) => {

    try {
    // find a note to be deleted and delete it

    let note = await Notes.findById(req.params.id);
    // IF note does not exist
    if(!note){ return res.status(404).send("Not Found"); }

    // If the user is trying to delete the note of another user
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted"});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
