import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom";

import ProfileTile from "./ProfileTile"
import CreateProfile from "./CreateProfile"
import "./CSS/ManageProfiles.css"

const ManageProfiles = () => {
    const location = useLocation()
    const history = useHistory()
    const [profileAction, setProfileAction] = useState(location.state ? location.state.action : null)
    const [selectedProfile, setSelectedProfile] = useState(null)

    localStorage.removeItem('chosenProfile')


    const doneClick = e => {
        e.preventDefault();
        history.push(`/browse`)
    }
    
    if (profileAction === "edit") {
        return (<CreateProfile act="Edit Profile" selected={selectedProfile} action={setProfileAction} />)
    } else if (profileAction === "create") {
        return (<CreateProfile act="Create Profile" action={setProfileAction} />)
    }


    return (
        <div className="select-profile__container">
            <div className="profile-list__text">Manage Profiles:</div>
            <div className="profile-list__container">
                <ProfileTile where="Manage" action={setProfileAction} select={setSelectedProfile} />
            </div>
            <div className="done-profiles-button" onClick={doneClick}>DONE</div>
        </div>
    )
}


export default ManageProfiles;