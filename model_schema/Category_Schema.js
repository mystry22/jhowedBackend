const mongoose = require('mongoose');

const Category = new mongoose.Schema({
    upload_date: {
        type: Date,
        
    },
    cat_name: {
        type: String,
        min: 2,
        max: 1005
    },
    cat_id: {
        type: String,
        min: 2,
        max: 1005
    },
    
    
 
});

module.exports = mongoose.model('Category',Category);