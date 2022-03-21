import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, bio));
      if (data) {
        setErrors(data)
      }
    } else {
      const data = ["Passwords do not match, please try again"]
      setErrors(data)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  if (user) {
    return <Redirect to='/myphotos' />;
  }

  return (
    <Form onSubmit={onSignUp}>
      <div className="sign-up"> 
        <div>
        {errors.map((error, ind) => (
        <div key={ind} style={{color: "red"}}><b>{error}</b></div>
        ))}
        </div>
        <Form.Group className="mb-3" controlId="form.userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            className="signup-field"
            placeholder="User Name"
            name='username'
            onChange={updateUsername}
            value={username}
             />
        </Form.Group>
        <Form.Group className="mb-3" controlId="form.signupEmail">
      <Form.Label>Email address</Form.Label>
        <Form.Control
         type="email" 
         className="signup-field"
         placeholder="name@example.com" 
         name='email'
         onChange={updateEmail}
         value={email}
         />
      </Form.Group>
          <Form.Group className="mb-3" controlId="form.signupPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
              <Form.Control
               type="password" 
               className="signup-field"
               name='password'
               placeholder="Password"
               onChange={updatePassword}
               value={password}
                />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.signupRepeatPassword">
            <Form.Label column sm="2">
              Repeat Password
            </Form.Label>
              <Form.Control
               type="password" 
               className="signup-field"
               name='repeat_password'
               onChange={updateRepeatPassword}
               value={repeatPassword}
               required={true}
                />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.signupBiography">
            <Form.Label>Biography</Form.Label>
            <Form.Control
              as="textarea"
              className="signup-field"
              rows={3}
              name='bio'
              placeholder="Something about you..."
              onChange={updateBio}
              value={bio}
              required={true}
               />
          </Form.Group>
      </div>
      <Button type='submit' variant="primary" className="sign-up-button">Sign Up</Button>
    </Form>
  );
};

export default SignUpForm;
