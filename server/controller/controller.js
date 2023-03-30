/* POST http://localhost:3001/api/register */
const register = (req,res) => {
   res.json("register route")
}

/* POST http://localhost:3001/api/login */
const login = (req,res) => {
    res.json("login route");
}

/* GET http://localhost:3001/api/user/:username */
const getUser = (req,res) => {
    res.json("username route");
}
/* GET http://localhost:3001/api/generateOTP */
const generateOTP = (req,res) => {
    res.json("generateOTP route");
}
/* GET http://localhost:3001/api/verifyOTP */
const verifyOTP = (req,res) => {
    res.json("verifyOTP route");
}
/* GET http://localhost:3001/api/createResetSession */
const createResetSession = (req,res) => {
    res.json("createResetSession route");
}

/* PUT http://localhost:3001/api/updateuser */
const updateUser = (req,res) => {
    res.json("updateUser route");
}
/* PUT http://localhost:3001/api/resetPassword */
const resetPassword = (req,res) => {
    res.json("resetPassword route");
}

module.exports = {register,login,getUser,generateOTP,verifyOTP,resetPassword,createResetSession,updateUser}