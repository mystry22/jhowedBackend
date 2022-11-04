const Delivery_Schema = require('../model_schema/Delivery_Schema');

const requestDelivery =async(data)=>{
    const newUser = new Delivery_Schema(data);
    const res = await newUser.save();
    if(res){
        return 'ok';
    }
}

const allrequests = async()=>{
    const allreqs = await Delivery_Schema.find();
    return allreqs;
}


module.exports.requestDelivery = requestDelivery;
module.exports.allrequests = allrequests;
