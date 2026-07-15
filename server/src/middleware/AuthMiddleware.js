const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authMiddleware = async(req,res,next) =>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        try {
            if(token){
                const decodedUser = jwt.verify(token,process.env.SECRET)
                const user = await User.findById(decodedUser?.userId)
                if (!user) {
                    return res.status(401).json({ failed: "User not found" })
                }
                req.user = user;
                next()
            }
        } catch (error) {
            // Return 401 status instead of 200 so frontend knows the token is expired/invalid
            return res.status(401).json({ failed: "Session expired, please login again" })
        }
    }
    else{
        return res.status(401).json({ failed: "Not authorized, no token" })
    }
}

module.exports = authMiddleware