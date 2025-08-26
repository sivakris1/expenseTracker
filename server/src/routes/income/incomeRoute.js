const {createIncome,fetchAllIncome,fetchOne,UpdateIncome,deleteIncome} = require("../../controllers/income/IncomeController");
const express = require('express');
const authMiddleware = require("../../middleware/AuthMiddleware.js");

const incomeRouter = express.Router()

incomeRouter.post('/',authMiddleware,createIncome)
incomeRouter.get('/fetchall',authMiddleware,fetchAllIncome)
incomeRouter.get('/:id',authMiddleware,fetchOne)
incomeRouter.put('/update/:id',authMiddleware,UpdateIncome)
incomeRouter.delete('/delete/:id',authMiddleware,deleteIncome)

module.exports = incomeRouter