import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as profileActions from "../store/profile"
import "./CSS/MovieTile.css"


function MovieTile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const movieMatches = useSelector((state) => state.movie.allMovies?.matches);
    const currentProfile = useSelector((state) => state.profile.profile);
    // const [errors, setErrors] = useState([]);


    useEffect(() => {
        
    }, [movieMatches]);

    const handleClick = movie => (e) => {
        e.preventDefault();
        localStorage.setItem('chosenMovie', JSON.stringify(movie))
        // history.push('/test')
    }



 

    if (movieMatches) {
        // console.log("MOVIE TILE", Array.isArray(movies), movies)
        // const allMatches = movies.matches
        return (
            <>
                {movieMatches?.map(movie => {
                    console.log(movie)
                    return (
                        <div key={movie.id} className='full-tile__container' onClick={handleClick(movie)}>
                            <div className='movie-tile__container' style={{ backgroundImage: `url(${movie.image})` }} >
                                {/* {movie.title} */}
                            </div>
                            {/* <div className="movie-tile__name">{movie.title}</div> */}
                        </div>
                    )
                    
                })}


            </>

        )

    }



    return (<></>);
}



export default MovieTile;
