let jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err){
        res.sendStatus(403);
      }
      else 
      {
        req.decoded = decoded;
        next();  
      }
    });
  }
  else{
    res.sendStatus(403);
  }
};

module.exports = {
  verifyToken
};
