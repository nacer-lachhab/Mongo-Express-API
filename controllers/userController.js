const bcrypt = require('bcrypt');//pré-installé
const userModel = require('../models/User');

const {hash} = require("bcrypt");
const jwt = require('jsonwebtoken');//creer & verifier des jwt

exports.signup=(req,res,next)=>{
    bcrypt.hash(req.body.password,10)//salt signifie executer bcrypt algo 10 fois
          .then(hash=>{
              var user= new userModel({
                  email:req.body.email,
                  password: hash
              });
              user.save()
                  .then(()=>{
                      // console.log('tototo');
                      // console.log(req.body.password);
                      // console.log('tototo');
                      res.status(201).json({message:'user created...'});
                  })
                  .catch(error=>res.status(400).json({error}));
          })//fin then
          .catch(error=>res.status(500).json({error}));
};

exports.login=(req,res,next)=>{
    userModel.findOne({email:req.body.email})
        .then((user)=>{
            if(user===null){
                res.status(401).json({message:'Login or Password is False'});
            }
            bcrypt.compare(req.body.password,user.password)
                  .then(valid =>{
                          //hash 'password incorected'
                          if(!valid) {
                              return res.status(401).json({message:'Login or Password is False'});
                          }
                          res.status(200).json({
                              userId: user._id,
                              token: jwt.sign(
                                  {userId:user._id},
                                  'RANDOM_TOKEN_SECRET',//clé secrete
                                  {expiresIn:'24h'}
                              )//fin sign
                          });//fin valid
                      })//fin then de compare
                  .catch(error=>res.status(500).json({error}));//erreur de traitement
        })//fin then de findOne
        .catch(error=>res.status(500).json({error}));
};