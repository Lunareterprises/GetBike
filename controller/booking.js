var model = require('../model/booking');
var moment = require("moment");
const notify = require('../util/notification');
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");

module.exports.bookings = async (req, res) => {
    try {
        const form = new formidable.IncomingForm({ multiples: false });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.send({
                    result: false,
                    message: 'File upload failed!',
                    error: err.message
                });
            }
            const invoice = "INV" + moment().format('YYYYMMDD') + Math.floor(1000 + Math.random() * 9000);
            const booking_date = moment().format("YYYY-MM-DD");

            var { user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time } = fields;
            let selfie = files.selfie ? files.selfie.newFilename : null;
            let adharcard = files.adharcard ? files.adharcard.newFilename : null;
            let license = files.license ? files.license.newFilename : null;






            if (!user_id || !bike_id || !pickup_location || !pickup_date || !pickup_time || !drop_location || !drop_date || !drop_time || !invoice || !selfie || !adharcard || !license) {

                return res.send({
                    result: false,
                    message: "insufficent parameter"
                })
            }


            const booking = await model.checkbooking(user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time, booking_date, invoice, selfie, adharcard, license);



            if (booking.affectedRows > 0) {
                let getadmin = await model.GetAdmin()
                let bikeImagePath = await model.getOneBikeImage(bike_id);
                // console.log("bikeImagePath :",bikeImagePath[0]?.image_path);
                let notification_image = bikeImagePath[0]?.image_path || null;


                await notify.addNotification(user_id, getadmin[0]?.u_id,
                    "user",
                    "Booking",
                    "Booking confirmed successfully",
                    "unread",
                    notification_image
                );
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
        })

    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });
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




