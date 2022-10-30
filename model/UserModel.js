const UserSchema = require('../model_schema/User_Schema');

const signup =async(data)=>{
    const newUser = new UserSchema(data);
    const res = await newUser.save();
}

const checkEmail = async(data)=>{
    const user = await UserSchema.findOne(data);
    return user;
}

const getDetails = async function(data){
    const userdata = await UserSchema.findOne(data);
    return userdata;
}

const getAllUsers = async function(){
    const userdata = await UserSchema.find();
    return userdata;
}





module.exports.signup = signup;
module.exports.checkEmail = checkEmail;
module.exports.getDetails = getDetails;
module.exports.getAllUsers = getAllUsers;
