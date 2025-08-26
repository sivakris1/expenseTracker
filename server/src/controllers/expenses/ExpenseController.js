const Expense = require("../../models/Expense");



//Creating Expense for User
const createExpense = async(req,res) =>{
    const {title,amount,description,user} = req.body;
    try {
        const expense = new Expense({
            title,
            amount,
            description,
            user : req?.user?._id
        })

       const savedExpense = await expense.save();

    return res.status(201).json({
      success: "Your expense was created successfully",
      data: savedExpense, // ✅ return the actual expense
    });
    } catch (error) {
        return res.json(error.message)
    }
}


//fetching All the Expenses
const fetchAllExpense = async(req,res)=>{

    try {
    const {page} = req.query;
    const expense = await Expense.paginate({},{limit:10,page:Number(page),populate:'user'})
    return res.json({expense})

} catch(error){
    return res.json({error:message.error})
}
}

//fecthing one Expense by userId
const fetchOne = async(req,res) =>{
    const {id} = req.params 
    try {
        const expense = await Expense.findById(id)
        return res.json(expense)
    } catch (error) {
        return res.json(error.message)
    }
}

//updating Expense
const UpdateExpense = async (req, res) => {
    const { title, amount, description } = req.body;
    const { id } = req.params;

    try {
        console.log("Updating expense:", { id, title, amount, description });

        const expense = await Expense.findByIdAndUpdate(
            id,
            {
                title,
                amount: Number(amount),
                description
            },
            {
                new: true,
                runValidators: true // optional but helps validate schema
            }
        );

        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        return res.json({ message: "Updated successfully", expense });
    } catch (error) {
        console.error("Update failed:", error);
        return res.status(500).json({ error: error.message });
    }
};



//deleting Expense
const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByIdAndDelete(id);
        
        if (!expense) {
            return res.status(404).json({ error: "expense not found" });
        }

        return res.json({ message: "Deleted successfully", deletedExpense: expense });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports ={createExpense,fetchAllExpense,fetchOne,UpdateExpense,deleteExpense}