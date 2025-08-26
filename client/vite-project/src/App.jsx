import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar' // Adjust path if needed
import Home from './pages/Home'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import Profile from './pages/users/Profile'
import Expense from './pages/expense/Expense.jsx'
import ProtectedRoute from './navigation/ProtectedRoute.jsx'
import AdminRoute from './navigation/AdminRoute.jsx'
import ExpensesList from './pages/expense/ExpensesList.jsx'
import UpdateExpense from './pages/expense/UpdateExpense.jsx'
import Income from './pages/income/Income.jsx'
import IncomeList from './pages/income/IncomeList.jsx'
import UpdateIncome from './pages/income/UpdateIncome.jsx'
import AccountStatistics from './pages/accountStatistics/accountStatistics.jsx'



function App() {
    const data = [
    { name: 'Food', amount: 400 },
    { name: 'Transport', amount: 300 },
    { name: 'Shopping', amount: 200 },
    { name: 'Bills', amount: 278 },
    { name: 'Others', amount: 189 },
  ];
  return (
    
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<ProtectedRoute> < Profile/> </ProtectedRoute>}/>
      <Route path='/add-expense' element={<ProtectedRoute> <Expense/></ProtectedRoute>}/>
      <Route path='/add-income' element={<ProtectedRoute><Income/></ProtectedRoute>}/>
      <Route path='/dashboard' element={<AdminRoute><Login/></AdminRoute>}/>
      <Route path='/expenses' element={<ProtectedRoute><ExpensesList/></ProtectedRoute>}/>
      <Route path='/income' element={<ProtectedRoute><IncomeList/></ProtectedRoute>}/>
      <Route path='/update-exp/:id' element={<ProtectedRoute><UpdateExpense/></ProtectedRoute>}/>
      <Route path='/update-income/:id' element={<ProtectedRoute><UpdateIncome/></ProtectedRoute>}/>
      <Route path='/account-statistics' element={<ProtectedRoute><AccountStatistics/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
