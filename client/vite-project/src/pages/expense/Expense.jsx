
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import React from 'react';
import { createExpAction } from '../../Redux/slices/expense/expenseSlices';
import { useDispatch, useSelector } from 'react-redux';


const formSchema = Yup.object({
  title : Yup.string().required("title is required"),
  description : Yup.string().required("description is required"),
  amount : Yup.string().required("amount is required"),
})

const Expense = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
  initialValues:{
    title : "",
    description : "",
    amount : ""
  },
  onSubmit : values =>{
        console.log(values)

        // dispatch(loginUserAction(values))
        dispatch(createExpAction(values))
      },
  validationSchema : formSchema
  }
)
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-danger-subtle">
  <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
    <h3 className="text-center mb-4">Record New Expense</h3>
    {/* form from here */}
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input value={formik.values.title} onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')}
        type="text" className="form-control" placeholder="Enter Title" />
      
      {/* error  */}
      <div style={{ color: 'red' }}>
        {formik.touched.title && formik.errors.title}
      </div>
      </div>
      <div className="mb-3">
        <label  className="form-label">Description</label>
        <input value={formik.values.description} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')}
               type="text" className="form-control" placeholder="Enter Description" />
      
      {/* error */}
      <div style={{ color: 'red' }}>
        {formik.touched.description && formik.errors.description}
      </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input value={formik.values.amount} onChange={formik.handleChange('amount')} onBlur={formik.handleBlur('amount')}
        type="number" className="form-control" placeholder="Enter Amount" />
     
      {/* error  */}
      <div style={{ color: 'red' }}>
        {formik.touched.amount && formik.errors.amount} 
      </div>
      </div>
      <button type="submit" className="btn btn-danger w-100">Record Expense</button>
    </form>
  </div>
</div>

    </div>
  )
}

export default Expense
