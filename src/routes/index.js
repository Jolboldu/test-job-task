var express = require('express');
var router = express.Router();
var models = require('../database/models');
var util = require('../util');

router.get('/', function(req, res, next) {
  res.json({"version":"first"});
});

router.get('/getAll', async(req, res, next) => {
  const users = await models.User.findAll();
  res.send(users)
});

router.get('/redis', async(req, res, next) => {
  util.redisSet("test3","3");
  res.send('redis')
});

router.get('/redis/check', async(req, res, next) => {
  try{
    let response = await util.redisGet("test3");
    res.send(response)
  }catch(e)
  {
    console.log(e)
    res.sendStatus(500);
  }
 
});
module.exports = router;
