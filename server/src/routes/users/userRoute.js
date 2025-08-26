const express = require('express')
const {register,login,fetchUsers, userProfile, updateUser} = require('../../controllers/users/userController.js');
const authMiddleware = require('../../middleware/AuthMiddleware.js');

const userRoute = express.Router();

userRoute.post('/register',register);
userRoute.post('/login',login)
userRoute.get('/',fetchUsers)
userRoute.get('/profile',authMiddleware,userProfile)
userRoute.put('/user-update',authMiddleware,updateUser)

module.exports = {userRoute}