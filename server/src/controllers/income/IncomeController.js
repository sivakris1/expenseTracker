const authMiddleware = require("../../middleware/AuthMiddleware");
const Income = require("../../models/Income");


//Creating Income for User
const createIncome = async(req,res) =>{
    const {title,amount,description,user} = req.body;
    try {
        const income = new Income({
            title,
            amount : Number(amount),
            description,
            user : req?.user?._id
        })

       const savedIncome = await income.save();

    return res.status(201).json({
      success: "Your income was created successfully",
      data: savedIncome, // ✅ return the actual expense
    });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


//fetching All the incomes
const fetchAllIncome = async(req,res)=>{

    try {
    const {page} = req.query;
    const queryPage = Number(page) || 1;

    const income = await Income.paginate({user : req?.user?._id},{limit:10,page:queryPage,populate:'user'})
    return res.json({income})

} catch(error){
    return res.status(500).json({ error: error.message });
}
}

//fecthing one income by userId
const fetchOne = async(req,res) =>{
    const {id} = req.params 
    try {
        const income = await Income.findById({_id : id, user : req?.user?._id})
        if (!income) {
            return res.status(404).json({ error: "Income not found or unauthorized" });
        }
        return res.json(income)
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
}

//updating income
const UpdateIncome = async(req,res)=>{
    const {title,amount,description} = req.body
    const {id} = req.params

    try {
        const income = await Income.findByIdAndUpdate(id,
            {_id : id, user : req?.user?._id},
            {
            title,
            amount : Number(amount),
            description
        },{
            new : true
        })

         if (!income) {
            return res.status(404).json({ error: "Income not found or unauthorized to update" });
        }

        return res.json({"updated successfully" : income})
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
}


//deleting income
const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await Income.findByIdAndDelete({_id : id, user : req?.user?._id});
        
        if (!income) {
            return res.status(404).json({ error: "Income not found" });
        }

        return res.json({ message: "Deleted successfully", deletedIncome: income });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports ={createIncome,fetchAllIncome,fetchOne,UpdateIncome,deleteIncome}