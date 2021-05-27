import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";

import * as profileActions from "../store/profile"
import "./CSS/ProfileTile.css"

function ProfileTile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const userProfiles = useSelector((state) => state.profile.allProfiles);
    // const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (sessionUser) {
            dispatch(profileActions.retrieveProfiles(sessionUser.id))
        }
    }, [sessionUser]);

    const handleClick = profile => (e) => {
        e.preventDefault();
        dispatch(profileActions.selectProfile(profile))
        // history.push('/test')
    }

    
    if (userProfiles) {
        const profileList = userProfiles.profiles

        return (
            <>
                {profileList?.map(profile => {
                    return (
                        <div key={profile[0].id} className='profile-tile__container' style={{ backgroundImage: `url(${profile[1].image_url})` }} onClick={handleClick(profile)} >
                            <span className="profile-tile__name">{profile[0].name}</span>
                        </div>
                    )
                })}

            </>

        )

    }



    return (<></>);
}



export default ProfileTile;