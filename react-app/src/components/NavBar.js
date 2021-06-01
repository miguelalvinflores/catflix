import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ProfileButton from './ProfileButton'
import Searchbar from './SearchBar'
import './CSS/NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector( state => state.session.user);
  const profile = useSelector((state) => state.profile.profile);
  const location = useLocation()

  useEffect(() => {
    let navBar = document.querySelector('nav')
    if (location.pathname === '/sign-up' || sessionUser) {
      navBar.classList.add('logged-in')
    } else {
      navBar.classList.remove('logged-in')
    }
  })

  let sessionLinks;
  if (sessionUser) {
    if (profile) {
      sessionLinks = (
        <>
          <div>
            <a href='/browse' className='home-nav'>Home</a>
            <Searchbar />
            <div className="nav-profile-btn__container" >
              <ProfileButton user = {sessionUser} /> 
              <img className="triangle-icon" src="images/nav-triangle.png" />
            </div>
          </div>

        </>

      );
    }

  } else {
    sessionLinks = (
      <button className='btn-red authLinks'>
        <NavLink to='/login' className='login-nav' style={{ textDecoration: 'none' }}>Sign In</NavLink>
      </button>
    )
  }

  return (
    <nav>
      <a className='logo-container' href='/' exact="true" activeclassname="active">
        <img src="https://fontmeme.com/permalink/210524/34096974b6eb42471ca7fafc9afb884e.png" alt="Catflix banner" border="0" />
      </a>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
