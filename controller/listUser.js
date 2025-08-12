var model = require('../model/listUser');


module.exports.listUser = async (req, res) => {
    try {
        let { user_id } = req.body || {}
        var condition = ''

        if (user_id) {
            condition = `where u_id ='${user_id}'`
        }
        let listUser = await model.listUserQuery(condition);
        if (listUser.length > 0) {
            return res.send({
                result: true,
                message: "data retrived",
                list: listUser
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