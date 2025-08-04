var model = require('../model/registration');
var moment = require("moment");
var bcrypt = require("bcrypt");

module.exports.Register = async (req, res) => {
    try {
        var { name, email, password, mobile } = req.body
        if (!name || !email || !password || !mobile) {
            return res.send({
                result: false,
                message: "insufficent parmeter"
            })
        }
        var date = moment().format('YYYY-MM-DD')
        let checkmail = await model.CheckMail(email);
        let checkmobile=await model.checkmobile(mobile);

        if (checkmail.length > 0) {

            return res.send({
                result: false,
                message: "email already registerd"
            });

        }
        if(checkmobile.length >0){
             return res.send({
                result: false,
                message: "phone number already registerd"
            });


        }
        var hashedpasssword = await bcrypt.hash(password, 10)
        let adduser = await model.AddUser(name, email, hashedpasssword, mobile, date);

        if (adduser.affectedRows > 0) {
            return res.send({
                result: true,
                message: "registerd successfully"
            })
        } else {
            return res.send({
                result: false,
                message: "error in adding user details"


            })

        }

    } catch (error) {
        console.log(error);

        return res.send({
            result: false,
            message: error.message
        })
    }

}