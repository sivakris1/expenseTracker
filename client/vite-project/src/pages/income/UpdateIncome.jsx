import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpSlice } from '../../Redux/slices/expense/expenseSlices';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { updateIncomeAction } from '../../Redux/slices/income/incomeSlices';

const UpdateIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    type: 'income'
  });

  useEffect(() => {
    console.log("Editing income with ID:", id);
    // Optional: Dispatch fetchSingleExpense(id) to load and pre-fill
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateIncomeAction({ id, formData }))
    navigate('/income')
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <input name="title" value={formData.title} onChange={handleChange} className="form-control" placeholder="Title" />
      </div>
      <div className="mb-3">
        <input name="amount" type="number" value={formData.amount} onChange={handleChange} className="form-control" placeholder="Amount" />
      </div>
      <div className="mb-3">
        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Description" />
      </div>
      <div className="mb-3">
        <select name="type" value={formData.type} onChange={handleChange} className="form-select">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
};

export default UpdateIncome;
