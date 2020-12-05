var express = require('express');
var router = express.Router();
var noteService = require('../services/noteService');
var util = require('../util');

/* GET users listing. */
router.get('/all', async (req, res, next) => {
  let notes = await noteService.getAllNotes();
  res.json(notes);
});

router.get('/', util.verifyToken, async (req, res, next) => {
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

    let note = await noteService.createNote(text, user);

    if(note)
      return res.sendStatus(200);
    res.sendStatus(400);
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

    await noteService.removeNote(user, noteId);
    return res.sendStatus(200);
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

    await noteService.updateNote(user, noteId, text);
    return res.sendStatus(200);
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = router;
