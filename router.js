var express = require("express");
var route = express.Router();
 

var{login}=require('./controller/login')
route.post('/login', login)


var{Register}=require('./controller/registartion')
route.post('/register',Register)


var { forgotpassword } = require('./controller/forgetpassword')
route.post('/forgotpassword', forgotpassword)

var { ResetPassword } = require('./controller/forgetpassword')
route.post('/changepassword', ResetPassword)

var { verifyOtp } = require('./controller/forgetpassword')
route.post('/verifyOtp', verifyOtp)
  

var{addbike}=require('./controller/addbike')
route.post('/add/bike', addbike)

var{listbike}=require('./controller/addbike')
route.post('/list/bike',listbike)

var{deleteBikes}=require('./controller/addbike')
route.post('/delete/bike',deleteBikes)

var{editbikes}=require('./controller/addbike')
route.post('/edit/bike',editbikes)


var{bookings}=require('./controller/booking')
route.post('/add/booking',bookings)



var{EditPersonalInfo }=require('./controller/editprofile')
route.post('/edit/profile',EditPersonalInfo )


var{ContactUs }=require('./controller/contact')
route.post('/add/contact',ContactUs )

var{listcontact}=require('./controller/contact')
route.post('/list/contact',listcontact)

var{deletecontact}=require('./controller/contact')
route.post('/delete/contact',deletecontact)

var{documents}=require('./controller/documents')
route.post('/add/document',documents)

var{getUserNotifications}=require('./controller/notification')
route.post('/notifications',getUserNotifications)


var{markAsRead}=require('./controller/notification')
route.post('/notifications/read', markAsRead)

var{createNotification}=require('./controller/notification')
route.post('/notifications/create', createNotification);



 module.exports = route
