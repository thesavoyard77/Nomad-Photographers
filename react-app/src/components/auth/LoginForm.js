import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './SignUpForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    // e.preventDefault();
    setEmail('')
    setPassword('')
    const demoEmail = 'demo@aa.io'
    const demoPassword = 'password'
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/myphotos' />;
  }

  return (
    <Form onSubmit={onLogin}>
      <div className="sign-up-log-in">  
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="login-field"
            type="email"
            placeholder="Enter email" 
            name='email'
            value={email}
            onChange={updateEmail}
            required={true}
            />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
           className="login-field"
           type="password" 
           placeholder="Password" 
           name='password'
           value={password}
           onChange={updatePassword}
           required={true}
           />
        </Form.Group>
        <Button variant="primary" type="submit" className="login-buttons">
          Submit
        </Button>
        <Button variant="primary" className="login-buttons" onClick={() => {
            demoLogin();
          }}>Demo Login</Button>
      </div>
    </Form>
  );
};

export default LoginForm;
