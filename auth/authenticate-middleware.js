/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(req.headers.authorization)

  if (token) {
    jwt.verify(token, process.env.JSON_SECRET, (err, decoded) => {
      console.log(decoded)
      if(err) {
        res.status(401).json({message: 'invalid credentials'})
      } else {
        req.userPerson = decoded,
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
