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
          {!sessionUser && <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                   style={{
                    overlay: {
                        position: 'fixed',
                        top:-50,
                        left: 150,
                        right: 50,
                        bottom: -50,
                        backgroundColor: 'rgba(1, 1, 1, 0.750.33)',
                        zIndex: 5,
                    },
                    content: {
                        position: 'absolute',
                        top: '15%',
                        left: '55%',
                        right: '10%',
                        bottom: '20%',
                        border: '5px solid #BBA084',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '6px',
                        outline: 'none',
                        padding: '20px',
                        backgroundColor: '#F5F5F5',
                        
                      }
                    
                }}
          >
              <>
              <h2> Log In </h2>
               <LoginForm /> <br />
               <h2>~ Or ~</h2> <br />
               <h2>Sign Up</h2>
               <SignUpForm />
               </>
               </Modal>}
               
               {sessionUser && 
               <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
               style={{
                overlay: {
                    position: 'fixed',
                    top: 100,
                    left: 150,
                    right: 50,
                    bottom: 100,
                    backgroundColor: 'rgba(1, 1, 1, 0.750.33)'
                },
                content: {
                    position: 'absolute',
                    top: '-5%',
                    left: '77%',
                    right: '6%',
                    bottom: '55%',
                    border: '5px solid #BBA084',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '6px',
                    outline: 'none',
                    padding: '20px',
                    backgroundColor: '#F5F5F5',
                  }
                
            }}
      > 
      {sessionUser && 
        <div className="account-logged-in">
          <h2>Current User:</h2>
          <p><b>{sessionUser?.username?.split("")[0].toUpperCase() + sessionUser?.username?.slice(1)}</b></p>
          <p><b>{sessionUser.email}</b></p>
          <LogoutButton />
        </div>}
      </Modal>
               }
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
