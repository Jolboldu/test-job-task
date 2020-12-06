var express = require('express');
var router = express.Router();
var authService = require('../services/authService');
var jwt = require('jsonwebtoken');
var util = require('../util');
var validator = require('validator');

router.post('/signup', async(req, res, next) => {
  try
  {
    let password = req.body.password;
    let username = req.body.username;
    
    if(!validator.isStrongPassword(password))
      return res.status(400).json("ваш пароль слишком слабый, " 
      + "Требования к паролю: минимум 8 символов, 1 заглавная буква, 1 строчная и 1 цифра и 1 символ ");

    if(await authService.getExistingUser(username))
      return res.status(400).json("такой username уже занят")
    
    let user = await authService.createUser(username, password);

    let token = await jwt.sign({user}, process.env.JWT_SECRET_KEY, {expiresIn: "7 days"});

    return res.json(token)  
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/login', async(req, res, next) => {

  try
  {
    let password = req.body.password;
    let username = req.body.username;
  
    let user = await authService.getUser(username, password);

    if(user) // send token
    {
      const token = await jwt.sign({user}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});

      return res.json(token)

    }
    res.sendStatus(403)  
    
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/logout', util.verifyToken, async (req,res,next) => {
  try
  {
    let token = req.decoded.token;
    await util.saveToBlackList(token, true, 'EX', 60 * 60 * 24); // 24 hours
    res.sendStatus(200);
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
})

router.get('/isValidToken', util.verifyToken, async (req,res,next) => {
  res.sendStatus(200);
})

module.exports = router;
