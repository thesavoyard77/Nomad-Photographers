import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Test from './components/Test';
import User from './components/User';
import Explore from './components/Explore'
import SessionUserPage from './components/SessionUserPage';
import { authenticate } from './store/session';
import AboutPage from './components/About';
import Home from './components/Home'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <ProtectedRoute path='/myphotos'>
          <SessionUserPage />
          </ProtectedRoute>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/about' exact={true}>
          <AboutPage />
        </Route>
        <Route path='/test' exact={true}>
          <Test />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/explore' exact={true} >
          <Explore />
        </Route>
        <Route path='/' exact={true} >
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
