var axios = require('axios');

async function checkToken(headers) 
{

  var response;
  
  try
  {
    response = await axios.get('http://localhost:3000/auth/isValidToken', {headers});
  }
  catch(err)
  {
    response = err;
  }
  return response;
}


async function signup(username, password, headers='') 
{
  var response;
  try
  {
    response = await axios.post('http://localhost:3000/auth/signup', {username, password}, headers);
  }
  catch(err){
    response = err;
  }
  return response
}

async function login(username, password) 
{
  var response;
  try{
    response = await axios.post('http://localhost:3000/auth/login', 
                                  {username, password});
  }
  catch(err){
    response = err;
  }  

  return response
}

async function logout(headers) 
{
  var response;
  try
  {
    response = await axios.post('http://localhost:3000/auth/logout', {}, {headers});
  }
  catch(err){
    response = err;
  }
  return response
}

async function postNote(text, headers) 
{
  var response;
  try
  {
    response = await axios.post('http://localhost:3000/note/', {text}, {headers});
  }
  catch(err){
    response = err;
  }
  return response
}

async function updateNote(text, id, headers) 
{
  var response;
  try
  {
    response = await axios.put('http://localhost:3000/note/' + id, {text}, {headers});
  }
  catch(err){
    response = err;
  }
  return response
}

async function deleteNote(id, headers) 
{
  var response;
  try
  {
    response = await axios.delete('http://localhost:3000/note/' + id, {headers});
  }
  catch(err){
    response = err;
  }
  return response
}

async function getMyNotes(headers) 
{
  var response;
  try
  {
    response = await axios.get('http://localhost:3000/note/my', {headers});
  }
  catch(err){
    response = err;
  }
  return response
}

async function getShareableLink(id, headers) 
{
  var response;
  try
  {
    response = await axios.get('http://localhost:3000/note/share/' + id, {headers});
  }
  catch(err){
    response = err;
  }
  return response
}

async function getByLink(link, headers) 
{
  var response;
  try
  {
    response = await axios.get(link, {headers});
  }
  catch(err){
    response = err;
  }
  return response
}


module.exports = {
  signup,
  login,
  logout,
  checkToken,
  postNote,
  updateNote,
  deleteNote,
  getMyNotes,
  getShareableLink,
  getByLink
};
