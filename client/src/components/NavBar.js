import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg custom-navbar'>
      <div className='container-fluid p-1'>
        <img className='navbar-brand' src='./images/logotextonly.png' height={75} />
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <Link className='nav-link' to='/visionboard'>
              Vision Board
            </Link>
            <Link className='nav-link' aria-current='page' to='/diary'>
              Diary
            </Link>
            {Auth.loggedIn() ? (
                <>
                  <Link className='nav-link' onClick={Auth.logout}>Logout</Link>
                </>
              ) : (
                <Link className='nav-link' to='/login-signup'>
                  Login/Signup
                </Link>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
