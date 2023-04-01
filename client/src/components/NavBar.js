import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg bg-dark'>
      <div className='container-fluid p-1 px-3'>
        <Link className='navbar-brand text-light' to='/'>DREAMSCAPE</Link>

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
            <Link className='nav-link text-light' aria-current='page' to='/diary'>
              Diary
            </Link>
            <Link className='nav-link text-light' to='/visionboard'>
              Vision Board
            </Link>
            <Link className='nav-link text-light' to='/login-signup'>
              Login/Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
