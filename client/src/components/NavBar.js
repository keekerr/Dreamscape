import React from 'react';

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg bg-dark'>
      <div className='container-fluid p-1 px-3'>
        <a className='navbar-brand text-light'>DREAMSCAPE</a>

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
            <a className='nav-link text-light' aria-current='page' href='diary'>
              Diary
            </a>
            <a className='nav-link text-light' href='visionboard'>
              Vision Board
            </a>
            <a className='nav-link text-light' href='login'>
              Login
            </a>
            <a className='nav-link text-light text-align' href='signup'>
              Signup
            </a>
          </div>
        </div>
      </div>
    </nav>
    

  );
}

export default NavBar;
