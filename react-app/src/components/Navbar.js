import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button, Offcanvas} from 'react-bootstrap';
import { GoGlobe } from 'react-icons/go'
import { GiHamburgerMenu } from 'react-icons/gi'
import Modal from 'react-modal'
import LoginForm from './auth/LoginForm'
import SignUpForm from './auth/SignUpForm'
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
              <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
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