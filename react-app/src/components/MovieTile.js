import React from 'react';
import { NavLink } from 'react-router-dom';

function MovieTile({ movie }) {
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
    )
}

export default MovieTile
