import React from "react";
import { useHistory } from "react-router-dom";

import ProfileTile from "./ProfileTile"

import "./CSS/SelectProfile.css"

const SelectProfile = () => {
    const history = useHistory()

    const manageProfileClick = e => {
        e.preventDefault();
        history.push(`/manage_profiles`)
    }
    
    return (
        <div className="select-profile__container">
            <div className="profile-list__text">Who's watching?</div>
            <div className="profile-list__container">
                <ProfileTile where="Select"/>
            </div>
            <div className="manage-profiles-button" onClick={manageProfileClick}>MANAGE PROFILES</div>
        </div>
    )
}


export default SelectProfile;