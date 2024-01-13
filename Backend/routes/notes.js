const express = require("express");
const app = express();
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");
const { findByIdAndUpdate } = require("../models/Notes");

let success = false

//Route 1 : Create a User using: GET "/api/notes". require Login
router.get("/fetchnotes", fetchuser,
    async (req, res) => {
    try{
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);
        success = true
    } catch(error){
        console.error(error.message);
        res.status(500).json("Some internal server error occured.");
    }
    });

//Route 2 : Adding notes : POST "/api/notes". require Login
router.post("/addnotes", fetchuser, [
    body("title", "title should be greatter than 3 characters.").isLength({ min: 3 }),
    body("description", "description should be greatter than 5 characters.").isLength({ min: 5 }),],
    body("tag", "Enter a valid email").exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
          const {title,description,tag} = req.body;
          const note = await Notes.create({
              title : title,
              description : description,
              tag : tag,
              user : req.user.id
          });
          res.json(note);
          success = true
      } catch (error) {
        console.error(error.message);
        res.status(500).json("Some internal server error occured.");
      }
    });
     
//Route 3 : Updating notes : PUT "/api/notes". require Login
router.put("/updatenotes/:id",fetchuser,
  async (req,res)=>{
    const newNote = {};
    const {title,description,tag} = req.body;
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Note does't exists.")
    }
    if(note.user.toString()!== req.user.id){
      return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
    success = true
  })

//Route 4 : Deleteing notes : DELETE "/api/notes". require Login
router.delete("/deletenotes/:id",fetchuser,
async (req,res)=>{
  try{
    let note = await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("Note does't exists.");
  }
  if(note.user.toString()!== req.user.id){
    return res.status(401).send("Not allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({"Success":"The note has been deleted"});
  success = true
  } catch(error){
    console.error(error.message);
  }
  
})
module.exports = router;
