import React from "react"
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/session";
import ProfileTile from "./ProfileTile"
import * as profileActions from "../store/profile"

const ManageProfiles = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    alert("Sorry, Manage Profile is currently unavailable. Redirecting to DEMO Account Select Profile.")
    dispatch(profileActions.logoutProfile())
    dispatch(logout())
    localStorage.removeItem('chosenProfile')
    dispatch(login("demo@aa.io", "password"));


    const doneClick = e => {
        e.preventDefault();
        history.push(`/browse`)
    }
    return (
        <div className="select-profile__container">
            <div className="profile-list__text">Manage Profiles:</div>
            <div className="profile-list__container">
                <ProfileTile where="Manage" />
            </div>
            <div className="manage-profiles-button" onClick={doneClick}>DONE</div>
        </div>
    )
}


export default ManageProfiles;