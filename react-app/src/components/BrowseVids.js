import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import * as movieActions from '../store/movie';

function BrowseVids() {
    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector((state) => state.sessionUser);
    const userProfile = useSelector((state) => state.profile.profile);


    useEffect(() => {
        if (sessionUser && userProfile) {
            dispatch(movieActions.retrieveMovies())
        }
    }, [sessionUser, userProfile]);

    const movies = useSelector((state) => state.session.movies)

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
