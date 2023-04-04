const express = require('express');
const { register, login, getUser, generateOTP, verifyOTP, createResetSession, updateUser, resetPassword, verifyUser } = require('../controller/controller');
const {auth,localVariables} = require('../middleware/auth');
const registerMail = require('../controller/mailer');
const router = express.Router();

// post methods
router.post('/register', register)
router.post('/registerMail',registerMail)
router.post('/authenticate',(req,res) => res.end())
router.post('/login',verifyUser,login)

// Get methods
router.get('/user/:username',getUser)
router.get('/generateOTP',verifyUser,localVariables,generateOTP)
router.get('/verifyOTP',verifyUser,verifyOTP)
router.get('/createResetSession',createResetSession)

// Put methods
router.put('/updateuser',auth,updateUser)
router.put('/resetPassword',verifyUser,resetPassword)

module.exports = router;