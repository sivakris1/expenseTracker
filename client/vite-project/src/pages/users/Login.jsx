// Login.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import { loginUserAction } from '../../Redux/slices/users/usersSlices';
import DisableButton1 from '../../components/DisableButton1';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';



const formSchema = Yup.object({
  email : Yup.string().required('Email is required'),
  password : Yup.string().required('Password is required')
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state?.users )
    const {userAppErr,userServerErr,userLoading,userAuth} = user
    console.log("userAuth",userAuth)
  

  const formik = useFormik({
    initialValues : {
      email : "",
      password : ""
    },
    onSubmit : values =>{
      console.log(values)
      dispatch(loginUserAction(values))
    },
    validationSchema : formSchema
  })

  useEffect(()=>{
    if(userAuth){
      navigate('/profile')
    }
  },[userAuth])
  return (
    <div className="d-flex vh-100">
      {/* Left Section */}
      <div className="w-50 d-flex align-items-center justify-content-center bg-dark text-white">
        <div>
          <h1 className="display-4 fw-bold">Keep Track of</h1>
          <h1 className="display-4 fw-bold">what you are</h1>
          <h1 className="display-4 fw-bold">spending</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-50 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f59e0b' }}>
        <div className="bg-white p-4 rounded shadow" style={{ width: '320px' }}>
          <h5 className="text-center mb-3">Sign In</h5>
          <h4 className="text-center mb-4 fw-semibold">Login to your account</h4>

          {userAppErr || userServerErr  ? <div className='d-flex align-items-center justify-content-center alert alert-danger'>{userAppErr || userServerErr }</div> : null}

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')}
               type="email" className="form-control" placeholder="Email" required />
               {/* <Field name="email" type="email" /> */}
               <div  style={{ color: 'red' }}>
                {formik.touched.email && formik.errors.email}
               </div>
            </div>
            <div className="mb-3">
              <input value={formik.values.password} onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password')}
              type="password" className="form-control" placeholder="Password" required />
              {/* <Field name="password" type="password" /> */}
              <div style={{ color: 'red', fontSize: '0.875rem' }}>
      {formik.touched.password && formik.errors.password}
    </div>
            </div>
          {userLoading ? <DisableButton1/> :  <button type="submit" className="btn btn-primary w-100">Login</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
