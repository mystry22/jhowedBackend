const express = require('express');
const router = express.Router();
const {getDetails} = require('../model/UserModel');
const {signToken,checkLogin} = require('../functions/jwt');
const {comparePassword} = require('../functions/encrypt');

router.post('/userlogin',(req,res)=>{
    const data = {email : req.body.email};
     const pass = req.body.pass;
     //veriify username
     getDetails(data).then(result=>{
         if(!result){
             res.json({msg:'Invalid Credentials'})
         }else{
             //verify password
            comparePassword(result,pass).then(response=>{
             if(response == 'verified'){
                 //sign token
                 signToken(data).then(token=>{
                    const returnData = {token:token,msg:'login success'}
                    res.json(returnData);
                 });
                 
             }else{
              res.json({msg:'Invalid Credentials'});
             }
            })
            
         }
     });
})

router.post('/userdetail',checkLogin,(req,res)=>{
    const user = req.user;
    const email = user.email;
    const data = {email : email};
    getDetails(data).then( feed =>{
      res.json(feed);
    })
      
});



  module.exports = router;

