let jwt = require('jsonwebtoken');

var redis = require('redis');
var client = redis.createClient();
var util = require('util');
var getFromBlackList = util.promisify(client.get).bind(client);
var saveToBlackList = util.promisify(client.set).bind(client);

//setup redis
client.on("error", (error) => {
  console.error(error);
});

client.on("connect", (error) => {
  console.log('Connection with redis has been established successfully.');
});

module.exports = {
  client
};

let verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err){
        res.sendStatus(403);
      }
      else 
      {
        let status = await getFromBlackList(token);
        if(status)
          return res.sendStatus(403);
          
        req.decoded = decoded;
        req.decoded.token = token;
        next();  
      }
    });
  }
  else{
    res.sendStatus(403);
  }
};

module.exports = {
  verifyToken,
  getFromBlackList,
  saveToBlackList
};
