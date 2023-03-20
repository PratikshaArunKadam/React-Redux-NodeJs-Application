import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../loginFeatures/userSlice';

const Logout = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
dispatch(logout());
navigate('/');
    },[])
    return (
        <div>
            
        </div>
    );
};

export default Logout;