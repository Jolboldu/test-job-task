var models = require('../database/models');

async function createNote(text, user)
{
  try
  {    
    let note = await models.Note.create({userId: user.id, text:text});
    
    return note.dataValues;
  }
  catch(e)
  {
    console.log(e);
  }
}

async function removeNote(user, noteId)
{
  try
  {    
    let status = await models.Note.destroy({
      where: {
        userId: user.id,
        id: noteId
      }
    })
    
    return status;
  }
  catch(e)
  {
    console.log(e);
  }
}

async function updateNote(user, noteId, text)
{
  try
  {
    let status = await models.Note.update({text: text}, {
      where: {
        userId: user.id,
        id: noteId
      }
    })
    return status;//array of numbers
  }
  catch(e)
  {
    console.log(e);
  }
}

async function getNote(noteId)
{
  try
  {
    await models.Note.findAll({
      where: {
        id: noteId
      }
    })
  }
  catch(e)
  {
    console.log(e);
  }
}

async function getAllNotes()
{
  try
  {
    let notes = await models.Note.findAll();
    return notes;
  }
  catch(e)
  {
    console.log(e);
  }
}

async function getUserNotes(user)
{
  try
  {
    let notes = await models.Note.findAll({
      where: {
        userId: user.id
      }
    })
    return notes;
  }
  catch(e)
  {
    console.log(e);
  }
}


module.exports = {
  createNote,
  getAllNotes,
  getUserNotes,
  removeNote,
  updateNote
};
