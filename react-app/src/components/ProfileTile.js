import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";

import * as profileActions from "../store/profile"

function ProfileTile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const userProfiles = useSelector((state) => state.profile.allProfiles);
    // const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (sessionUser) {
            dispatch(profileActions.retrieveProfiles())
        }
    }, [dispatch]);

   

    if (userProfiles) {

        return (
            <>
                {userProfiles?.map(profile => {
                    return (
                        <div key={profile.id} className='profile-tile__container' /*style={{ backgroundImage: `url(${})` }} onClick={handleClick(profile.id)}*/ >
                            <span>{profile.name}</span>
                        </div>
                    )
                })}

            </>

        )

    }



    return (<></>);
}



export default ProfileTile;