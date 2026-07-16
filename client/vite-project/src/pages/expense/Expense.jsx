
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import React from 'react';
import { createExpAction } from '../../Redux/slices/expense/expenseSlices';
import { useDispatch, useSelector } from 'react-redux';


const formSchema = Yup.object({
  title : Yup.string().required("title is required"),
  description : Yup.string().required("description is required"),
  amount : Yup.number().typeError("Amount must be a number").required("Amount is required").positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().nullable(),
})

const Expense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   // Get loading and error states from Redux
  const { userLoading, AppErr, ServerErr } = useSelector((state) => state.expenses);

  const formik = useFormik({
  initialValues:{
    title : "",
    description : "",
    amount : "",
    category : "",
    date : new Date().toISOString().split('T')[0]
  },

  onSubmit: async (values, { resetForm }) => {
      try {
        // Unwrap allows us to handle success/failure directly inside onSubmit
        const result = await dispatch(createExpAction(values)).unwrap();
        if (result) {
          resetForm();
          navigate('/expenses'); // Redirect to expenses list on success
        }
      } catch (error) {
        console.error("Failed to add expense:", error);
      }
    },
  validationSchema : formSchema
  }
)
   return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-danger-subtle py-5">
        <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
          <h3 className="text-center mb-4">Record New Expense</h3>
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
              className="btn btn-danger w-100" 
              disabled={userLoading}
            >
              {userLoading ? (
                <div className="spinner-border spinner-border-sm text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Record Expense"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Expense;

