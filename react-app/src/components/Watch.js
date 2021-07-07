import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// =========================================
import VideoPlayer from "./VideoPlayer";
import Slider from "./NetflixSlider";
import Footer from "./Footer";
import * as videoActions from "../store/video";
import * as profileActions from "../store/profile";
// import * as movieActions from "../store/movie";
import "./CSS/Watch.css";
import "./CSS/VideoCover.css";
// ============ REACT ICONS =====================
import { FaPlay } from "react-icons/fa";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
// =======================

const Watch = () => {
  const dispatch = useDispatch();
  const [showMovieCover, setShowMovieCover] = useState(true);
  const { movieId } = useParams();
  // const profileExist = useSelector((state) => state.profile);
  const profileLikes = useSelector((state) => state.profile?.profile[0].likes);
  const movie = useSelector((state) => state.movies.allMovies[movieId]);
  const profileId = useSelector((state) => state.profile?.profile[0].id);
  const videoEnded = useSelector((state) => state.video.end);
  const profileBookmarks = useSelector(
    (state) => state.profile?.profile[0].bookmarks
  );
  const [movieLikes, setMovieLikes] = useState(0);

  // calculate like percentage
  useEffect(() => {
    let moviePercentageLike;
    // console.log(movie.total_votes, movie.num_upvote, `${movie.title}`);
    if (movie.total_votes < 1) {
      moviePercentageLike = 0;
    } else {
      moviePercentageLike = Math.round(
        (movie.num_upvote / movie.total_votes) * 100
      );
    }
    setMovieLikes(moviePercentageLike);
  }, [dispatch, movie]);

  // dynamic like color
  useEffect(() => {
    let moviePercentage = document.querySelector("#movie-like-rate");
    moviePercentage.classList = "";
    if (movieLikes < 40) {
      moviePercentage.classList.add("red-rating");
    } else if (movieLikes < 70) {
      moviePercentage.classList.add("orange-rating");
    } else {
      moviePercentage.classList.add("green-rating");
    }
    console.log(moviePercentage);
  }, [dispatch, movie, movieLikes]);

  //RECOMMENDED MOVIES
  const genres = [
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Documentary",
    "Family",
  ];

  const genreMovies = useSelector(
    (state) => state.movies?.genres[genres[Math.floor(Math.random() * 6)]]
  );

  let profileHasLike = profileLikes?.hasOwnProperty(movieId) ? true : false;
  let profileHasBookmark = profileBookmarks[movieId] ? true : false;
  const [isBookmarked, setIsBookmarked] = useState(profileHasBookmark);

  // BOOKMARKS
  const myListHandler = () => {
    if (profileBookmarks[movieId]) {
      dispatch(profileActions.deleteBookmark(profileId, movieId));
    } else {
      dispatch(profileActions.addBookmark(profileId, movie));
    }

    setIsBookmarked(!isBookmarked);
  };

  // LIKE/DISLIKE
  // Refactor later (useRef instead of querySelector)
  const likeButtonHandler = () => {
    if (profileLikes.hasOwnProperty(movieId)) {
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
        if (thumbsUp) thumbsUp.classList.add("active");
      } else {
        let thumbsDown = document.querySelector(".dislike-button");
        if (thumbsDown) thumbsDown.classList.add("active");
      }
    }
  });
  const VideoCover = () => {
    if (movie) {
      return (
        <div className="video-cover">
          <div className="image-container">
            <img
              src={movie.backdrop}
              alt="cats"
              className="video-cover-image"
            />
            <div class="trailer-vignette vignette-layer"></div>
          </div>
          <div className="cover-overlay">
            <p className="film-title">{movie.title}</p>
            <p className="movie-likes">
              <span id="movie-like-rate">{`${movieLikes}% `}</span>
              approval rating
            </p>
            <p className="film-description">{movie.description}</p>
            <div className="controls-container">
              <button className="play-button" onClick={playBtnHandler}>
                <FaPlay />
                Play
              </button>
              <button className="bookmark-button" onClick={myListHandler}>
                {isBookmarked ? <BsBookmarkFill /> : <BsBookmarkPlus />}
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
            {/* <div className="tabs">
              <span className="overview-tab">Overview</span>
              <span className="episodes-tab">Episodes</span>
              <span className="trailers-tab">Trailers</span>
              <span className="more-tab">More Like This</span>
              <span className="details-tab">Details</span>
            </div> */}
          </div>
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className="video-container">
        {/* pass in video url */}
        {/* <VideoCover movie={movie} /> */}
        {/* <VideoPlayer movieUrl={ movie.url} /> */}
        {showMovieCover || videoEnded ? (
          <VideoCover />
        ) : (
          <VideoPlayer movie={movie} />
        )}
      </div>
      {/* carousel: top picks for you */}
      <div className="recommended">
        <div className="recommended-header">Recommended</div>
        <Slider>
          {genreMovies &&
            genreMovies.map((movie) => {
              // console.log("ROW MOVIES", movies);
              return (
                <Slider.Item movie={movie} key={movie.id}>
                  item1
                </Slider.Item>
              );
            })}
        </Slider>
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </>
  );
};
export default Watch;
