import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import LogoutButton from './auth/LogoutButton';

import ProfileTile from "./ProfileTile"
import "./CSS/ProfileButton.css"

const ProfileButton = ({ user }) => {
    const location = useLocation()
    const[showMenu, setshowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setshowMenu(true);
        console.log("FROM NAV", location)
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setshowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return() => document.removeEventListener('click', closeMenu);
    }, [showMenu]);


    

    return (
        <div className= 'profile-container'>
            <button className='profile-btn' onClick={openMenu}>
                Account
            </button>
            {showMenu && (
                <ul className='profile-dropdown'>
                    <li>Placeholder for profiles here</li>
                    <ProfileTile where="Navbar" />
                </ul>
            )}
        </div>
    )
};
export default ProfileButton;
