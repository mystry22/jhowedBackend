const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const db_conn = require('./config/db');
const cors = require('cors');
const registration = require('./routes/registration');
const auth = require('./routes/auth');
const deli = require('./routes/operations');



//initialisations

app.use(cors());
app.use(express.json());
app.use(fileupload());



//routes

app.use('/api/registration',registration);
app.use('/api/auth',auth);
app.use('/api/deli',deli);


const PORT = process.env.PORT ||3222;

app.listen(PORT, ()=>{
    console.log('listening to port ' + PORT);
})
