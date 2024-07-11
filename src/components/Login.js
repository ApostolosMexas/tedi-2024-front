import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { apiCallsAuth } from '../api/calls/auth';
import '../assets/css/components/login.css';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try{
      const response = await apiCallsAuth.Authentication.login(email, password);
      const data = response.data;
      dispatch(loginSuccess({userId: data.UserId, accessToken: data.AccessToken}));
      navigate('/index/');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Row>
      <Col className='login-container'>
        <Card className='p-3 border-0 login-card'>
          <CardHeader className='border-0 login-header'>
            <h4>Είσοδος</h4>
          </CardHeader>
          <CardBody className='login-body'>
            <Form>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                onChange={(e) => handleEmailUpdate(e)}
                value={email}
              />
              <Label>Κωδικός</Label>
              <Input
                name="password"
                type="password"
                onChange={(e) => handlePasswordUpdate(e)}
                value={password}
              />
            </Form>
            <Button
              className='login-submit'
              onClick={() => handleSubmit()}
              disabled={
                email.trim() === '' || password.trim() === '' || !email.includes('@')
              }
            >
              Υποβολή
            </Button>
            <Button
                className='signup-btn'
                onClick={navigate('/auth/signup')}
              >
              Εγγραφή
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
 
export default Login;