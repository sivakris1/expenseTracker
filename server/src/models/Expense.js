const mongoose = require('mongoose')
const mongoosePagination = require('mongoose-paginate-v2')

const ExpenseSchema = new mongoose.Schema({
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
    category : {
        type : String,
        required : [true, 'Category is required'],
        enum: ['Food', 'Transport', 'Rent', 'Shopping', 'Utilities', 'Entertainment', 'Health', 'Education', 'Others'],
        default: 'Others'
    },
    date : {
        type : Date,
        default : Date.now
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

ExpenseSchema.plugin(mongoosePagination)

const Expense = mongoose.model("Expense",ExpenseSchema)

module.exports = Expense;