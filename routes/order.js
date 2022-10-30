const express = require('express');
const router = express.Router();
const {saveOrder,getOrder,sumPending,sumWorking,sumReady,sumRejected,getPending,getWorking,getReady,getRejected,
  getPendingDetails,getReadyDetails,updatePendingOrder,updateWorkingOrder,getWorkingDetails,getSubTotal} = require('../model/OrderModel');
const {getCartItems,deleteManyCartItems} = require('../model/CartHelper');
const {toDate,orderNotification,custNotification} = require('../functions/Helper_functions');

  router.post('/completeorder',(req,res)=>{
    const ip = req.body.user_ip;
    const ref = req.body.ref;
    const paystack_ref = req.body.paystack_ref;
    const address = req.body.address;
    const first_name =req.body.first_name;
    const email = req.body.email;
    const paid = req.body.amount
    getCartItems(ip).then(feed =>{
        feed.forEach(doInsert);
        function doInsert(entry){
            const data = {
                prod_name: entry.prod_name,
                prod_id: entry.prod_id,
                price: entry.price,
                user_ip: ip,
                subtotal: entry.subtotal,
                size: entry.size,
                qty: entry.qty,
                image_link: entry.image_link,
                ref: ref,
                phone : req.body.phone,
                paystack_ref: paystack_ref,
                order_date: toDate(),
                first_name : first_name,
                last_name : req.body.last_name,
                address : address,
                paid: paid,
                total: paid,
                bal: paid,
                status: 'Pending'
            }
            saveOrder(data).then(result=>{
                if(result == 'ok'){
                   deleteManyCartItems(ip).then(stat =>{
                        if(stat == 'ok'){
                            orderNotification(first_name,email);
                            custNotification(first_name,ref,email);
                            res.json('Transaction Completed');
                            
                        }else{
                        res.json('order not completed');
                        }
                    })
                  
                  
                }
            })
        }
    })
    
    // saveOrder(data).then( feed =>{
    //   if(feed == 'ok'){
    //       res.json('Transaction Completed');
    //   }else{
    //     res.json('Transaction Not Completed');
    //   }
    // })
      
  });

  router.post('/getorder',(req,res)=>{
    const data ={
        ref : req.body.ref,
        user_ip : req.body.user_ip,
    }
    
    getOrder(data).then( feed =>{
      if(feed.length){
          res.json(feed)
      }else{
        res.json('No Order Found');
      }
    })
      
  });

  router.get('/getpendingsum',async(req,res)=>{
    const pending = await sumPending();
    res.json(pending)
  });

  router.get('/getworkingsum', async(req,res)=>{
    const working = await sumWorking();
    res.json(working)
  });

  router.get('/getreadysum', async(req,res)=>{
    const ready = await sumReady();
    res.json(ready)
  });
  router.get('/getrejectedsum', async(req,res)=>{
    const rejected = await sumRejected();
    res.json(rejected)
  });

  

  router.post('/pendingdetails',async(req,res)=>{
      ref =req.body.ref;
      
    const myPendings = await getPendingDetails(ref);
    res.json(myPendings);
  });

  router.post('/workingdetails',async(req,res)=>{
    ref =req.body.ref;
    
  const myWorking = await getWorkingDetails(ref);
  res.json(myWorking);
});

  router.get('/allpendings',async(req,res)=>{
    const myPendings = await getPending();
    if(myPendings.length > 0){
      res.json(myPendings);
    }else{
      res.json('None Available');
    }
    
  });

  router.get('/allready',async(req,res)=>{
    const myReady = await getReady();
    res.json(myReady);
  });

  router.post('/readydetails',async(req,res)=>{
     const ref =req.body.ref;
    const myReady = await getReadyDetails(ref);
    res.json(myReady);
  });

  router.get('/allworking',async(req,res)=>{
    const myWorking = await getWorking();
    res.json(myWorking);
  });


  router.get('/allrejected',async(req,res)=>{
    const myRejected = await getRejected();
    res.json(myRejected);
  });

  router.post('/setworking',(req,res)=>{
    const {ref} = req.body;
  
    updatePendingOrder(ref).then(respo=>{
      if(respo == 'ok'){
        res.json('updated')
      }else{
        res.json('err')
      }
    })
    
  });

  router.post('/setready',(req,res)=>{
    const {ref} = req.body;
  
    updateWorkingOrder(ref).then(respo=>{
      if(respo == 'ok'){
        res.json('updated')
      }else{
        res.json('err')
      }
    })
    
  });

  router.post('/totalorder',(req,res)=>{
    getSubTotal().then(respo=>{
      res.json(respo);
    });
  });



  module.exports = router;


