import React, { useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import { apiCallsUser } from '../api/calls/user';
import { apiCallsAuth } from '../api/calls/auth';
import '../assets/css/components/settings.css';
import { Password } from '@mui/icons-material';

const Settings = () => {
  const userId = localStorage.getItem('userId');
  const [newEmailRequest, setNewEmailRequest] = useState({
    email: '',
    newEmail: '',
    password: '',
  });
  const [newPasswordRequest, setNewPasswordRequest] = useState({
    email: '',
    password: '',
    newPassword: '',
  });

  const handleNewEmailRequest = async () => {
    await apiCallsUser.User.updateUser(
      userId,
      newEmailRequest.email,
      newEmailRequest. password,
      { Email: newEmailRequest.newEmail, }
    );
  };

  const handleNewPasswordRequest = async () => {
    await apiCallsUser.User.updateUser(
      userId,
      newPasswordRequest.email,
      newPasswordRequest. password,
      { Password: newPasswordRequest.newPassword, }
    );
  };

  return (
    <div className='settings-container'>
      <h2>Ρυθμίσεις</h2>
      <div className='change-email'>
        <h5>Αλλαγή email</h5>
        <Row>
          <Col xs={2}>
            <Input
              value={newEmailRequest.email}
              onChange={(e) => setNewEmailRequest({
                ...newEmailRequest,
                email: e.target.value
              })}
              placeholder='Τωρινό Email'
            />
          </Col>
          <Col xs={2}>
            <Input
              value={newEmailRequest.newEmail}
              onChange={(e) => setNewEmailRequest({
                ...newEmailRequest,
                newEmail: e.target.value
              })}
              placeholder='Νέο Email'
            />
          </Col>
          <Col xs={2}>
            <Input
              value={newEmailRequest.password}
              onChange={(e) => setNewEmailRequest({
                ...newEmailRequest,
                password: e.target.value
              })}
              placeholder='Κωδικός'
              type='password'
            />
          </Col>
          <Col xs={2}>
            <Button
              className='change-submit'
              onClick={() => handleNewEmailRequest()}
              disabled={
                newEmailRequest.email.trim() === '' ||
                newEmailRequest.password.trim() === '' ||
                newEmailRequest.newEmail.trim() === ''
              }
            >
              Αποθήκευση
            </Button>
          </Col>
        </Row>
      </div>
      <div className='change-email'>
        <h5>Αλλαγή κωδικού</h5>
        <Row>
          <Col xs={2}>
            <Input
              value={newPasswordRequest.email}
              onChange={(e) => setNewPasswordRequest({
                ...newPasswordRequest,
                email: e.target.value
              })}
              placeholder='Email'
            />
          </Col>
          <Col xs={2}>
            <Input
              value={newPasswordRequest.password}
              onChange={(e) => setNewPasswordRequest({
                ...newPasswordRequest,
                password: e.target.value
              })}
              placeholder='Τωρινός Κωδικός'
              type='password'
            />
          </Col>
          <Col xs={2}>
            <Input
              value={newPasswordRequest.newPassword}
              onChange={(e) => setNewPasswordRequest({
                ...newPasswordRequest,
                newPassword: e.target.value
              })}
              placeholder='Νέος Κωδικός'
              type='password'
            />
          </Col>
          <Col xs={2}>
            <Button
              className='change-submit'
              onClick={() => handleNewPasswordRequest()}
              disabled={
                newPasswordRequest.email.trim() === '' ||
                newPasswordRequest.password.trim() === '' ||
                newPasswordRequest.newPassword.trim() === ''
              }
            >
              Αποθήκευση
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
 
export default Settings;