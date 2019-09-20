const userDb = require('./authModel.js');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  userDb.add(user) 
    .then(saved => {
      res.status(201).json(`record with id ${saved} has been added to the database`)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

  userDb.findBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = userDb.generateToken(user);
        res.status(200).json({
          message: `${user.username} has successfully logged in`,
          token
        })
      } else {
        res.status(401).json({message: 'Invalid credentials'})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

module.exports = router;
