import React from 'react'
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user || user.isAdmin !== true){
        return <><h1>You're not Admin</h1></>
    }
  return children;
}

export default AdminRoute
