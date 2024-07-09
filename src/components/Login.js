import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { apiCalls } from '../api/calls/auth';
import '../assets/css/components/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      const response = await apiCalls.Authentication.login(email, password);
      console.log(response.data);
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
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
 
export default Login;