var model = require('../model/cancelbooking')
const notify = require('../util/notification');

module.exports.cancelBooking = async (req, res) => {
    try {
        let { b_id, b_u_id ,status, view_reason} = req.body;

        if (!b_id || !b_u_id|| !view_reason) {
            return res.send({
                result: false,
                message: "Insufficient parameters"
            });
        }
          const booking = await model.findBooking(b_id, b_u_id);
        if (booking.length === 0) {
            return res.send({
                result: false,
                message: "Booking not found"
            });
        }
       const cancelResult = await model.cancelBookingById(b_id, b_u_id,  view_reason);
       


        if (cancelResult.affectedRows > 0) {
            let getadmin = await model.GetAdmin()

            await notify.addNotification(b_u_id, getadmin[0]?.u_id,
                "user",
                "Booking Cancelled",
                "Your booking has been cancelled successfully.",
                "unread"
            );

            return res.send({
                result: true,
                message: "Booking  cancelled successfully"
            });
        }
        else {
            return res.send({
                result: false,
                message: "Booking not found or already cancelled"
            });
        }
    }
    catch (error) {

        return res.send({
            result: false,
            message: error.message
        });
    }
}







