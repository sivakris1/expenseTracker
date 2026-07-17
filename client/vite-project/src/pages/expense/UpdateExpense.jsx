import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpSlice, fetchSingleExpAction } from '../../Redux/slices/expense/expenseSlices';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get the single expense details and loading state from Redux
  const { singleExpense, userLoading, AppErr, ServerErr } = useSelector((state) => state.expenses);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    category: '',
    date: ''
  });

  // 1. Fetch the expense details when the page loads
  useEffect(() => {
    dispatch(fetchSingleExpAction(id));
  }, [dispatch, id]);

  // 2. Pre-fill the form once details are loaded from the database
  useEffect(() => {
    if (singleExpense) {
      setFormData({
        title: singleExpense.title || '',
        amount: singleExpense.amount || '',
        description: singleExpense.description || '',
        category: singleExpense.category || '',
        date: singleExpense.date ? new Date(singleExpense.date).toISOString().split('T')[0] : ''
      });
    }
  }, [singleExpense]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateExpSlice({ id, formData })).unwrap();
      if (result) {
        navigate('/expenses'); // Redirect back on success
      }
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-danger-subtle py-5">
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">Update Expense</h3>

        {/* Error Alerts */}
        {(AppErr || ServerErr) && (
          <div className="alert alert-danger" role="alert">
            {AppErr || ServerErr}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Title</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Title" 
              required
            />
          </div>

          {/* Amount */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Amount (₹)</label>
            <input 
              name="amount" 
              type="number" 
              value={formData.amount} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Amount" 
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Description" 
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="form-select"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Rent">Rent</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Date</label>
            <input 
              name="date" 
              type="date" 
              value={formData.date} 
              onChange={handleChange} 
              className="form-control" 
              required
            />
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="btn btn-danger w-100" 
            disabled={userLoading}
          >
            {userLoading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Updating...</span>
              </div>
            ) : (
              "Update Expense"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
