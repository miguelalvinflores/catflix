import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import navtriangle from '../images/navtriangle.png'
import ProfileButton from './ProfileButton'
import Searchbar from './SearchBar'
import './CSS/NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector( state => state.session.user);
  const profile = useSelector(state => state.profile.profile);
  const location = useLocation()
  const [home, setHome] = useState(false)

  useEffect(() => {
    let navBar = document.querySelector('nav')
    if (location.pathname === '/sign-up' || sessionUser) {
      navBar.classList.add('logged-in')
    } else {
      navBar.classList.remove('logged-in')
    }
    
  }, [location.pathname, sessionUser])

  useEffect(() => {
    if (home) {
      setHome(false)
    }
  }, [home])

  const handleHome = () => {
    setHome(true)
  }

  let sessionLinks;
  if (sessionUser) {
    if (profile) {
      sessionLinks = (
        <>
          <div>
            <div>
              <NavLink to='/browse' className='home-nav' onClick={handleHome}>Home</NavLink>
              <NavLink to='/bookmarks' className='bookmark-nav'>Bookmarks</NavLink>
            </div>
            <Searchbar home={home} />
            <div className="nav-profile-btn__container" >
              <ProfileButton user = {sessionUser} />
              <img className="triangle-icon" src={navtriangle} alt='dropdown arrow'/>
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
      <NavLink className='logo-container' to='/' exact activeclassname="active" onClick={handleHome}>
        <img src="https://fontmeme.com/permalink/210524/34096974b6eb42471ca7fafc9afb884e.png" alt="Catflix banner" border="0" />
      </NavLink>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
