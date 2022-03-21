import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import Button from 'react-bootstrap/Button'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <Button variant="danger" onClick={onLogout} className="logout">Logout</Button>;
};

export default LogoutButton;
