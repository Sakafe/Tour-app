import React, { useContext, useEffect } from 'react';
import { Routes, useNavigate, } from 'react-router-dom';
import { MyContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useContext(MyContext);
    useEffect(() =>{
        const login = localStorage.getItem('login');
        if(!login){
            navigate('/login')
        }
    })
    return (
       <div>

       </div>
    );
};

export default PrivateRoute;

