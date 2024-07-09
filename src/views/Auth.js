import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from 'reactstrap';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import '../assets/css/auth.css';

const Auth = ({}) => {

  return (
    <Container className='auth-container' fluid>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Container>
  );
};

export default Auth;
