import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import * as movieActions from '../store/movie';


function BrowseVids() {
    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector((state) => state.sessionUser);
    const userProfiles = useSelector((state) => state.profile);


    useEffect(() => {
        if (userProfiles) {
            dispatch(movieActions.retrieveMovies())

        }
    }, [dispatch, sessionUser, userProfiles]);
    const movies = useSelector((state) => state.session.allMovies)
    console.log(movies)

    return (
        <div className='mainView'>
            <div className='lolomo'>
                <div className='billboard'>
                    <div className='billboard-motion'>

                    </div>
                    <div className='billboard-meta'>
                    
                    </div>
                </div>
                <div className='lolomoRow title_card'>

                </div>
            </div>
        </div>
    )

}
export default BrowseVids;
