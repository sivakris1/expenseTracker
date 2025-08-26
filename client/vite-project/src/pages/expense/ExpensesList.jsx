import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchExpAction, updateExpSlice } from '../../Redux/slices/expense/expenseSlices';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import AppPagination from './AppPagination';
import Loading from '../../navigation/LoadingComponent';
import DateFormatter from '../../navigation/DateFormatter';

const ExpensesList = ({ expenses }) => {
    const dispatch = useDispatch()
    const [page,setPage] = useState(1)
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(fetchExpAction(+page))
    },[dispatch,page,setPage])

    const allExpenses = useSelector(state => state?.expenses)
    const {loading,appErr,serverErr,expensesList} = allExpenses
    console.log(expensesList)
  return (
    <>
    {loading ? <Loading/> : appErr || serverErr ? <h1>appErr || serverErr</h1> : 
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Recent Expense transactions</h3>
        <div>
          <a href="/new-expense" className="btn btn-danger me-2" onClick={()=>{navigate('/add-expense')}}>New Expense</a>
          <button
            className="btn btn-warning"
            onClick={() => {
              localStorage.removeItem("userInfo");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <p>Below is the history of your expense transactions records</p>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>WITHDRAWED BY</th>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
  {loading ? (
    <tr>
      <td colSpan="6">
        <h1>Loading...</h1>
      </td>
    </tr>
  ) : appErr || serverErr ? (
    <tr>
      <td colSpan="6">
        <h1>Error: {appErr || serverErr}</h1>
      </td>
    </tr>
  ) : !expensesList?.expense?.docs?.length 
 ? (
    <tr>
      <td colSpan="6">
        <h1>No expense found</h1>
      </td>
    </tr>
  ) : (
    expensesList.expense.docs.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.user?.fullname || "Unknown"}</td>
        <td>{exp.title}</td>
        <td>{exp.description}</td>
        <td>₹ {exp.amount}</td>
        <td>{DateFormatter(exp.createdAt)}</td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={()=> navigate(`/update-exp/${exp._id}`)}>Update</button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
      <AppPagination pageNumber={expensesList?.expense?.totalPages} setPage={setPage} />
    </div>
    }
    </>
  );
};

export default ExpensesList;
