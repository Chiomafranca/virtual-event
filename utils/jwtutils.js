const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
};

module.exports = { generateToken };
