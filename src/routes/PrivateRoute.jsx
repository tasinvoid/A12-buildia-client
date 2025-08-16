import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user,loading} = UseAuth()
    if(loading){
        return <span className="loading loading-spinner"></span>
    }
    if(!user){
        return <Navigate to={'/auth'} state={{from:location}}></Navigate>
    }
   
    return children;
};

export default PrivateRoute;