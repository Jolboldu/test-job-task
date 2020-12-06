var express = require('express');
var router = express.Router();
var noteService = require('../services/noteService');
var util = require('../util');
var crypto = require('crypto');

router.get('/all', async (req, res, next) => {
  let notes = await noteService.getAllNotes();
  res.json(notes);
});

router.get('/my', util.verifyToken, async (req, res, next) => {
  
  try
  {
    let user = req.decoded.user;

    let myNotes = await noteService.getUserNotes(user);
    res.json(myNotes)
  }
  catch(e)
  {
    res.sendStatus(500);
  }
});

router.post('/', util.verifyToken, async (req, res, next) => {
  
  try
  {
    let text = req.body.text;
    let user = req.decoded.user;

    if(text.length > 1000)
      return res.status(400).json("Размер заметки не должен привышать 1000 символом");

    let note = await noteService.createNote(text, user);

    return res.status(200).json(note);
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
})

router.delete('/:id', util.verifyToken, async (req, res, next) => {
  
  try
  {
    let noteId = req.params.id;
    let user = req.decoded.user;

    let status = await noteService.removeNote(user, noteId);
    if(status == 0) //if note is already removed or never existed
      return res.sendStatus(404);
    
    res.sendStatus(200);
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
})

router.put('/:id', util.verifyToken, async (req, res, next) => {
  
  try
  {
    let noteId = req.params.id;
    let user = req.decoded.user;
    let text = req.body.text;
    
    if(text.length > 1000)
      return res.status(400).json("Размер заметки не должен привышать 1000 символом");
    
    await noteService.updateNote(user, noteId, text);
    res.sendStatus(200);
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
})

router.get('/share/:noteId', util.verifyToken, async (req, res, next) => {
  
  try
  {
    let user = req.decoded.user;
    let noteId = req.params.noteId;

    let note = await noteService.getNote({id:noteId, userId: user.id});
    if(!note)
      return res.sendStatus(404)
    
    let hash = crypto.createHash('sha256');
    let key = hash.update(note.text).digest('hex');
    
    let link = 'http://localhost:3000/note/' + noteId + '/' + key;
    
    res.json(link)

  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
})

router.get('/:noteId/:key', async (req, res, next) => {
  try
  {
    let noteId = req.params.noteId;
    let key = req.params.key;

    let note = await noteService.getNote({id:noteId});
    if(!note)
      return res.sendStatus(404);
    
    let hash = crypto.createHash('sha256');
    let newKey = hash.update(note.text).digest('hex');

    if(key != newKey)
      return res.sendStatus(404);
    
    res.json(note);
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = router;
