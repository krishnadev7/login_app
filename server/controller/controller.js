const bcrypt = require('bcrypt');
const userModel = require('../database/models/userModel');
var jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

/* Middleware for verifying user */
const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "cant't find user" });
    }
    next();
  } catch (error) {
    res.status(404).send({ error: 'Autentication Error' });
  }
};

/* POST http://localhost:3001/api/register */
const register = async (req, res) => {
  let hashedPass;
  try {
    const { username, email, password, profile } = req.body;
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

    // saving new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPass,
      profile: profile || '',
    });
    const user = await newUser.save();
    res.json(201, {
      user,
      msg: 'success',
    });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};

/* POST http://localhost:3001/api/login */
const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ error: 'Username not found..!' });
    }
    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck) {
      return res.status(400).send({ error: 'Invalid Password..!' });
    }

    // destructring user except password
    const { password, ...users } = user._doc;

    // creating jwt token
    const access_token = jwt.sign({ users }, process.env.JWT_SEC, {
      expiresIn: '24h',
    });

    return res.status(200).json({
      msg: 'Login successfull..!',
      username: users.username,
      access_token,
    });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};

/* GET http://localhost:3001/api/user/:username */
const getUser = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username) {
      return res.status(501).send({ error: 'Invalid username..!' });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      res.status(400).send({ error: "can't find user" });
    }
    const { password, ...users } = user._doc;
    res.status(201).json(users);
  } catch (error) {
    res.status(500).send({ error: 'cannot find user data' });
  }
};
/* GET http://localhost:3001/api/generateOTP */
const generateOTP = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  return res.status(201).send({ code: req.app.locals.OTP });
};
/* GET http://localhost:3001/api/verifyOTP */
const verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: 'Verified Successsfully!' });
  }
  return res.status(400).send({ error: 'Invalid OTP' });
};
/* GET http://localhost:3001/api/createResetSession */
const createResetSession = (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    res.status(201).send({ msg: 'access granted' });
  }
  return res.status(440).send({ error: 'session expired..!' });
};

/* PUT http://localhost:3001/api/updateuser */
const updateUser = async (req, res) => {
  try {
    const { users } = req.user;
    if (users._id) {
      const body = req.body;
      const user = await userModel.findById({ _id: users._id });
      await user.updateOne({ $set: body });
      res.status(201).send({ msg: 'Record updated..!' });
    } else {
      res.status(401).send({ error: 'user not found..!' });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

/* PUT http://localhost:3001/api/resetPassword */
const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: 'session expired..!' });
    }
    const { username, password } = req.body;
    try {
      const user = await userModel.findOne({ username });
      if (user) {
        let hashedPass = await bcrypt.hash(password, 10);
        user.updateOne({ username: user.username }, { password: hashedPass });
        req.app.locals.resetSession = false;
        return res.status(201).send({ msg: 'record updated..!', user });
      } else {
        return res.status(404).send({ error: 'username not found..!' });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
};

module.exports = {
  verifyUser,
  register,
  login,
  getUser,
  generateOTP,
  verifyOTP,
  resetPassword,
  createResetSession,
  updateUser,
};
