import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const[showMenu, setshowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setshowMenu(true);
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
                </ul>
            )}
        </div>
    )
};
export default ProfileButton;
