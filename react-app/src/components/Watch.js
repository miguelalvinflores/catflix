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
  // const movie = useSelector(state=>state.movies[movieId]) // PASS IN MOVIE_URL TO VIDEOPLAYER
  const profileId = useSelector((state) => state.profile.profile[0].id);
  const videoEnded = useSelector((state) => state.video.end);
  const profileLikes = useSelector((state) => state.profile.profile[0].likes);
  const profileBookmarks = useSelector(
    (state) => state.profile.profile[0].bookmarks
  );
  const dispatch = useDispatch();

  let profileHasLike = profileLikes.hasOwnProperty(movieId) ? true : false;
  let profileHasBookmark = profileBookmarks[movieId] ? true : false;
  // potential solution
  const [isBookmarked, setIsBookmarked] = useState(profileHasBookmark);

  const myListHandler = () => {
    if (profileHasBookmark) {
      dispatch(profileActions.deleteBookmark(profileId, movieId));
    } else {
      dispatch(profileActions.addBookmark(profileId, movieId));
    }
    // potential solution to rerender bookmark icon
    setIsBookmarked(!isBookmarked);
  };

  // Refactor later
  const likeButtonHandler = () => {
    console.log(profileLikes.hasOwnProperty(movieId));
    console.log(profileLikes, "======");
    console.log(profileLikes[movieId], "===, movieId", movieId);
    console.log(profileHasLike, "Profile has like");
    // it thinks that the profile has the like even after its been deleted. the state is not picking up the changes
    if (profileLikes.hasOwnProperty(movieId)) {
      console.log("inisde like handler");
      if (profileLikes[movieId]) {
        console.log("delete please");
        dispatch(profileActions.deleteLike(movieId, profileId));
        let activeLike = document.querySelector(".like-button");
        activeLike.classList.remove("active");
      } else {
        console.log("inside update ");
        let activeLike = document.querySelector(".dislike-button");
        activeLike.classList.remove("active");
        let inActiveLike = document.querySelector(".like-button");
        inActiveLike.classList.add("active");
        dispatch(profileActions.updateLike(movieId, true, profileId));
      }
    } else {
      console.log("prfielhas like is showing as false");
      dispatch(profileActions.addLike(movieId, true, profileId));
      let inActiveLike = document.querySelector(".like-button");
      inActiveLike.classList.add("active");
    }
  };
  const dislikeButtonHandler = () => {
    if (profileLikes.hasOwnProperty(movieId)) {
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
      dispatch(profileActions.addLike(movieId, false, profileId));
      let inActiveLike = document.querySelector(".dislike-button");
      inActiveLike.classList.add("active");
    }
  };

  const playBtnHandler = () => {
    setShowMovieCover(false);
    dispatch(videoActions.setVideoStart());
  };

  useEffect(() => {
    if (profileHasLike) {
      if (profileLikes[movieId]) {
        let thumbsUp = document.querySelector(".like-button");
        thumbsUp.classList.add("active");
      } else {
        let thumbsDown = document.querySelector(".dislike-button");
        thumbsDown.classList.add("active");
      }
    }
  });
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
