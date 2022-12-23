const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticate = async (req, res, next) => {
  const { token } = req.header;
  try {
    const email = jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) return res.status(401);
      return decoded.email;
    });
    const emailPerson = await User.findOne({ email }).exec();
    if (emailPerson == null) return res.status(404);
    next();
  } catch (err) {
    console.error('view error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }
};

module.exports = { authenticate };
