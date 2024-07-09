import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { apiCallsUser } from '../api/calls/user';
import { apiCallsAuth } from '../api/calls/auth';
import '../assets/css/components/signup.css';


const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSubmit = async () => {
    try {
      await apiCallsUser.User.signup(email, password);
      const response = await apiCallsAuth.Authentication.login(email, password);
      const data = response.data;
      localStorage.setItem("tedi-token", data.AccessToken);
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
            <h4>Είσοδος</h4>
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
              <Label>Κωδικός</Label>
              <Input
                name="password"
                type="password"
                onChange={(e) => handlePasswordUpdate(e)}
                value={password}
              />
              <Label>Επιβεβαίωση Κωδικού</Label>
              <Input
                name="password"
                type="password"
                onChange={(e) => handleConfirmPasswordUpdate(e)}
                value={confirmPassword}
              />
            </Form>
            <Button
              className='signup-submit'
              onClick={() => handleSubmit()}
              disabled={
                email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || !email.includes('@') || password !== confirmPassword
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