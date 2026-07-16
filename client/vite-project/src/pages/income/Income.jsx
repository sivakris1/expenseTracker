import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIncomeAction } from '../../Redux/slices/income/incomeSlices';
import { useNavigate } from 'react-router-dom';

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().typeError("Amount must be a number").required("Amount is required").positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().nullable(),
});

const Income = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading and error states from Redux
  const { userLoading, AppErr, ServerErr } = useSelector((state) => state.income);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split('T')[0] // Defaults to today's date
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // Unwrap allows us to handle success/failure directly inside onSubmit
        const result = await dispatch(createIncomeAction(values)).unwrap();
        if (result) {
          resetForm();
          navigate('/income'); // Redirect to income list on success
        }
      } catch (error) {
        console.error("Failed to add income:", error);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-success-subtle py-5">
        <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
          <h3 className="text-center mb-4">Record New Income</h3>

          {/* Error Message Alert */}
          {(AppErr || ServerErr) && (
            <div className="alert alert-danger" role="alert">
              {AppErr || ServerErr}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label font-weight-bold">Title</label>
              <input 
                value={formik.values.title} 
                onChange={formik.handleChange('title')} 
                onBlur={formik.handleBlur('title')}
                type="text" 
                className="form-control" 
                placeholder="Enter Title" 
              />
              <div style={{ color: 'red', fontSize: '0.85rem' }}>
                {formik.touched.title && formik.errors.title}
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label font-weight-bold">Description</label>
              <input 
                value={formik.values.description} 
                onChange={formik.handleChange('description')} 
                onBlur={formik.handleBlur('description')}
                type="text" 
                className="form-control" 
                placeholder="Enter Description" 
              />
              <div style={{ color: 'red', fontSize: '0.85rem' }}>
                {formik.touched.description && formik.errors.description}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-3">
              <label className="form-label font-weight-bold">Amount (₹)</label>
              <input 
                value={formik.values.amount} 
                onChange={formik.handleChange('amount')} 
                onBlur={formik.handleBlur('amount')}
                type="number" 
                className="form-control" 
                placeholder="Enter Amount" 
              />
              <div style={{ color: 'red', fontSize: '0.85rem' }}>
                {formik.touched.amount && formik.errors.amount}
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="mb-3">
              <label className="form-label font-weight-bold">Category</label>
              <select 
                value={formik.values.category} 
                onChange={formik.handleChange('category')} 
                onBlur={formik.handleBlur('category')}
                className="form-select"
              >
                <option value="">Select Category</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Business">Business</option>
                <option value="Investments">Investments</option>
                <option value="Gifts">Gifts</option>
                <option value="Others">Others</option>
              </select>
              <div style={{ color: 'red', fontSize: '0.85rem' }}>
                {formik.touched.category && formik.errors.category}
              </div>
            </div>

            {/* Date Picker */}
            <div className="mb-3">
              <label className="form-label font-weight-bold">Date</label>
              <input 
                value={formik.values.date} 
                onChange={formik.handleChange('date')} 
                onBlur={formik.handleBlur('date')}
                type="date" 
                className="form-control" 
              />
              <div style={{ color: 'red', fontSize: '0.85rem' }}>
                {formik.touched.date && formik.errors.date}
              </div>
            </div>

            {/* Submit Button with Loading Indicator */}
            <button 
              type="submit" 
              className="btn btn-success w-100" 
              disabled={userLoading}
            >
              {userLoading ? (
                <div className="spinner-border spinner-border-sm text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Record Income"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Income;
