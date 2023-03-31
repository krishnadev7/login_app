const bcrypt = require('bcrypt');
const userModel = require('../database/models/userModel');
var jwt = require('jsonwebtoken');
const { query } = require('express');

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

    // saving new user
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
const updateUser = async (req, res) => {
  try {
    const  id  = req.query.id;
    if (id) {
      const body = req.body;
      const user = await userModel.findById({_id: id});
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
const resetPassword = (req, res) => {
  res.json('resetPassword route');
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
