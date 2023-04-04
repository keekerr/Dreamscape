import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Container, Navbar, Nav } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar className='navbar' collapseOnSelect expand='lg'>
      <Container fluid>
        <Navbar.Brand>
          <img
            className='navbar-brand mx-3'
            src='./images/logoblack.png'
            height={75}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Nav>
            <Nav.Link href='/visionboard'>Vision Board</Nav.Link>
            <Nav.Link href='/diary'>Diary</Nav.Link>
            {Auth.loggedIn() ? (
              <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
            ) : (
              <Link
                className='nav-link'
                to='/login-signup'
                activeClassName='nav-link:active'
              >
                Login/Signup
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

