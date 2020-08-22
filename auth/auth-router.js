const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');
// const auth = require('./auth-model.js');

const router = express.Router();

router.post('/register', (req, res) => {
  let { username, password } = req.body;

  if(username && password){
    const hash = bcrypt.hashSync(password, 14);
    Users.addUser({ username, password: hash })
      .then(user => {
            console.log(res.data)
            res.status(200).json({ message: `User created successfully` });
      })
      .catch(error => {
          console.log(error);
        res.status(500).json(error);
      });
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  console.log(username, password)
  Users.getUserBy({ username })
    .then(user => {
      console.log(user);
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
          req.session.username = username;
          req.session.save();
          console.log(username);
          console.log(req.session.username);
          
          res.status(200).json({ message: `Welcome ${user.username}!` });
      } 
      else 
      {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
        console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
