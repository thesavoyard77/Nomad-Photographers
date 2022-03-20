import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
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
    <form onSubmit={onSignUp}>
      <div className="sign-up-log-in"> 
        <div>
        {errors.map((error, ind) => (
        <div key={ind} style={{color: "red"}}><b>{error}</b></div>
        ))}
        </div>
        <div>
          <label className="label-txt"><b>User Name</b></label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label><b>Email</b></label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label><b>Password</b></label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label><b>Repeat Password</b></label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
        ></input>
        </div>
        <div>
          <label><b>Biography</b></label>
          <input
            type='text'
            name='bio'
            onChange={updateBio}
            value={bio}
            required={true}
        ></input>
        </div>
      </div>
      <button type='submit' className="sign-up-button">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
