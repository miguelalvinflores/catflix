import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import catLoader from '../images/loader.png'
import addProfile from '../images/add-profile.png'
import editIcon from '../images/edit.png'
import * as profileActions from "../store/profile"
import "./CSS/ProfileTile.css"

function ProfileTile(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const userProfiles = useSelector((state) => state.profile.allProfiles);
    const currentProfile = useSelector((state) => state.profile.profile);
    const [profilesLoaded, setProfilesLoaded] = useState(false)
    // const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (sessionUser) {
            dispatch(profileActions.retrieveProfiles(sessionUser.id))
        }
    }, [ dispatch, sessionUser ]);

    useEffect(() => {
        if (userProfiles) {
            return setProfilesLoaded(true)
        }
    }, [userProfiles])

    const handleClick = profile => (e) => {
        e.preventDefault();
        if (location.pathname === "/manage_profiles") {
            props.select(profile)
            return props.action('edit')
        }
        if (props.where === "Navbar") {
            props.clicked()
        }
        dispatch(profileActions.selectProfile(profile))
        localStorage.setItem('chosenProfile', JSON.stringify(profile))
    }

    const handleAdd = (e) => {
        e.preventDefault()
        if (location.pathname === "/manage_profiles") {
            return props.action('create')
        }
        history.push({
            pathname: "/manage_profiles",
            state: {
                action: "create",
            },
        })
    }


    useEffect(() => {
        if (!currentProfile) {
            let fullTileContainer = document.querySelectorAll('.full-nav-tile__container')
            let tileContainer = document.querySelectorAll('.nav-tile__container')
            let tileName = document.querySelectorAll('.nav-tile__name')
            
                fullTileContainer.forEach(fullTile => {
                    fullTile.classList.add('full-tile__container')
                    fullTile.classList.remove('full-nav-tile__container')
                })
                tileContainer.forEach(tile => {
                    tile.classList.add('profile-tile__container')
                    tile.classList.remove('nav-tile__container')
                })
                tileName.forEach(tileName => {
                    tileName.classList.add('profile-tile__name')
                    tileName.classList.remove('nav-tile__name')
                })
            }
        
    })

    if (!profilesLoaded) {
        return (<img className="cat-loader" src={catLoader} alt='Loader' />)
    }
    
    if (userProfiles) {
        const profileList = userProfiles.profiles
        // console.log("LENGTH", profileList.length)
        let newProfile = null;
        if (profileList.length < 5 && !currentProfile) {
            newProfile = (
                <div className="add-profile__container" onClick={handleAdd}>
                    <img className="add-icon" src={addProfile} alt='Add Profile' />
                    <div className="add-profile__label">Add Profile</div>
                </div>
            )
        }

        let edit = null;
        if (props.where === "Manage") {
            edit = (
                <div className="edit-profile__container" style={{ backgroundImage: `url(${editIcon})` }} />
            )
        }

       
        return (
            <>
                {profileList?.map(profile => {
                    if (!currentProfile || profile[0].id !== currentProfile[0].id) {
                        return (
                            <div key={profile[0].id} className='full-nav-tile__container' onClick={handleClick(profile)}>
                                {edit}
                                <div className={edit ? 'nav-tile__container edit' : 'nav-tile__container'} style={{ backgroundImage: `url(${profile[1].image_url})` }} >
                                </div>
                                <div className="nav-tile__name">{profile[0].name}</div>
                            </div>
                        )
                        
                    } else {
                        return null
                    }
                })}
                {newProfile}

            </>

        )

    }



    return (<></>);
}



export default ProfileTile;
