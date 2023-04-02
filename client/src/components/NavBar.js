import React from 'react';

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
            <a className='nav-link mx-2' aria-current='page' href='diary'>
              Diary
            </a>
            <a className='nav-link mx-2' aria-current='page' href='/'>
              Vision Board
            </a>
            <a className='nav-link mx-2' aria-current='page' href='login-signup'>
              Login/Signup
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
