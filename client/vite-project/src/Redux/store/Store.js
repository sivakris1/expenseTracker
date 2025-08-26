import {configureStore} from '@reduxjs/toolkit'
// import usersReducer from '../slices/users/usersSlices'
import {usersReducer} from '../slices/users/usersSlices.js'
import { expenseReducer } from '../slices/expense/expenseSlices.js';
import { incomeReducer } from '../slices/income/incomeSlices.js';
import { account } from '../slices/accountStatisticsSlice/accountStatisticsSlice.js';
const store = configureStore({
    reducer:{
        users:usersReducer,
        expenses : expenseReducer,
        income : incomeReducer,
        accounts : account
    }
    
});

export default store