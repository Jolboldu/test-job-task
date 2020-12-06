var noteService = require('../../src/services/noteService');
const { Sequelize, DataTypes } = require('sequelize');

//setup environment
const sequelize = new Sequelize('db', 'name', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

var fakeUser = {id:1000, username:"someUsername", password:"somePasswoord"};
var noteId;

beforeAll(async()=>{
  await sequelize.sync();

  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
})

afterAll(async() => {
  await sequelize.close();
});


describe('create note', () => {

  test('create with proper input', async() => {  
    let note = await noteService.createNote("someText", fakeUser);
    expect(note.text === 'someText' && note.userId === fakeUser.id).toBeTruthy();
    noteId = note.id;
  });

  test('create with undefined user', async() => {
    let undefinedUser;
    try
    {
      let note = await noteService.createNote("someText", undefinedUser);
    }
    catch(e)
    {
      expect(note).toBe(Error);
    }
  });

  test('create with undefined text', async() => {
    let undefinedText;
    try
    {
      let note = await noteService.createNote(undefinedText, fakeUser);
    }
    catch(e)
    {
      expect(note).toBe(Error);
    }
  });

  test('create with inappropriate text datatype', async() => {
    try
    {
      let note = await noteService.createNote({5265:4}, fakeUser);
    }
    catch(e)
    {
      expect(note).toBe(Error);
    }
  });

  test('create with inappropriate user datatype', async() => {
    try
    {
      let note = await noteService.createNote('someText', 'qwerq');
    }
    catch(e)
    {
      expect(note).toBe(Error);
    }
  });
});

describe('update note', () => {
  
  test('update with proper input', async() => {   
    let note = await noteService.updateNote(fakeUser, noteId, "updated text");
    expect(note[0]).toBe(1);
  });

  test('update with invalid noteId ', async() => {
    let note = await noteService.updateNote(fakeUser, -1, "updated text");
    expect(note[0]).toBe(0);
  });

  test('update with invalid user', async() => {
    let note = await noteService.updateNote({id:-1}, noteId, "updated text");
    expect(note[0]).toBe(0);
  });

  test('update with undefined user', async() => {
    let undefinedUser;
    try
    {
      let note = await noteService.updateNote(undefinedUser, noteId, "updated text");
    }
    catch(e)
    {
      expect(note).toBe(Error);
    }
  });
  
  test('update with undefined text', async() => {
    let undefinedText;
    let note = await noteService.updateNote(fakeUser, noteId, undefinedText);
    expect(note[0]).toBe(0);
  });

  test('update with undefined noteId', async() => {
    let undefinedNoteId;
    try
    {
      let note = await noteService.updateNote(fakeUser, undefinedNoteId, "updated text");
    }
    catch(e)
    {
      expect(note).toBe(Error);
    }
  });

});

describe('remove note', () => {
  test('remove with proper input', async() => {
    let note = await noteService.removeNote(fakeUser, noteId);
    expect(note).toBe(1);
  });

  test('remove deleted data', async() => {
    let note = await noteService.removeNote(fakeUser, noteId);
    expect(note).toBe(0);
  });

  test('remove with undefined user', async() => {
    let undefinedUser;
    try
    {
      let note = await noteService.removeNote(undefinedUser, noteId);
    }
    catch(e)
    {
      expect(note).toBe(Erro);
    }
  });
  
  test('remove with undefined noteId', async() => {
    let undefinedNoteId;
    try
    {
      let note = await noteService.removeNote(fakeUser, undefinedNoteId);
    }
    catch(e)
    {
      expect(note).toBe(Erro);
    }
  });
});


