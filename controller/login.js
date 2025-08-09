const model = require('../model/login');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


module.exports.login = async (req, res) => {
  try {
    const { emailorphone_number, password, role } = req.body;
    if (!emailorphone_number || !password || !role) {
      return res.status(400).json({
        result: false,
        message: 'insufficient parameters',

      });
    }

    const checkUser = await model.CheckUser(emailorphone_number, role);

    console.log('checkUser:', checkUser);


    if (checkUser.length == 0) {
      return res.status(404).json({
        result: false,
        message: 'User not found',
      });
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, checkUser[0].u_password);
    if (!isPasswordValid) {
      return res.status(401).json({
        result: false,
        message: 'Invalid credentials',
      });
    }
    const payload = {
      u_id: checkUser[0].u_id,
      email: checkUser[0].u_email,
      u_role: checkUser[0].u_role

    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    // Respond with user data and token
    return res.status(200).json({
      result: true,
      message: 'Login successful',
      user: {
        id: checkUser[0].u_id,
        name: checkUser[0].u_name,
        email: checkUser[0].u_email,
        phone: checkUser[0].u_phone,
        role: checkUser[0].u_role,
      }
    });



  } catch (error) {
    console.error(error);
    return res.status(500).json({
      result: false,
      message: error.message,
    })
  }
}
