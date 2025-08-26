const User = require('../../models/user.js')
const bcrypt = require('bcrypt')
const expressAsync = require('express-async-handler')
const jwt = require('jsonwebtoken')


//register route
const register = async(req,res)=>{
    const {firstname,lastname,email,password} = req.body
    const userExists = await User.findOne({email: email})
    try {
        
    if(userExists){
        return res.json({error:"User with this email is already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt);


    const user = new User({
        firstname,
        lastname,
        email,
        password : hashedpassword
    })

    await user.save();

    return res.json({success:"welcome"})

} catch (error) {
    return res.json(error.message)       
}
    
}


//fetching all users

const fetchUsers = expressAsync (async(req,res) => {
    const allUsers = await User.find({})
    return res.json({allUsers})
})


//login route
const login = async(req,res)=>{
    const {email,password} = req.body
    const isUser = await User.findOne({email})

    try {
        if(!isUser){
            return res.json({failed:"User not found"});
        }

        const isPassword = await bcrypt.compare(password,isUser.password)

        if(!isPassword){
            return res.json({"failed":"login failed"})
        }

        const token = jwt.sign({userId:isUser._id} , process.env.SECRET , {expiresIn: '1h'})

        console.log(isUser)

        return res.json({"success":"You're loggged in","token":token,"aboutUser":isUser})
    } catch (error) {
        return res.json(error.message)
    }
}

//user profile
const userProfile = async(req,res) =>{
    try {
        const profile = await User.findById(req?.user?._id).populate("expenses").populate("income");
        return res.json(profile)
    } catch (error) {
        return res.json(error.message)
    }
}

//update user
const updateUser = async(req,res) =>{
    try {
        const {firstname,lastname,email} = req.body;

        const profile = await User.findByIdAndUpdate(req?.user?._id,{
            firstname : firstname,
            lastname : lastname,
            email : email
        },{
            new : true,
            runValidators : true
        })
        res.json(profile)
    } catch (error) {
        
    }
}

module.exports = {register,login,fetchUsers,userProfile,updateUser}