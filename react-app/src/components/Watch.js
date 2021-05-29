import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// =========================================
import VideoPlayer from "./VideoPlayer";
import Footer from "./Footer";
import * as videoActions from "../store/video";
import * as profileActions from "../store/profile";
import "./CSS/Watch.css";
import "./CSS/VideoCover.css";
// ============ REACT ICONS =====================
import { FaPlay } from "react-icons/fa";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const Watch = () => {
  const [showMovieCover, setShowMovieCover] = useState(true);
  const { movieId } = useParams();
  // const movie = useSelector(state=>state.movies[movieId])
  const profileId = useSelector((state) => state.profile.profile[0].id);
  const videoEnded = useSelector((state) => state.video.end);
  const profileLikes = useSelector((state) => state.profile.profile[0].likes);
  const profileBookmarks = useSelector(
    (state) => state.profile.profile[0].bookmarks
  );
  const dispatch = useDispatch();

  const profileHasLike = profileLikes[movieId] ? true : false;
  const profileHasBookmark = profileBookmarks[movieId] ? true : false;

  const myListHandler = () => {
    if (profileHasBookmark) {
      dispatch(profileActions.deleteBookmark(profileId, movieId));
    } else {
      dispatch(profileActions.addBookmark(profileId, movieId));
    }
    console.log(profileBookmarks);
  };

  // Refactor later
  const likeButtonHandler = () => {
    if (profileHasLike) {
      if (profileLikes[movieId]) {
        dispatch(profileActions.deleteLike(movieId, profileId));
        let activeLike = document.querySelector(".like-button");
        activeLike.classList.remove("active");
      } else {
        let activeLike = document.querySelector(".dislike-button");
        activeLike.classList.remove("active");
        let inActiveLike = document.querySelector(".like-button");
        inActiveLike.classList.add("active");
        dispatch(profileActions.updateLike(movieId, true, profileId));
      }
    } else {
      dispatch(profileActions.addLike(movieId, true));
    }
  };
  const dislikeButtonHandler = () => {
    if (profileHasLike) {
      if (!profileLikes[movieId]) {
        dispatch(profileActions.deleteLike(movieId, profileId));
        let activeLike = document.querySelector(".dislike-button");
        activeLike.classList.remove("active");
      } else {
        let activeLike = document.querySelector(".like-button");
        activeLike.classList.remove("active");
        let inActiveLike = document.querySelector(".dislike-button");
        inActiveLike.classList.add("active");
        dispatch(profileActions.updateLike(movieId, false, profileId));
      }
    } else {
      dispatch(profileActions.addLike(movieId, false));
    }
  };
  const playBtnHandler = () => {
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
              {/* <FaPlay /> */}
              Play
            </button>
            <button className="bookmark-button" onClick={myListHandler}>
              {profileHasBookmark ? <BsBookmarkFill /> : <BsBookmarkPlus />}
              My List
            </button>
            <button className="like-button" onClick={likeButtonHandler}>
              <AiFillLike size="45px" />
              {/* <AiOutlineLike /> */}
            </button>
            <button className="dislike-button" onClick={dislikeButtonHandler}>
              <AiFillDislike size="45px" />
            </button>
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
      </div>
      {/* carousel: top picks for you */}
      {/* detail component */}
      <div className="recommended">slider/carousel recommended movies</div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </>
  );
};
export default Watch;
