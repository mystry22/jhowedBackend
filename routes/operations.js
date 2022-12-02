const express = require('express');
const router = express.Router();
const { requestDelivery, allrequests, myorders} = require('../model/Delivery_Model');
const { signToken, checkLogin } = require('../functions/jwt');
const { comparePassword } = require('../functions/encrypt');
const {toDate,contact} = require('../functions/Helper_functions');



router.post('/requestdelivery', checkLogin, async (req, res) => {

    const user = req.user;
    const email = user.email;
    // const img = await cloudinaryImage(req.body.img);
    // res.json('anything');
    const avatarLink = 'https://t3.ftcdn.net/jpg/02/62/29/32/360_F_262293274_BgGtnhf3gAZJkEt5vMj88oUK5Pwjguji.jpg';
    const data = {
        order_id: new Date().getTime(),
        order_email: email,
        deli_address: req.body.deli_address,
        deli_lat: req.body.deli_lat,
        deli_lon: req.body.deli_lon,
        pick_address: req.body.pick_address,
        pick_lat: req.body.pick_lat,
        pick_lon: req.body.pick_lon,
        deli_status: 'Pending',
        deli_type: req.body.deli_type,
        description: req.body.description,
        deli_phone: req.body.deli_phone,
        deli_name: req.body.deli_name,
        order_date: toDate(),
        avatar:avatarLink
    }

    const isSaved = await requestDelivery(data);

    if (isSaved == 'ok') {
        res.status(200).json({ msg: 'request placed' });
    } else {
        res.status(200).json({ msg: 'Unable to place request at this moment' });
    }


});

router.get('/allorder',checkLogin, async(req,res)=>{
    const user = req.user;
    const email = user.email;
    
    const data = {order_email: email}
    const allreqs = await myorders(data);

    if(allreqs.length > 0){

        res.status(200).json(allreqs);
    }else{
        res.status(200).json({msg: 'No record found'});
    }
});

router.post('/allreqs', async (req, res) => {
    const allreqs = await allrequests();
    res.status(200).json(allreqs);
});

router.post('/mailus',async(req,res)=>{
    const data = {
        full_name:req.body.name,
        subject:req.body.subject,
        mail:req.body.mail,
        msg:req.body.msg,
    }

    const response = await contact(data);
    if(response == 'OK'){
        res.status(200).json({msg:'Your request has been sent we will revert shortly'})
    }else{
        res.status(401).json({msg:'unable to complete your request at the moment'});
    }

});

module.exports = router;