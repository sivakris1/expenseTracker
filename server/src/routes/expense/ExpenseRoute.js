
const express = require('express')
const { createExpense,fetchAllExpense,fetchOne,UpdateExpense,deleteExpense } = require('../../controllers/expenses/ExpenseController')
const authMiddleware = require('../../middleware/AuthMiddleware')

const ExpenseRouter = express.Router()

ExpenseRouter.post('/',authMiddleware,createExpense)
ExpenseRouter.get('/fetchall',authMiddleware,fetchAllExpense)
ExpenseRouter.get('/:id',authMiddleware,fetchOne)
ExpenseRouter.put('/update/:id',authMiddleware,UpdateExpense)
ExpenseRouter.delete('/delete/:id',authMiddleware,deleteExpense)

module.exports = ExpenseRouter