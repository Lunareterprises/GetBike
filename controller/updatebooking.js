var model = require('../model/updatebooking');
const notify = require('../util/notification');

module.exports.updateBookingStatus = async (req, res) => {
    try {
        const { b_id,b_status, b_u_id } = req.body;

        if (!b_id || !b_status || !b_u_id) {
            return res.send({
                result: false,
                message: "Insufficient parameters"
            });
        }

        if (!["approved", "rejected","completed","cancelled","cancelreq","onride",].includes(b_status)) {
            return res.send({
                result: false,
                message: "Invalid status value"
            });
        }
        console.log("STATUS RECEIVED:", req.body.b_status);


        const result = await model.updateBookingStatus(b_id,b_u_id, b_status);

        if (result.affectedRows > 0) {
            // Send notification to user
            await notify.addNotification(
                b_id,
                "user",
                "Booking " + b_status,
                `Your booking has been ${b_status}.`,
                "unread"
            );

            return res.send({
                result: true,
                message: `Booking status updated to ${b_status}`
            });
        } else {
            return res.send({
                result: false,
                message: "Booking not found or status not updated"
            });
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        });
    }
};
