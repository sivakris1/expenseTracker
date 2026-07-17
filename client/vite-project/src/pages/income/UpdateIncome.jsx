import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleIncomeAction, updateIncomeAction } from '../../Redux/slices/income/incomeSlices';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get the single income details and loading state from Redux
  const { singleIncome, userLoading, AppErr, ServerErr } = useSelector((state) => state.income);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    category: '',
    date: ''
  });

  // 1. Fetch the income details when the page loads
  useEffect(() => {
    dispatch(fetchSingleIncomeAction(id));
  }, [dispatch, id]);

  // 2. Pre-fill the form once details are loaded from the database
  useEffect(() => {
    if (singleIncome) {
      setFormData({
        title: singleIncome.title || '',
        amount: singleIncome.amount || '',
        description: singleIncome.description || '',
        category: singleIncome.category || '',
        date: singleIncome.date ? new Date(singleIncome.date).toISOString().split('T')[0] : ''
      });
    }
  }, [singleIncome]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateIncomeAction({ id, formData })).unwrap();
      if (result) {
        navigate('/income'); // Redirect back on success
      }
    } catch (error) {
      console.error("Failed to update income:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-success-subtle py-5">
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">Update Income</h3>

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
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Business">Business</option>
              <option value="Investments">Investments</option>
              <option value="Gifts">Gifts</option>
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
            className="btn btn-success w-100" 
            disabled={userLoading}
          >
            {userLoading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Updating...</span>
              </div>
            ) : (
              "Update Income"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateIncome;
