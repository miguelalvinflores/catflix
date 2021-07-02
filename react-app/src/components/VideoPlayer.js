import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import { FiHelpCircle } from "react-icons/fi";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { FaFastBackward, FaFastForward } from "react-icons/fa";
import { FaPlay, FaPause } from "react-icons/fa";
// import { ImNext } from "react-icons/im";
// import { MdSubtitles } from "react-icons/md";
import { RiFullscreenFill, RiFullscreenExitFill } from "react-icons/ri";
import * as videoActions from "../store/video";
import "./CSS/VideoPlayer.css";

// REFACTOR useRef instead of docQueryselector
const VideoPlayer = ({ movie }) => {
  const [videoIsActive, setVideoIsActive] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef();

  useEffect(() => {
    const video = document.querySelector(".video");
    video.addEventListener("timeupdate", () => {
      let durationPos = video.currentTime / video.duration;
      let duration = document.querySelector(".duration");
      if (duration) {
        duration.style.width = durationPos * 100 + "%";
      }
      if (video.ended) {
        dispatch(videoActions.setVideoEnd());
      }
    });
  });

  const togglePlay = () => {
    // const video = document.querySelector(".video");
    if (videoRef.current.paused || videoRef.current.ended) {
      setVideoIsActive(true);
      videoRef.current.play();
    } else {
      setVideoIsActive(false);
      videoRef.current.pause();
    }
  };

  const videoEnd = () => {
    dispatch(videoActions.setVideoEnd());
  };

  const handleRewind = () => {
    // const video = document.querySelector(".video");
    if (videoRef.current.currentTime > 5) {
      videoRef.current.currentTime -= 5;
    }
  };
  const handleFastFoward = () => {
    // const video = document.querySelector(".video");
    // if (video.duration - video.currentTime > 5) {
    if (videoRef.current.duration - videoRef.current.currentTime > 5) {
      videoRef.current.currentTime += 5;
    }
  };

  const handleFullScreen = async () => {
    console.log("hihi");
    const video = document.querySelector(".video");
    if (!isFullScreen) {
      // this condition not being met taking 2 clicks for fullscreen
      console.log("takes 2 clicks why");
      await videoRef.current.requestFullscreen();
      // await video.requestFullscreen();
      setIsFullScreen(true);
    } else {
      // video.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  return (
    <div className="c-video">
      <video
        className="video"
        src={`https://${movie.url}`}
        autoplay="true"
        muted
        onEnded={videoEnd}
        ref={videoRef}
      ></video>
      <div className="video-control-container">
        <div className="duration-bar">
          <div className="duration"></div>
        </div>
        <div className="controls">
          <div className="left-controls">
            <button className="control play" onClick={togglePlay}>
              {videoIsActive ? <FaPause size="20px" /> : <FaPlay size="20px" />}
            </button>
            <button className="control rewind" onClick={handleRewind}>
              <FaFastBackward size="20px" />
            </button>
            <button className=" control fastfoward" onClick={handleFastFoward}>
              <FaFastForward size="20px" />
            </button>
            <button className=" control volume" id="volume">
              <HiVolumeUp size="20px" />
            </button>
            <input
              class="volume-slider"
              value="1"
              type="range"
              max="1"
              min="0"
              step="0.01"
            ></input>
          </div>
          <span className="control title">{movie.title}</span>

          <div className="right-controls">
            {/* <button className=" control help">
            <FiHelpCircle size="25px" />
          </button>
          <button className=" control next">
            <ImNext size="25px" />
          </button>
          <button className=" control subtitle">
            <MdSubtitles size="25px" />
          </button> */}
            <button className=" control fullscreen" onClick={handleFullScreen}>
              <RiFullscreenFill size="25px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
