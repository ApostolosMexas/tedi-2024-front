import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';


const Auth = ({}) => {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='*' element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default Auth;
