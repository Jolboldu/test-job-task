var models = require('../database/models');
var bcrypt = require("bcrypt");

async function createUser(username, password)
{
  try
  {
    let hashedPassword = await bcrypt.hash(password, 10);
    
    let user = await models.User.create({username:username, password:hashedPassword});
    
    return user.dataValues;
  }
  catch(e)
  {
    console.log(e);
    return e;
  }
}

async function getUser(username, password)
{
  try
  {
    let user = await models.User.findAll(
      {
        where: {
          username: username
        }
      }
    );

    if(user.length == 0)
      return undefined;
    
    let isCorrectPassword = await bcrypt.compare(password, user[0].dataValues.password);
    
    if(isCorrectPassword)
      return user[0].dataValues;

    return undefined;
  } 
  catch(e)
  {
    console.log(e);
    return e;
  }
}

async function getExistingUser(username)
{
  try
  {
    let user = await models.User.findAll(
      {
        where: {
          username: username
        }
      }
    );

    if(user.length == 0)
      return undefined;
    
    return user[0].dataValues;
  } 
  catch(e)
  {
    console.log(e);
    return e;
  }
};

async function removeUserById(userId)
{
  try
  {
    await models.User.destroy({
      where: {
        id: userId
      }
    });

    return true;
  }
  catch(e)
  {
    return e;
  }
}

module.exports = {
  createUser,
  getUser,
  removeUserById,
  getExistingUser
};
