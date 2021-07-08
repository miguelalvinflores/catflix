import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./CSS/MovieTile.css";

function MovieTile() {
  const movieMatches = useSelector((state) => state.movies.allMovies?.matches);

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
