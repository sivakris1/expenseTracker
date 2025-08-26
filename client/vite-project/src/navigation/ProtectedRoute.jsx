import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/users/Login';

const ProtectedRoute = ({children}) => {
    const user = useSelector((state)=> state?.users)
    const {userAuth} = user

    if(!userAuth){
        return <Login/>
    }
  return children
}

export default ProtectedRoute
