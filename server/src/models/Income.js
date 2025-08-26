const mongoose = require('mongoose')
const mongoosePagination = require('mongoose-paginate-v2')

const incomeSchema = new mongoose.Schema({
    title : {
        required : [true , 'title is required'],
        type : String 
    },
    description : {
        required : [true , 'description is required'],
        type : String
    },
    type : {
        type : String,
        default : 'income'
    },
    amount : {
        required : [true, 'Amount is required'],
        type : Number
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , 'User ID is required']
    },
    
},
{
    timestamps : true ,
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    }
})

incomeSchema.plugin(mongoosePagination)

const Income = mongoose.model("Income",incomeSchema)

module.exports = Income;