import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import * as profileActions from "../../store/profile";

import "../CSS/ProfileButton.css";

const LogoutButton = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    history.push("/");
    dispatch(logout());
    dispatch(profileActions.logoutProfile());
    localStorage.removeItem("chosenProfile");
  };

  return (
    <div className="profile-signout-btn" onClick={onLogout}>
      Sign out of Catflix
    </div>
  );
};

export default LogoutButton;
