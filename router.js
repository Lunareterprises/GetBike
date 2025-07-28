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

// var{addmostratedscooties}=require('./controller/most_rated_scooties')
// route.post('/add/mostratedscooties',addmostratedscooties)

// var{listmostratedscooties}=require('./controller/most_rated_scooties')
// route.post('/list/mostratedscooties',listmostratedscooties)


module.exports = route
