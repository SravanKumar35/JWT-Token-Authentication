var express = require('express');
var router = express.Router();
var User = require('../models/user')
var jwt = require('jsonwebtoken')

router.post('/register', function(req, res, next){
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  })

  let promise = user.save()
  promise.then(function(doc){
    return res.status(201).json(doc)
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error in registering User'})
  })

})

router.post('/login', function(req, res, next){
  let promise = User.findOne({email:req.body.email}).exec();

  promise.then(function(doc){
    if(doc) {
      if(doc.isValid(req.body.password)){
        let token = jwt.sign({username: doc.username}, 'docwithyou2019', {expiresIn : '3h'})
        return res.status(200).json(token)
      }
      else {
        return res.status(501).json({message: 'Password is incorrect'})
      }
    }
    else {
      return res.status(501).json({message: 'This mail is  not registered with us. '})
    }
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Some Internal error'})
  })

})

router.get('/username', verifyToken, function(req, res, next){
  return res.status(200).json(decodedToken.username)
})

var decodedToken=''
function verifyToken(req, res, next){
  let token = req.query.token;

  jwt.verify(token, 'secret', function(err, tokendata){
    if(err) {
      return res.status(400).json({message: 'Unauthorized request'})
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
