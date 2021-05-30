import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";

import * as profileActions from "../store/profile"
import "./CSS/ProfileTile.css"

function ProfileTile(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const userProfiles = useSelector((state) => state.profile.allProfiles);
    const currentProfile = useSelector((state) => state.profile.profile);
    // const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (sessionUser) {
            dispatch(profileActions.retrieveProfiles(sessionUser.id))
        }
    }, [ dispatch, sessionUser]);

    const handleClick = profile => (e) => {
        e.preventDefault();
        localStorage.setItem('chosenProfile', JSON.stringify(profile))
        dispatch(profileActions.selectProfile(profile))
        // history.push('/test')
    }

    const handleClickManagement = profile => (e) => {
        e.preventDefault();
        console.log("TESTING MANAGE")
    }

    console.log("PROPS LOCATION:", props.where)

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
    
    if (userProfiles) {
        const profileList = userProfiles.profiles

        return (
            <>
                {profileList?.map(profile => {
                    if (!currentProfile || profile[0].id !== currentProfile[0].id) {
                        return (
                            <div key={profile[0].id} className='full-nav-tile__container' onClick={handleClick(profile)}>
                                <div className='nav-tile__container' style={{ backgroundImage: `url(${profile[1].image_url})` }} >
                                </div>
                                <div className="nav-tile__name">{profile[0].name}</div>
                            </div>
                        )
                        
                    }
                })}


            </>

        )

    }



    return (<></>);
}



export default ProfileTile;
