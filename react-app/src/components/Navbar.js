import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button, Offcanvas} from 'react-bootstrap';
import { GoGlobe } from 'react-icons/go'
import { GiHamburgerMenu } from 'react-icons/gi'
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css'

const NavComponant = () => {
  const sessionUser = useSelector((state) => state.session?.user);
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
    return (
        <>
    <Navbar variant="light" expand={false} className="color-nav" >
      <Container fluid className="navbar-outer">
        <Navbar.Brand href="/" ><h3 className="nav-text-colors">Nomad <GoGlobe className="globe" /> Photographers</h3></Navbar.Brand>
        <Navbar.Toggle  ><GiHamburgerMenu className="hamburger" /> </Navbar.Toggle>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Navigation</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/myphotos">My Photos</Nav.Link>
              <Nav.Link href="/explore">Explore</Nav.Link>
              <NavDropdown title="Account" id="offcanvasNavbarDropdown">
              {sessionUser && 
                <div className="account-logged-in">
                  <h2>Current User:</h2>
                  <p><b>{sessionUser?.username?.split("")[0].toUpperCase() + sessionUser?.username?.slice(1)}</b></p>
                  <p><b>{sessionUser.email}</b></p>
                  <LogoutButton />
                </div>}
                {!sessionUser && 
                <div>
                <NavDropdown.Item href="login">Log In</NavDropdown.Item>
                <NavDropdown.Item href="sign-up">Sign Up</NavDropdown.Item>
                </div>}
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
              
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
        </>
    )
}

export default NavComponant;