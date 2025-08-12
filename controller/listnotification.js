var model = require('../model/listnotification');


module.exports.listNotification = async (req, res) => {
    try {
        let { admin_id, user_id } = req.body || {}
        var condition = ''
        if (admin_id) {
            condition = `where admin_id ='${admin_id}'`
        }
        if (user_id) {
            condition = `where user_id ='${user_id}'`
        }
        let listNotification = await model.listNotificationQuery(condition);
        if (listNotification.length > 0) {
            return res.send({
                result: true,
                message: "data retrived",
                list: listNotification
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