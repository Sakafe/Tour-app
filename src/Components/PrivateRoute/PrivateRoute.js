// import React, { useContext, useEffect } from 'react';
// import { Routes, useNavigate, } from 'react-router-dom';
// import { MyContext } from '../../App';

// const PrivateRoute = ({children, ...rest}) => {
//     const navigate = useNavigate();
//     const [loggedIn,setLoggedIn] = useContext(MyContext);
//     useEffect(() =>{
//         const login = localStorage.getItem('login');
//         if(!login){
//             navigate('/login')
//         }
//     })
//     return (
//         <div>
 
//         </div>
//      );
// };

// export default PrivateRoute;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ component: component, ...rest }) => {
//   const token = localStorage.getItem("token");
//   return token ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { MyContext } from '../../App';
import Booking from '../Booking/Booking';



const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn, setLoggedIn } = useContext(MyContext);
  if (loggedIn === true) {
    return <Booking></Booking>;
  }
  if (loggedIn?.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
            
};

export default PrivateRoute;