const express = require('express');
const { register, login, getUser, generateOTP, verifyOTP, createResetSession, updateUser, resetPassword } = require('../controller/controller');
const router = express.Router();

// post methods
router.post('/register', register)
// router.post('/registerMail')
router.post('/authenticate',(req,res) => res.end())
router.post('/login',login)

// Get methods
router.get('/user/:username',getUser)
router.get('/generateOTP',generateOTP)
router.get('/verifyOTP',verifyOTP)
router.get('/createResetSession',createResetSession)

// Put methods
router.put('/updateuser',updateUser)
router.put('/resetPassword',resetPassword)

module.exports = router;