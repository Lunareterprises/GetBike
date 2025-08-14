var model = require('../model/booking');
var moment = require("moment");
const notify = require('../util/notification');

<<<<<<< Updated upstream
module.exports.bookings = async (req, res) => {
    try {
        var { user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time } = req.body;

        if (!user_id || !bike_id || !pickup_location || !pickup_date || !pickup_time || !drop_location || !drop_date || !drop_time) {
=======
var moment=require("moment");
const notify = require('../util/notification'); 

module.exports.bookings=async(req,res)=>{
    try{
        var { user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time ,selfie,adharcard,driving_license} = req.fields;

        if(!user_id||!bike_id||!pickup_location||!pickup_date||!pickup_time||!drop_location||!drop_date||!drop_time||!selfie||!adharcard||!driving_license){

        
       
        return res.send({
            result:false,
            message:"insufficent parameter"
        })
    }
            const invoice = "INV" + moment().format('YYYYMMDD') + Math.floor(1000 + Math.random() * 9000);
                 const booking_date = moment().format("YYYY-MM-DD");
       
    
const booking= await model.checkbooking(user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time,booking_date ,invoice,selfie,adharcard,driving_license);

console.log("booking");
>>>>>>> Stashed changes



            return res.send({
                result: false,
                message: "insufficent parameter"
            })
        }
        const invoice = "INV" + moment().format('YYYYMMDD') + Math.floor(1000 + Math.random() * 9000);
        const booking_date = moment().format("YYYY-MM-DD");


        const booking = await model.checkbooking(user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time, booking_date, invoice);

        console.log("booking");



        if (booking.affectedRows > 0) {
            let getadmin = await model.GetAdmin()

            await notify.addNotification(user_id,getadmin[0]?.u_id,
                "user",
                "Booking",
                "Booking confirmed successfully",
                "unread");
            return res.send({
                result: true,
                message: 'booking conformed and notification added',

            })
        }
        else {
            return res.send({
                result: false,
                message: " booking not conformed"
            })
        }

    } catch (error) {

        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.listbooking = async (req, res) => {
    try {
        let { b_id, user_id } = req.body || {}
        var condition = ''
        if (b_id) {
            condition = `where b_id ='${b_id}'`
        }
        if (user_id) {
            condition = `where b_u_id ='${user_id}'`
        }
        let listbooking = await model.listbookingQuery(condition);
        if (listbooking.length > 0) {
            return res.send({
                result: true,
                message: "data retrived",
                list: listbooking
            });

        } else {
            return res.send({
                result: false,
                message: "data not found"
            })
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}
<<<<<<< Updated upstream
=======
module.exports.listNotifications = async (req, res) => {
    try {
        let { user_id } = req.body;
        const notifications = await notify.listNotification(user_id);

        if (notifications.length > 0) {
            return res.send({
                result: true,
                message: "Notifications retrieved",
                list: notifications
            });
        } else {
            return res.send({
                result: false,
                message: "No notifications found"
            });
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        });
    }
};

    
>>>>>>> Stashed changes



