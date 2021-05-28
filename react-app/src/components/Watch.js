import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import VideoCover from "./VideoCover";
import Footer from "./Footer";
import "./CSS/Watch.css";

const Watch = () => {
  const [showMovieCover, setShowMovieCover] = useState(true);
  const { movieId } = useParams();
  // const movie = useSelector(state=>state.movies[movieId])
  const videoEnded = useSelector((state) => state.video.end);

  // define movieCover here. useEffect listens to play button on movieCover
  // clicking play button renders VideoPlayer instead w/ autoplay
  // movieCover playbutton onClick sets showMovieCover(false) && videoEnded(false)
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
      {/* <Footer /> */}
    </>
  );
};
export default Watch;
