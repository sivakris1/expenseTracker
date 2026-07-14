

const mongoose = require("mongoose");
const Expense = require("../../models/Expense");
const Income = require("../../models/Income");

const accountStatsCtrl = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req?.user?._id);

        const expenseStats = await Expense.aggregate([
            {
                $match: { 
                    user: userId, // Security: only aggregate this user's records
                    amount: { $gte: 0 } 
                }
            },
            {
                $group: {
                    _id: null,
                    totalExp: { $sum: "$amount" },
                    minExp: { $min: "$amount" },
                    averageExp: { $avg: "$amount" },
                    maxExp: { $max: "$amount" },
                    totalRecordsExp: { $sum: 1 }
                }
            }
        ]);

        const incomeStats = await Income.aggregate([
            {
                $match: { 
                    user: userId, // Security: only aggregate this user's records
                    amount: { $gte: 0 } 
                }
            },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: "$amount" },
                    minIncome: { $min: "$amount" },
                    averageIncome: { $avg: "$amount" },
                    maxIncome: { $max: "$amount" },
                    totalRecordsIncome: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json({
            expenseStats: expenseStats[0] || {},
            incomeStats: incomeStats[0] || {}
        });

    } catch (error) {
        return res.json(error.message)
    }
};

module.exports = accountStatsCtrl;
