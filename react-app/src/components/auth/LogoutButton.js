import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import * as profileActions from "../../store/profile"

import "../CSS/ProfileButton.css"

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(logout());
    dispatch(profileActions.logoutProfile())
    localStorage.removeItem('chosenProfile')
  };

  return <div className="profile-signout-btn" onClick={onLogout}>Sign out of Catflix</div>;
};

export default LogoutButton;
