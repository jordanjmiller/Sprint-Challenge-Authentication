const express = require('express');

const users = require('./user-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    users.getUsers()
    .then(usersList => {
        res.status(200).json(usersList);
    })
    .catch(err => {
      console.log(err);
        res.status(500).json({ message: 'Failed to get users' });
    });
});

// function protected(req, res, next) {
//     console.log(req.session)
//     if(req.session && req.session.username){
//         next();
//     }else{
//         res.status(401).json({message: 'you shall not pass'});
//     }
// }

module.exports = router;