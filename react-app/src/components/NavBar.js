import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ProfileButton from './ProfileButton'
import './CSS/NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector( state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>Placeholder for nav links when signed in</li>
        <li>
          <ProfileButton user = {sessionUser} />
        </li>

      </>

    );
  } else {
    sessionLinks = (
      <button className='login-btn authLinks'>
        <NavLink to='/login' className='login-nav' style={{ textDecoration: 'none' }}>Sign In</NavLink>
      </button>
    )
  }

  return (
    <nav>
      <NavLink to="/" exact={true} activeClassName="active">
        <img src="https://fontmeme.com/permalink/210524/34096974b6eb42471ca7fafc9afb884e.png" alt="Catflix banner" border="0" />
      </NavLink>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
