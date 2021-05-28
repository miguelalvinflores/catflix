import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
// import VideoCover from "./VideoCover";
import Footer from "./Footer";
import * as videoActions from "../store/video";
import "./CSS/Watch.css";
import "./CSS/VideoCover.css";

const Watch = () => {
  const [showMovieCover, setShowMovieCover] = useState(true);
  const { movieId } = useParams();
  // const movie = useSelector(state=>state.movies[movieId])
  const videoEnded = useSelector((state) => state.video.end);
  const dispatch = useDispatch();
  // const showMovieCover = useSelector((state)=>state.video.showMovieCover)

  // useEffect(() => {
  //   console.log("useeffect");
  //   setShowMovieCover(true);
  // }, [videoEnded]);

  const playBtnHandler = () => {
    console.log("playbtn");
    setShowMovieCover(false);
    dispatch(videoActions.setVideoStart());
  };

  const VideoCover = () => {
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
          <p className="film-title">Film Title</p>
          <p className="film-description">Film description</p>
          <div className="controls-container">
            <button className="play-button" onClick={playBtnHandler}>
              Play
            </button>
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

  return (
    <>
      <div className="video-container">
        {/* pass in video url */}
        {/* <VideoCover movie={movie} /> */}
        {/* <VideoPlayer movieUrl={ movie.url} /> */}
        {showMovieCover || videoEnded ? <VideoCover /> : <VideoPlayer />}
        {/* <VideoPlayer /> */}
      </div>
      {/* carousel: top picks for you */}
      {/* detail component */}
      <div className="footer-wrapper">
        <Footer />
      </div>
    </>
  );
};
export default Watch;
