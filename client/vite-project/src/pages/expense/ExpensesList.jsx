import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchExpAction } from '../../Redux/slices/expense/expenseSlices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppPagination from './AppPagination';
import Loading from '../../navigation/LoadingComponent';
import DateFormatter from '../../navigation/DateFormatter';

const ExpensesList = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchExpAction(+page));
    }, [dispatch, page]);

    const allExpenses = useSelector(state => state?.expenses);
    const { loading, appErr, serverErr, expensesList } = allExpenses;

    return (
        <>
        {loading ? <Loading/> : appErr || serverErr ? <div className="alert alert-danger m-4">Error: {appErr || serverErr}</div> : 
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Recent Expense transactions</h3>
            <div>
              <button className="btn btn-danger me-2" onClick={() => navigate('/add-expense')}>New Expense</button>
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
                  <th>TITLE</th>
                  <th>DESCRIPTION</th>
                  <th>CATEGORY</th>
                  <th>AMOUNT</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {!expensesList?.expense?.docs?.length ? (
                  <tr>
                    <td colSpan="6">
                      <h1>No expense found</h1>
                    </td>
                  </tr>
                ) : (
                  expensesList.expense.docs.map((exp) => (
                    <tr key={exp._id}>
                      <td className="fw-bold">{exp.title}</td>
                      <td>{exp.description}</td>
                      <td><span className="badge bg-danger">{exp.category || "Others"}</span></td>
                      <td className="text-danger fw-bold">₹ {exp.amount}</td>
                      <td>{DateFormatter(exp.date || exp.createdAt)}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => navigate(`/update-exp/${exp._id}`)}>Update</button>
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
