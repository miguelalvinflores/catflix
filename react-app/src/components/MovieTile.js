import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";

import "./CSS/MovieTile.css";

function MovieTile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const movieMatches = useSelector((state) => state.movies.allMovies?.matches);
  const currentProfile = useSelector((state) => state.profile.profile);

  useEffect(() => {}, [movieMatches]);

  // const handleClick = (movie) => (e) => {
  //   e.preventDefault();
  //   localStorage.setItem("chosenMovie", JSON.stringify(movie));
   
  // };

  if (movieMatches) {
    // console.log("MOVIE TILE", Array.isArray(movies), movies)
    // const allMatches = movies.matches
    return (
      <>
        {movieMatches?.map((movie) => {
          return (
            <NavLink
              key={movie.id}
              className="full-movie-tile__container"
              // onClick={handleClick(movie)}
              to={`/watch/${movie.id}`}
            >
              <div
                className="movie-tile__container"
                style={{ backgroundImage: `url(${movie.image})` }}
              >
              </div>
            </NavLink>
          );
        })}
      </>
    );
  }

  return <></>;
}

export default MovieTile;
