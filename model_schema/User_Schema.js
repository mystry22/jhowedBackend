const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        min: 2,
        max: 1005
    },
    email: {
        type: String,
        min: 2,
        max: 1005
    },
    reg_date: {
        type: Date
    },
    uniquekey: {
        type: String,
        min: 2,
        max: 1005
    },

    
    
 
});

module.exports = mongoose.model('Users',UserSchema);