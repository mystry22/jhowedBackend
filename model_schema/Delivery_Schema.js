const mongoose = require('mongoose');

const Delivery_Schema = new mongoose.Schema({
    order_id: {
        type: String,
        min: 2,
        max: 1005
    },
    order_email: {
        type: String,
        min: 2,
        max: 1005
    },
    deli_address: {
        type: String,
        min: 2,
        max: 1005
    },
    deli_lat: {
        type: String,
        min: 2,
        max: 1005
    },
    deli_lon: {
        type: String,
        min: 2,
        max: 1005
    },
    pick_address: {
        type: String,
        min: 2,
        max: 1005
    },
    pick_lat: {
        type: String,
        min: 2,
        max: 1005
    },
    pick_lon: {
        type: String,
        min: 2,
        max: 1005
    },
    handling: {
        type: String,
        min: 2,
        max: 1005
    },
    deli_status: {
        type: String,
        min: 2,
        max: 1005
    },
    deli_type: {
        type: String,
        min: 2,
        max: 1005
    },
    avatar: {
        type: String,
        min: 2,
        max: 1005
    },
    description: {
        type: String,
       
    },
    deli_phone: {
        type: String,
        min: 2,
        max: 1005
    },
    deli_name: {
        type: String,
        min: 2,
        max: 1005
    },
    order_date: {
        type: Date,
        
    },


    
    
 
});

module.exports = mongoose.model('Delivery',Delivery_Schema);