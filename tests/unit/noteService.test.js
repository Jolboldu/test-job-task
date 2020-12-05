var noteService = require('../../services/noteService');
const { Sequelize, DataTypes } = require('sequelize');

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
    let note = await noteService.createNote("someText", undefinedUser);
    expect(note).toBe(undefined);
  });

  test('create with undefined text', async() => {
    let undefinedText;
    let note = await noteService.createNote(undefinedText, fakeUser);
    expect(note).toBe(undefined);
  });

  test('create with inappropriate text datatype', async() => {
    let note = await noteService.createNote({5265:4}, fakeUser);
    expect(note).toBe(undefined);
  });

  test('create with inappropriate user datatype', async() => {
    let note = await noteService.createNote('someText', 'qwerq');
    expect(note).toBe(undefined);
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
    let note = await noteService.updateNote(undefinedUser, noteId, "updated text");
    expect(note).toBe(undefined);
  });
  
  test('update with undefined text', async() => {
    let undefinedText;
    let note = await noteService.updateNote(fakeUser, noteId, undefinedText);
    expect(note[0]).toBe(0);
  });

  test('update with undefined noteId', async() => {
    let undefinedNoteId;
    let note = await noteService.updateNote(fakeUser, undefinedNoteId, "updated text");
    expect(note).toBe(undefined);
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
    let note = await noteService.removeNote(undefinedUser, noteId);
    expect(note).toBe(undefined);
  });
  
  test('remove with undefined noteId', async() => {
    let undefinedNoteId;
    let note = await noteService.removeNote(fakeUser, undefinedNoteId);
    expect(note).toBe(undefined);
  });
});


