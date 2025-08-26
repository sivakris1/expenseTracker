import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../../navigation/LoadingComponent';
import DateFormatter from '../../navigation/DateFormatter';
import AppPagination from '../expense/AppPagination';
import { fetchIncomeAction } from '../../Redux/slices/income/incomeSlices';

const IncomeList = ({ expenses }) => {
    const dispatch = useDispatch()
    const [page,setPage] = useState(1)
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(fetchIncomeAction(+page))
    },[dispatch,page,setPage])

    const allIncome = useSelector(state => state?.income)
    const {loading,appErr,serverErr,incomeList} = allIncome
    console.log(incomeList)
  return (
    <>
    {loading ? <Loading/> : appErr || serverErr ? <h1>appErr || serverErr</h1> : 
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Recent Income transactions</h3>
        <div >
          <button onClick={()=>{navigate('/add-income')}}  href="/new-expense"  className="btn btn-danger me-2">New Income</button>
        
        </div>
      </div>
      <p>Below is the history of your income transactions records</p>

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
  ) : !incomeList?.income?.docs?.length 
 ? (
    <tr>
      <td colSpan="6">
        <h1>No income found</h1>
      </td>
    </tr>
  ) : (
    incomeList.income.docs.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.user?.fullname || "Unknown"}</td>
        <td>{exp.title}</td>
        <td>{exp.description}</td>
        <td>₹ {exp.amount}</td>
        <td>{DateFormatter(exp.createdAt)}</td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={()=> navigate(`/update-income/${exp._id}`)}>Update</button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
      <AppPagination pageNumber={incomeList?.income?.totalPages} setPage={setPage} />
    </div>
    }
    </>
  );
};

export default IncomeList;
