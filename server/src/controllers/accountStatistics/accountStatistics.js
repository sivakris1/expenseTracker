const Expense = require("../../models/Expense");
const Income = require("../../models/Income");

const accountStatsCtrl = async(req,res) =>{
    const sampleExpense = await Expense.findOne();
console.log(typeof sampleExpense.amount); // should be "number"


    try {
     const expenseStas = await Expense.aggregate([
        {$match: { amount : {$gte: 0}}},
        {
            $group:{
                _id: null,
                totalExp: { $sum : "$amount"},
                minExp: {$min : "$amount"},
                averageExp : {$avg : "$amount"},
                maxExp : {$max : "$amount"},
                totalRecordsExp : {$sum : 1}
            }
        }
    ])

    const incomeStas = await Income.aggregate([
        {$match: { amount : {$gte: 0}}},
        {
            $group:{
                _id: null,
                totalIncome: { $sum : "$amount"},
                minIncome: {$min : "$amount"},
                averageIncome : {$avg : "$amount"},
                maxIncome : {$max : "$amount"},
                totalRecordsIncome : {$sum : 1}
            }
        }
    ])

    return res.status(200).json({
      expenseStats: expenseStas[0] || {},
      incomeStats: incomeStas[0] || {}
    });

   } catch (error) {
      return res.json(error.message)
   }
}

module.exports = accountStatsCtrl