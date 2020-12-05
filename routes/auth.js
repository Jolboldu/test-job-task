var express = require('express');
var router = express.Router();
var authService = require('../services/authService');
var jwt = require('jsonwebtoken');
var util = require('../util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async(req, res, next) => {
  let password = req.body.password;
  let username = req.body.username;

  //validation  
  
  //sanitazing

  try
  {
    
    let user = await authService.createUser(username, password);
    if(user)
    {
      const token = await jwt.sign({user}, process.env.JWT_SECRET_KEY, {expiresIn: "7 days"});

      return res.json(token)  
    }
    res.sendStatus(500)
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/login', async(req, res, next) => {
  let password = req.body.password;
  let username = req.body.username;

  //validation  
  //sanitazing

  try
  {
    
    let user = await authService.getUser(username, password);

    if(user) // send token
    {
      const token = await jwt.sign({user}, process.env.JWT_SECRET_KEY, {expiresIn: "7 days"});

      return res.json(token)

    }
    res.send('no user')  
    
  }
  catch(e)
  {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/checkToken', util.verifyToken, (req, res, next) => {
  res.sendStatus(200);
})

module.exports = router;
