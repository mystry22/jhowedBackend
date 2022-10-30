const mongoose = require('mongoose');
const testDb = 'mongodb://127.0.0.1/jhowed';
const dbUrl = 'mongodb+srv://mystry:mystry22@fancyfinery.k3uod.mongodb.net/jhowed?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useUnifiedTopology:true, useNewUrlParser:true},()=>{
    console.log('db connection ok for jhowed');
});