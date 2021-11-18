import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm'
import SignUpForm from './auth/SignUpForm'
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import Modal from 'react-modal'
import './Navbar.css'
import { GoGlobe } from 'react-icons/go'

const NavBar = () => {
const sessionUser = useSelector((state) => state.session?.user);
const [ modalIsOpen, setModalIsOpen ] = useState(false)

Modal.setAppElement('#root')
  return (
    <nav className="nav">
      <ul className="nav-ul">
        <li className="logo-li">
          <p className="logo">Nomad <GoGlobe /> Photographers</p>
        </li>
      <li>
          <NavLink to='/' exact={true} className="navlink" activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/explore' exact={true} className="navlink" activeClassName='active'>
            Explore
          </NavLink>
        </li>
        <li>
        {sessionUser && 
                  <NavLink to='/photos' exact={true} className="navlink" activeClassName='active'>
                  My Travels
                </NavLink>}
        </li>
        {/* <li>
          <NavLink to='/users' exact={true} className="navlink" activeClassName='active'>
            Social
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/about' exact={true} className="navlink" activeClassName='active'>
            About
          </NavLink>
        </li> */}
        <li>
          <button className="account-button" onClick={() => setModalIsOpen(true)}>Account</button>
          <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
              {!sessionUser &&
              <>
              <h2> Log In </h2>
               <LoginForm /> <br />
               <h2>~ Or ~</h2> <br />
               <h2>Sign Up</h2>
               <SignUpForm />
               </>
               }
              {sessionUser && <LogoutButton />}
              {/* <button className="modal-button" onClick={() => setModalIsOpen(false)}>Close</button> */}
          </Modal>

        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
