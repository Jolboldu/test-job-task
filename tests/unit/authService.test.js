var authService = require('../../src/services/authService');
var { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db', 'name', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
}); // new sequelize object to open and close connection

var tmpUserId; //to store id of new user

beforeAll(async()=>{
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
})

afterAll(async() => {
  await authService.removeUserById(tmpUserId);
  await sequelize.close();
});

describe('create user', () => {
  
  test('create user with correct input', async() => {
    let user = await authService.createUser('testUsername', 'testPassword');
    expect(user.username).toEqual('testUsername');
    tmpUserId = user.id;
  })
  
  test('create user with undefined username', async() => {
    let username;
    let password="qwerqs";
   
    try
    {
      let user = await authService.createUser(username, password);
    }
    catch(e)
    {
      expect(e).toBe(Error);
    }
  })
  
  test('create user with undefined password', async() => {
    let username = "qwerqsd";
    let password;
    
    try
    {
      let user = await authService.createUser(username, password);
    }
    catch(e)
    {
      expect(e).toBe(Error);
    }
  })

  test('create user with inappropriate username datatype', async() => {
    let username = {598:75};
    let password ="555457";
    
    try
    {
      let user = await authService.createUser(username, password);
    }
    catch(e)
    {
      expect(e).toBe(Error);
    }
  })
  
  test('create user with more than 255 character username', async() => {
    
    let username = "$2b$10$vTRFJvQ.QO8RvYGBS4HN2eam4IwOKIZGAWvwG2UivPQAQZlrEW/qm" + 
    +"$2b$10$vTRFJvQ.QO8RvYGBS4HN2eam4IwOKIZGAWvwG2UivPQAQZlrEW/qm"
    +"$2b$10$vTRFJvQ.QO8RvYGBS4HN2eam4IwOKIZGAWvwG2UivPQAQZlrEW/qm"
    +"$2b$10$vTRFJvQ.QO8RvYGBS4HN2eam4IwOKIZGAWvwG2UivPQAQZlrEW/qm"
    +"$2b$10$vTRFJvQ.QO8RvYGBS4HN2eam4IwOKIZGAWvwG2UivPQAQZlrEW/qm";
    let password;
    
    try
    {
      let user = await authService.createUser(username, password);
    }
    catch(e)
    {
      expect(e).toBe(Error);
    }
  })
});

describe('get user', () => {
  
  test('get user with correct input', async() => {
    let user = await authService.getUser('testUsername', 'testPassword');
    expect(user.username).toEqual('testUsername');
  })

  test('get user with incorrect password', async() => {
    let user = await authService.getUser('testUsername', 'somePassword');
    expect(user).toEqual(undefined);
  })

  test('get user with incorrect username', async() => {
    let user = await authService.getUser('someUser', 'testPassword');
    expect(user).toEqual(undefined);
  })

});