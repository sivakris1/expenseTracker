const authMiddleware = require("../../middleware/AuthMiddleware");
const Income = require("../../models/Income");


//Creating Income for User
const createIncome = async(req,res) =>{
    const {title,amount,description,user} = req.body;
    try {
        const income = new Income({
            title,
            amount,
            description,
            user : req?.user?._id
        })

       const savedIncome = await income.save();

    return res.status(201).json({
      success: "Your income was created successfully",
      data: savedIncome, // ✅ return the actual expense
    });
    } catch (error) {
        return res.json(error.message)
    }
}


//fetching All the incomes
const fetchAllIncome = async(req,res)=>{

    try {
    const {page} = req.query
    const income = await Income.paginate({},{limit:10,page:Number(page),populate:'user'})
    return res.json({income})

} catch(error){
    return res.json({error:error.message})
}
}

//fecthing one income by userId
const fetchOne = async(req,res) =>{
    const {id} = req.params 
    try {
        const income = await Income.findById(id)
        return res.json(income)
    } catch (error) {
        return res.json(error.message)
    }
}

//updating income
const UpdateIncome = async(req,res)=>{
    const {title,amount,description} = req.body
    const {id} = req.params

    try {
        const income = await Income.findByIdAndUpdate(id,{
            title,
            amount,
            description
        },{
            new : true
        })

        return res.json({"updated successfully" : income})
    } catch (error) {
        return res.json(error.message)
    }
}


//deleting income
const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await Income.findByIdAndDelete(id);
        
        if (!income) {
            return res.status(404).json({ error: "Income not found" });
        }

        return res.json({ message: "Deleted successfully", deletedIncome: income });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports ={createIncome,fetchAllIncome,fetchOne,UpdateIncome,deleteIncome}