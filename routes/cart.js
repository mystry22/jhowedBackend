const express = require('express');
const router = express.Router();
const {checkExistingCartProd,insertIntoCart,sumCartItems,getCartItems,getSubTotal,deleteCartItem} = require('../model/CartHelper');
const {getCustomDate} = require('../utility_functions/util_func');

router.post('/ok', async(req,res)=>{
    res.send('Hello');
});

router.post('/addtocart', async(req,res)=>{

    const prod_name = req.body.prod_name;
    const prod_id = req.body.prod_id;
    const price = req.body.price;
    const user_ip = req.body.user_ip;
    const size = req.body.size;
    const qty = req.body.qty;
    const image_link = req.body.image_link;
    const description = req.body.description;

    const subtotal = qty*price;
    

    const data ={
        order_date : getCustomDate(),
        prod_name: prod_name,
        prod_id: prod_id,
        price: price,
        user_ip : user_ip,
        subtotal: subtotal,
        size: size,
        qty: qty,
        image_link: image_link,
        description: description
    }

    checkExistingCartProd(prod_id, user_ip).
    then(result =>{
        
        if(result.length > 0){
            res.json('Product exist already');
        }else{
            insertIntoCart(data).then(feed =>{
                if(feed == 'ok'){
                    res.json('Product Inserted Successfuly');
                }else{
                    res.json('Product Not Inserted');
                }
            })
            
            
        }
    })
    
});

router.post('/cartsum',async(req,res)=>{
    const ip = req.body.user_ip;
    const cartsum = await sumCartItems(ip);
    res.json(cartsum);
});

router.post('/allcartitems',async(req,res)=>{

    const ip = req.body.user_ip;
    await getCartItems(ip)
    .then(feed=>{
        if(feed.length >0){
            res.json(feed)
        }
    });
});

router.post('/getsubtotalosum',(req,res)=>{
    const ip = req.body.ip;
    getSubTotal(ip)
    .then(feed=>{
        res.send(feed);
    })
});

router.post('/deletecartitem', async(req,res)=>{
    
        const prod_id = req.body.prod_id
        const user_ip = req.body.user_ip
   let isDeleted =  await deleteCartItem(prod_id,user_ip);

   if(isDeleted){
       res.json('cart item deleted');
   }else{
       res.json('cart item not deleted');
   }
});





module.exports = router;