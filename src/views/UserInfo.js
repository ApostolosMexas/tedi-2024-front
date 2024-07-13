import React from 'react';
import { Container, Row } from 'reactstrap';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserDetails from '../components/UserInfo';

const UserInfo = () => {

  return (
    <Container className='main-content' fluid>
      <Row>
        <Routes>
            <Route path=':id' element={<UserDetails />} />
            <Route
              path='*'
              element={<Navigate to="/index/user" replace/>} 
            />
          </Routes>
      </Row>
    </Container>
  );
}
 
export default UserInfo;