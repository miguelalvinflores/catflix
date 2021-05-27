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
    const profile = useSelector((state) => state.profile.profile);
    // const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (sessionUser) {
            dispatch(profileActions.retrieveProfiles(sessionUser.id))
        }
    }, [sessionUser]);

    const handleClick = profile => (e) => {
        e.preventDefault();
        localStorage.setItem('chosenProfile', JSON.stringify(profile))
        dispatch(profileActions.selectProfile(profile))
        // history.push('/test')
    }

    console.log("PROPS LOCATION:", props.where)

    useEffect(() => {
        if (!profile) {
            let tileContainer = document.querySelectorAll('.nav-tile')
            let tileName = document.querySelectorAll('.profile-tile__name')
            
            // if (props.where === "Navbar") {
                tileContainer.forEach(tile => tile.classList.add('profile-tile__container'))
                // tileContainer.forEach(tile => tile.classList.remove('profile-tile__container'))
                // tileContainer.classList.add('nav-tile')
                // tileName.classList.add('nav-tile')
            // }
        }
        
    })
    
    if (userProfiles) {
        const profileList = userProfiles.profiles

        return (
            <>
                {profileList?.map(profile => {
                    return (
                        <div key={profile[0].id} className='nav-tile' style={{ backgroundImage: `url(${profile[1].image_url})` }} onClick={handleClick(profile)} >
                            {/* <span className="profile-tile__name">{profile[0].name}</span> */}
                        </div>
                    )
                })}

            </>

        )

    }



    return (<></>);
}



export default ProfileTile;