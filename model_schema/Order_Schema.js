const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    order_date: {
        type: Date,
        
    },
    first_name: {
        type: String,
        min: 2,
        max: 1005
    },
    last_name: {
        type: String,
        min: 2,
        max: 1005
    },
    address: {
        type: String,
        min: 2,
        max: 1005
    },
    user_ip: {
        type: String,
        min: 2,
        max: 1005
    },
    ref:{
        type: String,
        min: 2,
        max: 1005
    },
    phone:{
        type: String,
        min: 2,
        max: 1005
    },
    paystack_ref:{
        type: String,
        min: 2,
        max: 1005
    },
    prod_name:{
        type: String,
        min: 2,
        max: 1005
    },
    prod_id:{
        type: String,
        min: 2,
        max: 1005
    },
    price:{
        type: String,
        min: 2,
        max: 1005
    },
    subtotal:{
        type: Number,
        
    },
    size:{
        type: String,
        min: 2,
        max: 1005
    },
    image_link:{
        type: String,
        min: 2,
        max: 1005
    },
    qty:{
        type: String,
        min: 2,
        max: 1005
    },
    total:{
        type: String,
        min: 2,
        max: 1005
    },
    paid:{
        type: String,
        min: 2,
        max: 1005
    },
    bal:{
        type: String,
        min: 2,
        max: 1005
    },
    status:{
        type: String,
        min: 2,
        max: 1005
    },
    seen:{
        type: String,
        min: 2,
        max: 1005
    },
    remark:{
        type: String,
       
    },
    
    
    
    
 
});

module.exports = mongoose.model('Order',Order);