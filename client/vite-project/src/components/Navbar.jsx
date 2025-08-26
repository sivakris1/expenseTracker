import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import Profile from '../pages/users/Profile';
import {Navigate, useNavigate} from 'react-router-dom'





const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
    
      {/* Top Navbar */}
      <nav className="navbar bg-body-tertiary px-3">
        <div className="d-flex align-items-center gap-3 w-100 justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <a className="navbar-brand" href="#" onClick={()=> navigate('/expenses')}>Expenses List</a>
            <a className="navbar-brand" href="#" onClick={()=> navigate('/income')}>Income List</a>
            <a className="nav-link" href="#scrollspyHeading1" onClick={()=> navigate('/dashboard')}>Dashboard</a>
            <a className="nav-link" href="#scrollspyHeading2" onClick={()=> navigate('/profile')
            }>Profile</a>
          </div>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link" href="#scrollspyHeading1" onClick={()=> navigate('/add-expense')}>New Expense</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#scrollspyHeading2" onClick={()=> navigate('/add-income')}>New Income</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#scrollspyHeading2" onClick={(e)=>{
               e.preventDefault();
               localStorage.removeItem("userInfo")
                window.location.href = "/login"; 
              }
}>Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      
    </>
  );
};

export default Navbar;
