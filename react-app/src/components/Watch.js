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
import * as movieActions from "../store/movie";
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
  const profileLikes = useSelector((state) => state.profile?.profile[0].likes);

  // movie state
  const [movie, setMovie] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [numUpvotes, setNumUpvotes] = useState(0);

  const profileId = useSelector((state) => state.profile?.profile[0].id);
  const videoEnded = useSelector((state) => state.video.end);
  const profileBookmarks = useSelector(
    (state) => state.profile?.profile[0].bookmarks
  );
  const [movieLikes, setMovieLikes] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieObj = await movieActions.getMovieById(movieId);
      setMovie(movieObj);
    };
    fetchMovie();
    setShowMovieCover(true);
  }, [movieId]);


  useEffect(() => {
    setTotalVotes(movie.total_votes);
    setNumUpvotes(movie.num_upvote);
  }, [movie]);

  //RECOMMENDED MOVIES
  const genres = [
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Documentary",
    "Family",
  ];

  const genreMovies = useSelector(
    (state) => state.movies?.genres[genres[Math.floor(Math.random() * 5)]]
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
  const likeButtonHandler = async () => {
    if (profileLikes.hasOwnProperty(movieId)) {
      if (profileLikes[movieId]) {
        // REMOVE UPVOTE
        await dispatch(profileActions.deleteLike(movieId, profileId));
        let activeLike = document.querySelector(".like-button");
        activeLike.classList.remove("active");
        setNumUpvotes(numUpvotes - 1);
        setTotalVotes(totalVotes - 1);
      } else {
        // UPDATE UPVOTE
        await dispatch(profileActions.updateLike(movieId, true, profileId));
        let activeLike = document.querySelector(".dislike-button");
        activeLike.classList.remove("active");
        let inActiveLike = document.querySelector(".like-button");
        inActiveLike.classList.add("active");
        setNumUpvotes(numUpvotes + 1);
      }
    } else {
      // ADD UPVOTE
      await dispatch(profileActions.addLike(movieId, true, profileId));
      let inActiveLike = document.querySelector(".like-button");
      inActiveLike.classList.add("active");
      setNumUpvotes(numUpvotes + 1);
      setTotalVotes(totalVotes + 1);
    }
  };
  const dislikeButtonHandler = async () => {
    if (profileLikes.hasOwnProperty(movieId)) {
      if (!profileLikes[movieId]) {
        // REMOVE DOWNVOTE
        await dispatch(profileActions.deleteLike(movieId, profileId));
        let activeLike = document.querySelector(".dislike-button");
        activeLike.classList.remove("active");
        setTotalVotes(totalVotes - 1);
      } else {
        // UPDATE DOWNVOTE
        await dispatch(profileActions.updateLike(movieId, false, profileId));
        let activeLike = document.querySelector(".like-button");
        activeLike.classList.remove("active");
        let inActiveLike = document.querySelector(".dislike-button");
        inActiveLike.classList.add("active");
        setNumUpvotes(numUpvotes - 1);
      }
    } else {
      //  ADD DOWNVOTE
      await dispatch(profileActions.addLike(movieId, false, profileId));
      let inActiveLike = document.querySelector(".dislike-button");
      inActiveLike.classList.add("active");
      setTotalVotes(totalVotes + 1);
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

  // calculate like percentage
  useEffect(() => {
    let moviePercentageLike;
    if (totalVotes < 1) {
      moviePercentageLike = 0;
    } else {
      moviePercentageLike = Math.round((numUpvotes / totalVotes) * 100);
    }
    setMovieLikes(moviePercentageLike);
  }, [totalVotes, numUpvotes, movie]);

  // SET COLOR OF APPROVAL RATING
  let approvalColor;
  if (movieLikes < 40) {
    approvalColor = "red";
  } else if (movieLikes < 70) {
    approvalColor = "orange";
  } else {
    approvalColor = "#50d250";
  }

  // dynamic like color
  // useEffect(() => {
  //   let moviePercentage = document.querySelector("#movie-like-rate");
  //   // moviePercentage.classList = "";
  //   if (movieLikes < 40) {
  //     moviePercentage.classList.add("red-rating");
  //   } else if (movieLikes < 70) {
  //     moviePercentage.classList.add("orange-rating");
  //   } else {
  //     moviePercentage.classList.add("green-rating");
  //   }
  // }, [movie, movieLikes, totalVotes, numUpvotes]);

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
              <span
                id="movie-like-rate"
                style={{ color: approvalColor }}
              >{`${movieLikes}% `}</span>
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
          </div>
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className="video-container">
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
