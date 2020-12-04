var express = require('express');
var router = express.Router();
var models = require('../database/models');

router.get('/', function(req, res, next) {
  res.json({"version":"first"});
});

router.get('/getAll', async(req, res, next) => {

  const users = await models.User.findAll();
  res.send(users)
});
module.exports = router;
