const express = require('express');
const { register, login, getUser, generateOTP, verifyOTP, createResetSession, updateUser, resetPassword, verifyUser } = require('../controller/controller');
const auth = require('../middleware/auth');
const router = express.Router();

// post methods
router.post('/register', register)
// router.post('/registerMail')
router.post('/authenticate',(req,res) => res.end())
router.post('/login',verifyUser,login)

// Get methods
router.get('/user/:username',getUser)
router.get('/generateOTP',generateOTP)
router.get('/verifyOTP',verifyOTP)
router.get('/createResetSession',createResetSession)

// Put methods
router.put('/updateuser',auth,updateUser)
router.put('/resetPassword',resetPassword)

module.exports = router;