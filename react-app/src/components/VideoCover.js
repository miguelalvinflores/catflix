import React, { useState, useEffect } from "react";
import * as videoActions from "../store/video";
import "./CSS/VideoCover.css";

// displays movie info over movie backdrop image
// likes + bookmark
// carousel of recommended movies
// has playbutton. clicking play button renders video player & makes dispatch call to remove
// videoEnded from store
const VideoCover = ({ movie }) => {
  return (
    <div className="video-cover">
      <div className="image-container">
        <img
          src="https://www.themoviedb.org/t/p/original/7IrQ5vwmTHppBCf51HRFzSd7xMi.jpg"
          alt="cats"
          className="video-cover-image"
        />
      </div>
      <div className="cover-overlay">
        <h1 className="film-title">Film Title</h1>
        <p className="film-description">Film description</p>
        <div className="controls-container">
          <button className="play-button">Play</button>
          <button className="bookmark-button">Bookmark</button>
          <button className="like-button">like</button>
          <button className="dislike-button">dislike</button>
        </div>
        <div className="tabs">
          <span className="overview-tab">Overview</span>
          <span className="episodes-tab">Episodes</span>
          <span className="trailers-tab">Trailers</span>
          <span className="more-tab">More Like This</span>
          <span className="details-tab">Details</span>
        </div>
      </div>
    </div>
  );
};
export default VideoCover;
