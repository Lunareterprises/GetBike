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
            let getbooking = await Promise.all(
                listbooking.map(async (el) => {
                    let bike_id = el.b_bk_id
                    let bikeImagePath = await model.getOneBikeImage(bike_id);
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




