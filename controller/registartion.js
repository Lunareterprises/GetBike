var model = require('../model/registration');
var moment = require("moment");
var bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

module.exports.Register = async (req, res) => {
    try {
        var { name, email, password, mobile,role } = req.body
        if (!name || !email || !password || !mobile||!role) {
            return res.send({
                result: false,
                message: "insufficent parmeter"
            })
        }
        var date = moment().format('YYYY-MM-DD')
          const checkmail = await model.CheckMail(email);
        const checkmobile = await model.checkmobile(mobile);
        

        if (checkmail.length > 0) {

            return res.send({
                result: false,
                message: "email already registerd"
            });

        }
        if (checkmobile.length > 0) {
            return res.send({
                result: false,
                message: "phone number already registerd"
            });


        }

        
     

           


        var hashedpasssword = await bcrypt.hash(password, 10);
        var otp = Math.floor(100000 + Math.random() * 900000);
         var otpExpiry = moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');







        let adduser = await model.AddUser(name, email, hashedpasssword, mobile, date,otpExpiry,role);
        
        
        const userId = adduser.insertId;

        
    
            
          // Send OTP email
      
                  let transporter = nodemailer.createTransport({
                      host: "smtp.hostinger.com",
                      port: 587,
                      auth: {
                          type: 'Custom',
                          method: 'PLAIN',
                          user: 'support@choiceglobal.in',
                          pass: 'support123abcAB@',
                      },
                  });
                  let infos = await transporter.sendMail({
                      from: "getbike<support@choiceglobal.in>",
                      to: email,
                      subject: "change passoword",
                      html: `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Change Password Email</title>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                              background-color: #f4f4f4;
                              margin: 0;
                              padding: 20px;
                          }
                          .container {
                              background-color: #ffffff;
                              padding: 20px;
                              border-radius: 5px;
                              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                              max-width: 600px;
                              margin: auto;
                          }
                          h1 {
                              color: #333;
                          }
                          p {
                              color: #555;
                          }
                          .button {
                              background-color: #007bff;
                              color: white;
                              padding: 10px 15px;
                              text-decoration: none;
                              border-radius: 5px;
                              display: inline-block;
                          }
                          .button:hover {
                              background-color: #0056b3;
                          }
                      </style>
                  </head>
                  <body>
                      <div class="container">
                          <h1>Change Your Password</h1>
                          <p>We received a request to change your password. If you did not request this, please ignore this email.</p>
                          <h1>${otp}</h1>
                          <p>This is your OTP to change the password</p>
                          <p>This OTP will expire in 5 minutes</p>
                          <p>Thank you!</p>
                      </div>
                  </body>
                  </html>
                  
                  `
                  });
                  




            return res.send({
                result: true,
                message: "registerd successfully",
              
                
            })
       
        }catch (error) {
        console.log(error);

        return res.send({
            result: false,
            message: error.message
        })
    }

    } 

