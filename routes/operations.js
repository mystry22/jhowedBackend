const express = require('express');
const router = express.Router();
const { requestDelivery, allrequests, myorders} = require('../model/Delivery_Model');
const { signToken, checkLogin } = require('../functions/jwt');
const { comparePassword } = require('../functions/encrypt');
const { cloudinary } = require('../functions/cloudinary')

const uploadImage = async (image) => {

    const validImageArray = ['jpg', 'png', 'gif', 'pdf'];
    let msg = '';
    if (image) {
        const file = image.img;
        const imageName = new Date().getTime() + '_' + file.name;
        const imagesize = file.size / (1024 * 1024);
        const extention = imageName.split('.').pop();
        if (validImageArray.includes(extention) && imagesize < 5000) {

            await file.mv('./assets/' + imageName);
            return imageName;
        } else {
            msg = 'Image Error';
        }

    } else {
        msg = 'deli.jpeg';
    }

    return msg;

}
const cloudinaryImage = async (image) => {
    try {

        const response = await cloudinary.uploader.
            upload(image, {
                upload_preset: 'molenu',
            });

        if (response) {
            return 'upload okay';
        } else {
            return 'upload not okay';
        }
    } catch (err) {
        console.log(err);
    }
}



router.post('/requestdelivery', checkLogin, async (req, res) => {

    const user = req.user;
    const email = user.email;
    // const img = await cloudinaryImage(req.body.img);
    // res.json('anything');

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

module.exports = router;