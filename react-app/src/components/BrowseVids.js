import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Caroussel from "./Caroussel";

import * as movieActions from "../store/movie";
import "./CSS/BrowseVids.css";

function BrowseVids() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.sessionUser);
  const userProfiles = useSelector((state) => state.profile);
  const movie = useSelector((state) => state.movies.movie);
  const genres = useSelector((state) => state.movies.genres);

  const [billIsPlaying, setBillIsPlaying] = useState(true);

  let objsize = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  useEffect(() => {
    console.log("Browse");
    if (userProfiles) {
      dispatch(movieActions.retrieveMovies());
      dispatch(movieActions.chooseMovie());
      dispatch(movieActions.retrieveMoviesByGenreId(4));
      dispatch(movieActions.retrieveMoviesByGenreId(6));
      dispatch(movieActions.retrieveMoviesByGenreId(9));
      dispatch(movieActions.retrieveMoviesByGenreId(15));
      dispatch(movieActions.retrieveMoviesByGenreId(8));
    }
  }, [dispatch, sessionUser, userProfiles]);

  let srcfunc = function (str) {
    let src = "https://" + str;
    return src;
  };

  const onBillEnd = () => {
    setBillIsPlaying(false);
  };
  return (
    <div className="lolomo">
      <span className="animations-container">
        <div className="billboard-row">
          <div className="billboard-presentation-tracking">
            <div className="billboard">
              <div className="billboard-motion">
                {/* <video
                                autoplay='true'
                                muted
                                onEnded={() => onBillEnd()}
                                src={srcfunc(movie?.url)}
                                >
                                </video> */}
              </div>
              <div className="bill-bottom-layer full-screen ">
                <div className="bill-img-wrapper">
                  <img
                    className={
                      billIsPlaying ? "bill-playing bill-img" : "bill-img"
                    }
                    src={movie?.backdrop}
                    alt={`"${movie?.title}" backdrop`}
                  />
                  <div class="trailer-vignette vignette-layer"></div>
                  <div class="hero-vignette vignette-layer"></div>
                </div>
              </div>
              <div className="fill-container">
                <div className="billboard-meta">
                  <div className="title-and-text">
                    <div className="bill-title-wrapper">
                      <h2 className="bill-title">{movie?.title}</h2>
                    </div>
                    <div className="bill-description-wrapper">
                      <div className="bill-description-wrapper-fade">
                        <div className="bill-description-fade-container">
                          <h3 className="bill-description">
                            {movie?.description}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="billboard-links">
                      <button className="billboard-btn">
                        {movie ? (
                          <NavLink
                            to={`/watch/${movie?.id}`}
                            className="watchbill"
                            style={{ textDecoration: "none" }}
                          />
                        ) : null}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
      {genres &&
        Object.entries(genres).map(([genre, movies]) => {
          console.log("MOVIES", movies)
          return (
            <div className="lolomoRow title_card">
              <Caroussel genre={genre} movies={movies} />
            </div>
          );
        })}
    </div>
  );
}

export default BrowseVids;
