import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Caroussel from './Caroussel'

import * as movieActions from '../store/movie';
import "./CSS/BrowseVids.css"

function BrowseVids() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.sessionUser);
    const userProfiles = useSelector((state) => state.profile);
    const allMovies = useSelector(state => state.movies.allMovies)
    const movie = useSelector((state) => state.movies.movie)
    const genres = useSelector((state) => state.movies.genres)

    let objsize = function(obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    useEffect(() => {
        if (userProfiles) {

            dispatch(movieActions.retrieveMovies())
        }
    }, [dispatch, sessionUser, userProfiles]);

    useEffect(() => {



        if(allMovies) {
            const movie = allMovies[Math.floor(Math.random()*(objsize(allMovies)))]
            dispatch(movieActions.chooseMovie(movie))
            for (let i = 1; i < 20; i++ ) {
                dispatch(movieActions.retrieveMoviesByGenreId(i))
            }
        }
    }, [dispatch, allMovies])

    let srcfunc = function(str) {
        let src = "https://"+str
        return src
    }

    return (
        <div className='lolomo'>
            <span className='animations-container'>
                <div className='billboard-row'>
                    <div className='billboard-presentation-tracking'>
                        <div className='billboard'>
                            <div className='billboard-motion'>
                                <video
                                autoplay='true'
                                muted
                                loop
                                src={srcfunc(movie?.url)}
                                >
                                </video>
                            </div>
                            <div className='bill-bottom-layer full-screen'>
                                <div className='bill-img-wrapper'>
                                    <img className='bill-img' src={movie?.backdrop} alt='movie backdrop' />
                                    <div class="trailer-vignette vignette-layer"></div>
                                    <div class="hero-vignette vignette-layer"></div>
                                </div>
                            </div>
                            <div className='fill-container'>
                                <div className='billboard-meta'>
                                    <div className='title-and-text'>
                                        <div className='bill-title-wrapper'>
                                            <h2 className="bill-title">{movie?.title}</h2>
                                        </div>
                                        <div className='bill-description-wrapper'>
                                            <div className='bill-description-wrapper-fade'>
                                                <div className='bill-description-fade-container'>
                                                    <h3 className='bill-description'>{movie?.description}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='billboard-links'>
                                            <button className='billboard-btn'>
                                                <NavLink to='/watch' className='watchbill' style={{ textDecoration: 'none' }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lolomoRow title_card'>

                    </div>
                </div>
            </span>
            {(genres) && (
                Object.entries(genres).map(([genre, movies]) => {
                return (
                    <Caroussel genre={genre} movies={movies} />
                )})
            )}
        </div>
    )

}
export default BrowseVids;
