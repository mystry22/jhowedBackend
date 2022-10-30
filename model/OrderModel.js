const Order = require('../model_schema/Order_Schema');
const Cart = require('../model_schema/Cart_Schema');

const saveOrder = async function(data){
    const order = new Order(data);
    const resp = await order.save();
    if(resp){
        return 'ok';
    }
}

const getOrder = async function(ref){
    const orderExist = await Order.find({ref : ref});
    return orderExist;
}

const sumPending = async function(){
    
    const order = await Order.find({status: 'Pending'}).countDocuments();
    return order;
}
const sumWorking = async function(){
    
    const order = await Order.find({status: 'Working'}).countDocuments();
    return order;
}
const sumReady = async function(){
    
    const order = await Order.find({status: 'Ready'}).countDocuments();
    return order;
}
const sumRejected = async function(){
    
    const order = await Order.find({status: 'Rejected'}).countDocuments();
    return order;
}

const getPending = async function(){
    const orderExist = await Order.find({status : 'Pending'});
    return orderExist;
}

const getWorking = async function(){
    const orderExist = await Order.find({status : 'Working'});
    return orderExist;
}
const getReady = async function(){
    const orderExist = await Order.find({status : 'Ready'});
    return orderExist;
}
const getRejected = async function(){
    const orderExist = await Order.find({status : 'Rejected'});
    return orderExist;
}

const getPendingDetails = async function(ref){
    const orderExist = await Order.find({ref: ref, $and : [{status : 'Pending'}]});
    return orderExist;
}

const getWorkingDetails = async function(ref){
    const orderExist = await Order.find({ref: ref, $and : [{status : 'Working'}]});
    return orderExist;
}

const getReadyDetails = async function(ref){
    const orderExist = await Order.find({ref: ref, $and : [{status : 'Ready'}]});
    return orderExist;
}

const updatePendingOrder = async function(ref){
    
    const update = await Order.updateMany({ref : ref}, {$set : {status: 'Working'}});
    if(update){
        return 'ok';
    }
}

const updateWorkingOrder = async function(ref){
    
    const update = await Order.updateMany({ref : ref}, {$set : {status: 'Ready'}});
    if(update){
        return 'ok';
    }
}

const getSubTotal = async function(){
    const subTotal = await Order.aggregate(
        [
            {$match: {}},
            {$group  : {_id: "$ref",subtotal :{$sum : "$subtotal"}}}
        ]
    );
    return subTotal;
}


module.exports.saveOrder = saveOrder;
module.exports.getOrder = getOrder;
module.exports.sumWorking = sumWorking;
module.exports.sumReady = sumReady;
module.exports.sumRejected = sumRejected;
module.exports.sumPending = sumPending;
module.exports.getPending = getPending;
module.exports.getWorking = getWorking;
module.exports.getReady = getReady;
module.exports.getRejected = getRejected;
module.exports.getPendingDetails = getPendingDetails;
module.exports.getReadyDetails = getReadyDetails;
module.exports.updatePendingOrder = updatePendingOrder;
module.exports.updateWorkingOrder = updateWorkingOrder;
module.exports.getWorkingDetails = getWorkingDetails;
module.exports.getSubTotal = getSubTotal;

