import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import IconCross from "./../Icons/IconCross";
import IconPlay from "./../Icons/IconPlay";

import "./Content.css";

const Content = ({ movie, onClose }) => {
  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname)
  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <div
          className="content__background__image"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{movie.title}</div>
          <div className="content__description">{movie.description}</div>
          {movie ? (
            <NavLink
              to={`/watch/${movie?.id}#video-cover`}
              className="watchbill"
              style={{ textDecoration: "none" }}
            >
              <button className="billboard-btn">
                <span className="play-ltr">
                  <div className="play-icon">
                    <IconPlay />
                  </div>
                  Play
                </span>
              </button>
            </NavLink>
          ) : null}
        </div>
        <button className="content__close" onClick={onClose}>
          <IconCross />
        </button>
      </div>
    </div>
  );
};

export default Content;
