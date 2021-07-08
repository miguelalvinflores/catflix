import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import editIcon from '../images/edit.png'
import anonymousPic from '../images/anonymous.jpg'
import * as profileActions from "../store/profile"
import ChooseIcon from "./ChooseIcon"
import "./CSS/ProfileForm.css"

const CreateProfile = ({ act, selected, action }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const [profileName, setProfileName] = useState(selected ? selected[0].name : "")
    const [profileIcon, setProfileIcon] = useState(selected ? selected[1] : null)
    const [chooseIcon, setChooseIcon] = useState(false)
    const [errors, setErrors] = useState([]);


    const selectIcon = (e) => {
        e.preventDefault()
        setChooseIcon(true)
    }
    
    const handleSave = async (e) => {
        e.preventDefault()
        if (sessionUser) {
            const iconId = profileIcon?.id
            const userId = sessionUser?.id
            let data;

            if (selected) {
                const profileId = selected[0].id
                const profileOwnerId = selected[0].userId
                if (userId !== profileOwnerId) {
                    return setErrors(['There was an error editing the selected Profile.']);
                }

                data = await dispatch(profileActions.updateProfile({ profileName, iconId, userId, profileId }))

            } else {
                data = await dispatch(profileActions.createProfile({ profileName, iconId, userId}))
            }

            if (data.errors) {
                return setErrors(data.errors)
            }
        }
        action(null)
        history.replace({
            pathname: "/manage_profiles",
            state: {
                action: null,
            },
        })
    }

    const handleCancel = (e) => {
        e.preventDefault()
        action(null)
        history.replace({
            pathname: "/manage_profiles",
            state: {
                action: null,
            },
        })
    }

    const handleDelete = async(e) => {
        e.preventDefault()
        if (sessionUser && selected) {
            const userId = sessionUser?.id
            const profileId = selected[0].id
            const profileOwnerId = selected[0].userId

            if (userId !== profileOwnerId) {
                return setErrors(['There was an error editing the selected Profile.']);
            }

            const data = await dispatch(profileActions.deleteOneProfile({ userId, profileId }))
         
            if (data.errors) {
                return setErrors(data.errors)
            }
        }
        action(null)
        history.replace({
            pathname: "/manage_profiles",
            state: {
                action: null,
            },
        })
    }


    if (chooseIcon) {
        return (<ChooseIcon where={act} back={setChooseIcon} select={setProfileIcon} />)
    }
    return (
        <div className="profile-page__container">
            <form className="profile-form">
                <div className="profile-form-label">{act}</div>
                <ul>
                    {errors.map((error, idx) => <div className="profile-form-errors" key={idx}>{error}</div>)}
                </ul>
                <div className="profile-form__container">
                    <div className="profile-icon" style={{ backgroundImage: `url(${profileIcon ? profileIcon.image_url : anonymousPic})` }} > 
                        <div className="edit-profile-icon" style={{ backgroundImage: `url(${editIcon})` }} onClick={selectIcon} />
                    </div>
                    <input
                        className="edit-profile-name"
                        placeholder="Profile Name..."
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="profile-form-buttons">
                    <button type="submit" className="save-button" onClick={handleSave}>
                        SAVE
                    </button>
                    <button type="reset" className="cancel-button" onClick={handleCancel}>
                        CANCEL
                    </button>
                    {selected && 
                    <button type="button" className="delete-button" onClick={handleDelete}>
                        DELETE PROFILE
                    </button>
                    }
                </div>
            </form>

        </div>
    )
}

export default CreateProfile