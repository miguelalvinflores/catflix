import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';

import ProfileTile from "./ProfileTile"
import "./CSS/ProfileButton.css"

const ProfileButton = ({ user }) => {
    const profile = useSelector((state) => state.profile.profile);
    const[showMenu, setshowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setshowMenu(true);
    };

    const closeMenu = () => {
        if(!showMenu) return;
        setshowMenu(false);
    };
    useEffect(() => {
        if (!showMenu) return;
        // setshowMenu(false);

        document.addEventListener('click', closeMenu);

        return() => document.removeEventListener('click', closeMenu);
    }, [showMenu]);


    

    return (
        <div className='profile-container' onMouseLeave={closeMenu}>
            <div className='profile-btn' style={{ backgroundImage: `url(${profile[1].image_url})` }} onMouseEnter={openMenu} ></div>
            {showMenu && (
                <ul className='profile-dropdown' >
                    <ProfileTile where="Navbar" />
                    <h1>Manage Profile</h1>
                </ul>
            )}
        </div>
    )
};
export default ProfileButton;
