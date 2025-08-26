const jwt = require('jsonwebtoken')
const User = require('../models/user')


const authMiddleware = async(req,res,next) =>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        try {
            if(token){
            const decodedUser = jwt.verify(token,process.env.SECRET)
            // console.log(decodedUser)
            const user = await User.findById(decodedUser?.userId )
            req.user = user;
            console.log(user)
            next()
            }
        } catch (error) {
            return res.json(error.message)
        }
    }
    else{
        return res.json({"failed":"not authorized"})
    }
}

module.exports = authMiddleware