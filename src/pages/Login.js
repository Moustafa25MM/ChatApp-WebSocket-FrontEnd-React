import React, { useContext, useState } from 'react';
import { Container, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useLoginUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import '../CSS/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  const { socket } = useContext(AppContext);

  function handleLogin(e) {
    e.preventDefault();
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        //socket
        //navigate to chat

        socket.emit('new-user');
        navigate('/chat');
      }
    });
  }

  return (
    <Container style={{ backgroundColor: '#f2f2f2', height: '100vh' }}>
      <Row>
        <Col md={5} className='login_bg'></Col>
        <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleLogin}>
            <h2 style={{ color: '#4E5D6C', textAlign: 'center', marginBottom: '30px' }}>Welcome Back</h2>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              {error && <p className='alert alert-danger'>{error.data}</p>}
              <Form.Label style={{ color: '#4E5D6C' }}>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} required />
              <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label style={{ color: '#4E5D6C' }}>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
            </Form.Group>
            <Button variant='primary' type='submit' style={{ backgroundColor: '#4E5D6C', borderColor: '#4E5D6C' }}>
              {isLoading ? <Spinner animation='grow' /> : 'Login'}
            </Button>
            <div className='py-4'>
              <p className='text-center' style={{ color: '#4E5D6C' }}>
                Don't have an Account? <Link to='/signup'>Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;