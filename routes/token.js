const express = require('express');
const router = express.Router();
const {checkToken,verifyToken} = require('../model/TokenModel');
const {mailOTP,updateMailOTP,toDate} = require('../functions/Helper_functions');

router.post('/sendotp',(req,res)=>{
    const to = req.body.email;

    checkToken(to).then(feed =>{
      if(feed.length > 0){
        updateMailOTP(to).then(result =>{
            if(result == 'OK'){
                res.json('An OTP has been sent succefully');
            }else{
                res.json('An OTP has not been sent succefully');
            }
        })
        
      }else{
        mailOTP(to).then(result =>{
            if(result == 'OK'){
                res.json('An OTP has been sent succefully');
            }else{
                res.json('An OTP has not been sent succefully');
            }
        })
        
      }
    })

});

router.post('/verifyotp',(req,res)=>{
    const to = req.body.email;
    const OTP = req.body.OTP;
    verifyToken(to,OTP).then(result =>{
      if(result.length > 0){
        res.json('verification successful');
      }else{
        res.json('verification unsuccessful');
      }
    })
  });

module.exports = router;