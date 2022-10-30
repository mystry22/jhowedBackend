const nodemailer = require('nodemailer');
const {setUserOTP, updateToken} = require('../model/TokenModel');

// Email Transporter
const transport =()=>{
    const transport = nodemailer.createTransport({
        host: "mail.fink.com.ng",
        port: 587,
        secure: false, 
        auth: {
          user: "talkto@fink.com.ng",
          pass: 'Mystry.22'
        },
        tls:{
            rejectUnauthorized:false
        }
      });

      return transport;
}
// generate OTP
const genOTP =()=>{
    const min =1000;
    const max = 9999;
    const delta = max-min;
    const gen = Math.random();
    const initVal = delta * gen;
    const floored = Math.floor(initVal);
    const conToString = floored.toString();
    const OTP = conToString;
    return OTP;
}

// get today's date
const toDate =()=>{
    const today = new Date();
    return today;
}



//Generate And Send Mail Function
const mailOTP = async(to)=>{
    const reg_date = toDate();
    const OTP = genOTP();
    setUserOTP(to,OTP,reg_date);
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu</h2><br /> <br />

                 Hi Dear, <br />
                    Kindly use the code ${OTP} to complete your registration <br /> <br />
                    
                Best Regards
                 `;
   const mailOptions = {
       from: '<talkto@fink.com.ng>',
       to: to,
       subject: "Molenu Email Verification",
       html: custom
   }

   const mailRes = await transporter.sendMail(mailOptions);
   msg =  mailRes.response
   return msg.substring(4,6);

   
}

//Generate And Update And Send Mail Function
const updateMailOTP = async(to)=>{
    const reg_date = toDate();
    const OTP = genOTP();
    updateToken(to,OTP,reg_date);
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu</h2><br /> <br />
                Hi Dear, <br />
                    Kindly use the code ${OTP} to complete your registration <br /> <br />
                    
                Best Regards
                 `;
   const mailOptions = {
       from: '<talkto@fink.com.ng>',
       to: to,
       subject: "Molenu Email Verification",
       html: custom
   }

   const mailRes = await transporter.sendMail(mailOptions);
   msg =  mailRes.response
   return msg.substring(4,6);

   
}

const orderNotification = async(by,fro)=>{
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu New Order</h2><br /> <br />

                 Hi Dear Team, <br /><br />

                    A new order has been requested by ${by} with email address ${fro} <br /> Kindly signin to your account and start processing <br /> <br />
                    
                Best Regards <br /><br />
                 `;
   const mailOptions = {
       from: '#Order Notification <talkto@fink.com.ng>',
       to: 'alanemehenry6@gmail.com',
       subject: "Molenu Order Notification",
       html: custom
   }

   const mailRes = await transporter.sendMail(mailOptions);
   msg =  mailRes.response
   return msg.substring(4,6);
}

const custNotification = async(name,ref,to)=>{
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu New Order Notification</h2><br /> <br />

                 Dear ${name}, <br /><br />

                  This is to acknowledge your order with order reference #${ref} and will be ready within 7 working days<br /> <br />
                  Kindly reachout to us on contact@molenu.com.ng for updates on order or product customisation preferences as we can't wait to hear from<br /><br />
                  Henry (Team Lead)<br /><br />
                Best Regards
                 `;
   const mailOptions = {
       from: '#Order Notification <talkto@fink.com.ng>',
       to: to,
       subject: "Molenu Order Notification",
       html: custom
   }

   const mailRes = await transporter.sendMail(mailOptions);
   msg =  mailRes.response
   return msg.substring(4,6);
}


const mailContact =(from,subject,message,name)=>{
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Fink Traders</h2><br /> <br />
                    My name is ${name} and email address ${from} <br />
                    ${message} <br /><br />
                Best Regards
                 `;
   const mailOptions = {
       from: '<talkto@fink.com.ng>',
       to: 'alanemehenry6@gmail.com,help@fink.com.ng',
       subject: subject,
       html: custom
   }

   transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
        console.log(error)
         msg = 'Unable to Complete Request';
         return msg;
    }else{
        msg = 'Your Message Has Been Sent';
        
    }
   })
}

const actiAlert =(subject,name,plan,to)=>{
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Fink Traders</h2><br /> <br />
                   Dear ${name} your request for a ${plan} has been activated succefully <br />
                    We look forward to hearing from you on how we can serve you more or tailor our product <br />
                    to suit your needs, kindly mail us on help@fink.com.ng <br /><br />
                Best Regards
                 `;
   const mailOptions = {
       from: 'Henry From Fink <talkto@fink.com.ng>',
       to: to,
       subject: subject,
       html: custom
   }

   transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
        console.log(error)
         msg = 'Unable to Complete Request';
         return msg;
    }else{
        msg = 'Your Message Has Been Sent';
        
    }
   })
}

const welcome = async(to)=>{
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu New Order</h2><br /> <br />

                 Hi Dear , <br /><br />

                    Thank you for your interest in shopping with Molenu and we are so excited to have you here with us<br /> <br />
                    We pride ourself as Nigeria's No1 Online Fashion and Lifestle shopping plug and we can't wait to serve you, 
                    Kindly let us know how we can serve you better as you can always reach us on contact@molenu.com.ng<br /><br />

                    Henry (Team Lead); <br />
                Best Regards
                 `;
   const mailOptions = {
       from: 'Henry From Molenu <talkto@fink.com.ng>',
       to: to,
       subject: "Welcome To Molenu",
       html: custom
   }

   const mailRes = await transporter.sendMail(mailOptions);
   msg =  mailRes.response
   return msg.substring(4,6);
}

module.exports.mailOTP = mailOTP;
module.exports.updateMailOTP = updateMailOTP;
module.exports.toDate = toDate;
module.exports.mailContact = mailContact;
module.exports.actiAlert = actiAlert;
module.exports.orderNotification =orderNotification;
module.exports.custNotification =custNotification;
module.exports.welcome =welcome;