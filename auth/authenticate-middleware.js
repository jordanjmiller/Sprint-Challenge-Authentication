

module.exports = (req, res, next) => {
  console.log('req.session', req.session)
  console.log('req.session.username', req.session.username)
  console.log('wtf')
  if(req.session && req.session.username){
      next();
  }else{
      res.status(401).json({message: 'You shall not pass'});
  }
};
