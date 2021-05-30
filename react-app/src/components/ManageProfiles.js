import React from "react"
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProfileTile from "./ProfileTile"
import * as profileActions from "../store/profile"

const ManageProfiles = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    dispatch(profileActions.logoutProfile())
    localStorage.removeItem('chosenProfile')

    const doneClick = e => {
        e.preventDefault();
        history.push(`/manage_profiles`)
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