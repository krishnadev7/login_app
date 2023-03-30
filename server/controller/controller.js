const bcrypt = require('bcrypt');
const userModel = require('../database/models/userModel');

/* POST http://localhost:3001/api/register */
const register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;
    let hashedPass;
    console.log(username, email, password, profile);
    // check for existing user
    const userExist = await userModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: 'Please use unique username' });
    }

    // check for existing email
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ msg: 'Please use unique email' });
    }

    // bcrypting password
    if (password) {
      hashedPass = await bcrypt.hash(password, 10);
    }
    console.log(hashedPass);
    const newUser = new userModel({
      username,
      email,
      password: hashedPass,
      profile: profile || '',
    });
    const user = await newUser.save();
    res.json(200, {
      user,
      msg: 'success',
    });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};

/* POST http://localhost:3001/api/login */
const login = (req, res) => {
  res.json('login route');
};

/* GET http://localhost:3001/api/user/:username */
const getUser = (req, res) => {
  res.json('username route');
};
/* GET http://localhost:3001/api/generateOTP */
const generateOTP = (req, res) => {
  res.json('generateOTP route');
};
/* GET http://localhost:3001/api/verifyOTP */
const verifyOTP = (req, res) => {
  res.json('verifyOTP route');
};
/* GET http://localhost:3001/api/createResetSession */
const createResetSession = (req, res) => {
  res.json('createResetSession route');
};

/* PUT http://localhost:3001/api/updateuser */
const updateUser = (req, res) => {
  res.json('updateUser route');
};
/* PUT http://localhost:3001/api/resetPassword */
const resetPassword = (req, res) => {
  res.json('resetPassword route');
};

module.exports = {
  register,
  login,
  getUser,
  generateOTP,
  verifyOTP,
  resetPassword,
  createResetSession,
  updateUser,
};
