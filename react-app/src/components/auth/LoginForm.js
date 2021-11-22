import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
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
    return <Redirect to='/photos' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div className="sign-up-log-in">  
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'><b>Email</b></label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required={true}
          />
        </div>
        <div>
          <label htmlFor='password'><b>Password</b></label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required={true}
          />
          <button id="login" className="modal-button" type='submit'>Login</button> <br />
          <button id="demo-login" className="modal-button" onClick={() => {
            demoLogin();
          }}>Demo Login</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
