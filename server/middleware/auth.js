const jwt = require("jsonwebtoken")

const auth = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token,process.env.JWT_SEC)
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(500).send({error: "authoriztion error..!"})
    }
}

const localVariables = (req,res,next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}

module.exports = {auth,localVariables};