const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    upload_date: {
        type: Date,
        
    },
    prod_name: {
        type: String,
        min: 2,
        max: 1005
    },
    prod_id: {
        type: String,
        min: 2,
        max: 1005
    },
    price: {
        type: String,
        min: 2,
        max: 1005
    },
    old_price: {
        type: String,
        min: 2,
        max: 1005
    },
    cat_name: {
        type: String,
        min: 2,
        max: 1005
    },
    image_link: {
        type: String,
        min: 2,
        max: 1005
    },
    description: {
        type: String,
        min: 2,
        max: 1005
    },
    display_home: {
        type: String,
        min: 2,
        max: 1005
    },
    

    
    
 
});

module.exports = mongoose.model('Products',Product);