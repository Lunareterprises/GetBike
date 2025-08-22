var db = require('../config/db');
var util = require('util');
const query = util.promisify(db.query).bind(db);

module.exports.updateBookingStatus = async (b_id,b_status) => {
    var Query = `UPDATE bookings SET b_status = ? WHERE b_id = ?`;
    var data=  await query(Query, [b_status, b_id]);
    return data;

};
