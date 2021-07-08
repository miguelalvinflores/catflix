import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import LogoutButton from './auth/LogoutButton';
import navtriangle from '../images/navtriangle.png'
import ProfileTile from "./ProfileTile"
import * as profileActions from "../store/profile"
import "./CSS/ProfileButton.css"

const ProfileButton = ({ user }) => {
    const profile = useSelector((state) => state.profile.profile);
    const[showMenu, setshowMenu] = useState(false);
    const history = useHistory()
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setshowMenu(true);
    };

    const closeMenu = () => {
        if(!showMenu) return;
        setshowMenu(false);
    };


    return (
        <div className='profile-container' onMouseEnter={openMenu} onMouseLeave={closeMenu}>
            <div className='profile-btn' style={{ backgroundImage: `url(${profile[1].image_url})` }}  ></div>
            {showMenu && (
                <>
                <img className="triangle-dropdown" src={navtriangle} alt='dropdown arrow'/>
                <ul className='profile-dropdown' >
                    <ProfileTile where="Navbar" clicked={closeMenu} />
                    <div className='profile-manage-btn' onClick={(e) => {
                        e.preventDefault()
                        dispatch(profileActions.logoutProfile())
                        history.push(`/manage_profiles`)
                    }}>Manage Profile</div>
                    <hr/>
                    <LogoutButton />
                </ul>
                </>
            )}
        </div>
    )
};
export default ProfileButton;
