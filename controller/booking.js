var model = require('../model/booking');
var moment = require("moment");
const notify = require('../util/notification');
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
const { promises } = require('dns');

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

            var { user_id, bike_name, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time, adharcard, license } = fields;




            // console.log(fields,"fillll");


            if (!user_id || !bike_name || !bike_id || !pickup_location || !pickup_date || !pickup_time || !drop_location || !drop_date || !drop_time || !adharcard || !license) {
                return res.send({
                    result: false,
                    message: "insufficent parameter"
                })
            }


            const booking = await model.checkbooking(user_id, bike_name, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time, booking_date, invoice, adharcard, license);

            let booking_id = booking.insertId

            if (booking.affectedRows > 0) {


                if (files && files.selfie) {
                    const imageFiles = Array.isArray(files.selfie) ? files.selfie : [files.selfie];

                    for (const file of imageFiles) {
                        if (!file || !file.filepath || !file.originalFilename) continue;

                        const oldPath = file.filepath;
                        const newPath = path.join(process.cwd(), '/uploads/booking', file.originalFilename);

                        const rawData = fs.readFileSync(oldPath);
                        fs.writeFileSync(newPath, rawData);

                        const selfiepath = "/uploads/booking/" + file.originalFilename;

                        var insertResult = await model.AddBookingImageQuery(selfiepath, booking_id);
                        // console.log(insertResult, "image insert result");
                        console.log("Insert result:", insertResult);
                    }
                }


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
                    message: 'booking conformed ',

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
        let {  user_id } = req.body || {}
        var condition = ''
        
        if (user_id) {
            condition = `where b.b_u_id ='${user_id}'`
        }
        let listbooking = await model.listbookingQuery(condition);
        if (listbooking.length > 0) {
            let getbooking = await Promise.all(
                listbooking.map(async (el) => {
                    let bike_id = el.b_bk_id
                    let bikeImagePath = await model.getOneBikeImage(el.b_bk_id);
                    el.bikeImagePath = bikeImagePath
                    return el
                }
                )
            )
            return res.send({
                result: true,
                message: "data retrived",
                list: getbooking
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
module.exports.extendbooking = async (req, res) => {
    try {
        let { b_id, new_drop_date, new_drop_time, new_drop_location, extend_reason } = req.body;
        if (!b_id || !new_drop_date || !new_drop_time || !new_drop_location) {

            return res.send({
                result: false,
                message: "insufficent parameter"
            })
        }
        let booking = await model.getUserIdByBooking(b_id);
        if (booking.length == 0) {
            return res.send({
                result: false,
                message: "Booking not found "
            });
        }

        let user_id = booking[0].b_u_id

        const result = await model.extendbookingQuery(b_id, new_drop_date, new_drop_time, new_drop_location, extend_reason);

        if (result.affectedRows > 0) {
            let getadmin = await model.GetAdmin();


            await notify.addNotification(
                user_id,                       // sender (user)
                getadmin[0]?.u_id,             // receiver (admin)
                "user",
                "Booking Extended",
                `Booking #${b_id} extended until ${new_drop_date} ${new_drop_time} at ${new_drop_location}`,
                "unread"
            );

            return res.send({
                result: true,
                message: "Booking extended successfully & notifications sent",
                updated: {
                    drop_date: new_drop_date,
                    drop_time: new_drop_time,
                    drop_location: new_drop_location,
                    extend_reason: extend_reason,
                    status: "extended"
                }
            });

        }
        else {
            return res.send({
                result: false,
                message: "Booking not found or not updated"
            });
        }


    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });
    }

}




