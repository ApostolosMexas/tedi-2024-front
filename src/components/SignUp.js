import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { apiCallsUser } from '../api/calls/user';
import { apiCallsAuth } from '../api/calls/auth';
import '../assets/css/components/signup.css';


const SignUp = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState({})

  const navigate = useNavigate();

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleConfirmPasswordUpdate = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  const handleUserInfoUpdate = (label, e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [label]: e.target.value,
    });
  };

  const handleAvatarUpdate = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      Avatar: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    try {
      const signUpResponse = await apiCallsUser.User.signup(email, password, userInfo);
      const newUser = signUpResponse.data;

      const loginResponse = await apiCallsAuth.Authentication.login(email, password);
      const data = loginResponse.data;
      dispatch(loginSuccess({userId: newUser.Id, accessToken: data.AccessToken}));
      navigate('/index/');
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <Row>
      <Col className='signup-container'>
        <Card className='p-3 border-0 signup-card'>
          <CardHeader className='border-0 signup-header'>
            <h4>Εγγραφή</h4>
          </CardHeader>
          <CardBody className='signup-body'>
            <Form>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                onChange={(e) => handleEmailUpdate(e)}
                value={email}
              />
              <Row>
                <Col>
                  <Label>Κωδικός</Label>
                  <Input
                    name="password"
                    type="password"
                    onChange={(e) => handlePasswordUpdate(e)}
                    value={password}
                  />
                </Col>
                <Col>
                  <Label>Επιβεβαίωση Κωδικού</Label>
                  <Input
                    name="password"
                    type="password"
                    onChange={(e) => handleConfirmPasswordUpdate(e)}
                    value={confirmPassword}
                  />
                </Col>
              </Row>
              <Label>Όνομα Χρήστη</Label>
              <Input
                name="username"
                type="input"
                onChange={(e) => handleUserInfoUpdate('Username', e)}
                value={userInfo.Username}
                maxLength={20}
              />
              <Row>
                <Col>
                  <Label>Όνομα</Label>
                  <Input
                    name="name"
                    type="input"
                    onChange={(e) => handleUserInfoUpdate('Name', e)}
                    value={userInfo.Name}
                  />
                </Col>
                <Col>
                  <Label>Επίθετο</Label>
                  <Input
                    name="surname"
                    type="input"
                    onChange={(e) => handleUserInfoUpdate('Surname', e)}
                    value={userInfo.Surname}
                  />
                </Col>
              </Row>
              <Label>Τηλέφωνο Επικοινωνίας</Label>
              <Input
                name="phone number"
                type="phone"
                onChange={(e) => {
                  if (/^-?\d+$/.test(e.target.value) || e.target.value === '') {
                    handleUserInfoUpdate('Phone', e);
                  }
                }}
                value={userInfo.Phone}
              />
              <Label>Avatar</Label>
              <input
                type="file"
                onChange={(e) => handleAvatarUpdate(e)}
              />
            </Form>
            <Button
              className='signup-submit'
              onClick={() => handleSubmit()}
              disabled={
                email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || !email.includes('@') || password !== confirmPassword ||
                userInfo.Username === undefined || userInfo.Username.trim() === '' ||
                userInfo.Name === undefined || userInfo.Name.trim() === '' ||
                userInfo.Surname === undefined || userInfo.Surname.trim() === '' ||
                userInfo.Phone === undefined || userInfo.Phone.trim() === '' ||
                userInfo.Avatar === undefined || userInfo.Avatar == {}
              }
            >
              Υποβολή
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
 
export default SignUp;