const Cart = require('../model_schema/Cart_Schema');

const checkExistingCartProd = async function(prod_id,user_ip){
    const prodExist = await Cart.find({prod_id: prod_id, $and : [{user_ip : user_ip}]});
    return prodExist;
}

const insertIntoCart = async function(data){
    const cart = new Cart(data);
    const resp = await cart.save();
    if(resp){
        return 'ok';
    }
}

const sumCartItems = async function(myip){
    
    const cart = await Cart.find({user_ip: myip}).countDocuments();
    return cart;
}

const getCartItems = async function(ip){
    const cartItems = await Cart.find({user_ip : ip});
    return cartItems;
}

const getSubTotal = async function(ip){
    const subTotal = await Cart.aggregate(
        [
            {$match: {}},
            {$group  : {_id: "$user_ip",subtotal :{$sum : "$subtotal"}}}
        ]
    );
    return subTotal;
}
const deleteCartItem = async function(prod_id,user_ip){
    const data = {
        prod_id: prod_id, $and : [{user_ip : user_ip}]
    }
    const deleteOne = await Cart.deleteOne(data);
    return true;
   }
const deleteManyCartItems = async function(user_ip){
    const data = {
        user_ip: user_ip
    }

    const deleteMany = await Cart.deleteMany(data);
    if(deleteMany){
        return 'ok'
    }
}
module.exports.checkExistingCartProd = checkExistingCartProd;
module.exports.insertIntoCart = insertIntoCart;
module.exports.sumCartItems = sumCartItems;
module.exports.getCartItems = getCartItems;
module.exports.getSubTotal = getSubTotal;
module.exports.deleteCartItem =deleteCartItem;
module.exports.deleteManyCartItems =deleteManyCartItems;