import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import backArrow from '../images/arrow.png'
import * as profileActions from "../store/profile"
import "./CSS/ChooseIcon.css"


function ChooseIcon({ where, back, select }) {
    const dispatch = useDispatch()
    const availableIcons = useSelector((state) => state.profile.allIcons)

    useEffect(() => {
        dispatch(profileActions.retrieveIcons())
    }, [dispatch])

    const handleBack = (e) => {
        e.preventDefault()
        back(false)
    }

    const selectIcon = icon => (e) => {
        e.preventDefault()
        select(icon)
        back(false)
    }

    return (
        <div className="full-choose-icon__container">
            <div className="choose-icon-label__container">
                <div className="back-arrow-icon" style={{ backgroundImage: `url(${backArrow})` }} onClick={handleBack} />
                <div className="choose-action-label">{where}
                    <div className="choose-icon-label">Choose a profile icon.</div>
                </div>
            </div>
            <div className="choose-icon__container"> 
                {availableIcons?.map(icon => {
                    return (
                        <div key={icon.id} className='icon-tile-container' style={{ backgroundImage: `url(${icon.image_url})`}} onClick={selectIcon(icon)} />
                    )
                    })}
            </div>
        </div>
    )
}

export default ChooseIcon