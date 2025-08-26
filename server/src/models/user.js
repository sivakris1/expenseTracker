const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required : [true , "First name is required"]
    },

    lastname:{
        type : String,
        required : [true, "last name is required"]
    },

    email:{
        type : String,
        required : [true , "email is required"]
    },

    password:{
        type : String,
        required : [true , "password is required"]
    },

    isAdmin:{
        type : Boolean,
        default : false
    },

},
{
    toObject:{
        virtuals : true 
    },
    toJSON : {
        virtuals : true
    },
    timestamps : true 
});

//virtual

userSchema.virtual("expenses",{
    ref:"Expense",
    foreignField:"user",
    localField:"_id"
})

userSchema.virtual("income",{
    ref:"Income",
    foreignField:"user",
    localField:"_id"
})


 const User = mongoose.model('User',userSchema)

 module.exports = User