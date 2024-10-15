const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const register = async (req, res) => {
  const { username, password, email } = req.body;

  // Basic input validation
  if (!username || !password || !email) {
    return res.status(400).send('All fields are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email });

  try {
    await user.save();
    // delete user.password
    res.status(201).send({user});
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).send('Error registering user');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Basic input validation
  if (!username || !password) {
    return res.status(400).send('All fields are required');
  }

  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
};

const enableTwoFactor = async (req, res) => {
  const { userId } = req.user; 
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const twoFactorCode = crypto.randomBytes(3).toString('hex'); // 6-character code
  const twoFactorExpiration = Date.now() + 300000; // 5 minutes from now

  user.twoFactorCode = twoFactorCode;
  user.twoFactorExpiration = twoFactorExpiration;

  try {
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your 2FA Code',
      text: `Your 2FA code is: ${twoFactorCode}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.send('2FA enabled. Check your email for the verification code.');
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Error enabling 2FA');
  }
};
module.exports = { register, login, enableTwoFactor };
