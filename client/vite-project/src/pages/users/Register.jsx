import { useFormik } from 'formik';
import * as Yup from 'yup'
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { registerUserAction } from '../../Redux/slices/users/usersSlices';
import DisableButton1 from '../../components/DisableButton1';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

const formSchema = Yup.object({
  email : Yup.string().required('Email is required'),
  password : Yup.string().required('Password is required'),
  firstname : Yup.string().required('First Name is required'),
  lastname : Yup.string().required('Last Name is required')

})

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state?.users )
    const {userAppErr,userServerErr,userLoading,userAuth} = user
    console.log("userAuth",userAuth)

  const formik = useFormik({
    initialValues:{
      email : "",
      password : "",
      firstname : "",
      lastname : ""
    },
    onSubmit: values => {
      console.log(values)
      dispatch(registerUserAction(values))
    },
    validationSchema : formSchema
  })

  useEffect(()=>{
      if(userAuth){
        navigate('/login')
      }
    },[userAuth])
  return (
    <div className="d-flex vh-100">
      {/* Left Panel */}
      <div className="bg-dark text-white d-flex align-items-center justify-content-center flex-grow-1">
        <div className="text-center px-4">
          <h2 className="fw-bold">Keep Track of your</h2>
          <h2 className="fw-bold">income and</h2>
          <h2 className="fw-bold">expenses flow</h2>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '40%', minWidth: '350px' }}>
        <div className="p-4 rounded shadow bg-white w-100" style={{ maxWidth: '400px' }}>
          <h4 className="text-center mb-4">New User <strong>Register</strong></h4>
         {userAppErr || userServerErr  ? <div className='d-flex align-items-center justify-content-center alert alert-danger'>{userAppErr || userServerErr }</div> : null}

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input 
             value={formik.values.firstname} onChange={formik.handleChange('firstname')} onBlur={formik.handleBlur('firstname')}
               type="text" className="form-control" placeholder="FirstName" required />
            
             <div style={{ color: 'red', fontSize: '0.875rem' }}>
      {formik.touched.firstname && formik.errors.firstname}
    </div>
    </div>
            <div className="mb-3">
             <input 
             value={formik.values.lastname} onChange={formik.handleChange('lastname')} onBlur={formik.handleBlur('lastname')}
               type="text" className="form-control" placeholder="LastName" required /> 
               <div style={{ color: 'red', fontSize: '0.875rem' }}>
      {formik.touched.lastname && formik.errors.lastname}
    </div>  
             </div>
              <div className="mb-3">
             <input 
             value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')}
               type="email" className="form-control" placeholder="Email" required />
               <div  style={{ color: 'red' }}>
                {formik.touched.email && formik.errors.email}
               </div>
      </div>
            <div className="mb-4">
              <input type="password" 
              value={formik.values.password} onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password')}
               className="form-control" placeholder="Password" required/>
               <div style={{ color: 'red', fontSize: '0.875rem' }}>
      {formik.touched.password && formik.errors.password}
    </div>
            </div>
             
          {userLoading ? <DisableButton1/> :  <button type="submit" className="btn btn-primary w-100">Register</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
