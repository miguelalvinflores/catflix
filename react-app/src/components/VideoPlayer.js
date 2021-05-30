import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FiHelpCircle } from "react-icons/fi";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { FaFastBackward, FaFastForward } from "react-icons/fa";
import { FaPlay, FaPause } from "react-icons/fa";
import { ImNext } from "react-icons/im";
import { MdSubtitles } from "react-icons/md";
import { RiFullscreenFill, RiFullscreenExitFill } from "react-icons/ri";
import * as videoActions from "../store/video";
import "./CSS/VideoPlayer.css";

// const VideoPlayer = ({movieUrl}) => {
// movieUrl destructured from props
const VideoPlayer = () => {
  const [videoIsActive, setVideoIsActive] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const dispatch = useDispatch();

  const togglePlay = () => {
    const video = document.querySelector(".video");
    if (video.paused || video.ended) {
      setVideoIsActive(true);
      video.play();
    } else {
      setVideoIsActive(false);
      video.pause();
    }
  };
  useEffect(() => {
    const video = document.querySelector(".video");
    video.addEventListener("timeupdate", () => {
      let durationPos = video.currentTime / video.duration;
      let duration = document.querySelector(".duration");
      duration.style.width = durationPos * 100 + "%";
      if (video.ended) {
        dispatch(videoActions.setVideoEnd());
      }
    });
  });
  const videoEnd = () => {
    dispatch(videoActions.setVideoEnd());
  };

  const handleRewind = () => {
    const video = document.querySelector(".video");
    if (!video.currentTime) {
      video.currentTime -= 5;
    }
  };
  const handleFastFoward = () => {
    const video = document.querySelector(".video");
    if (video.duration - video.currentTime > 5) {
      video.currentTime += 5;
    }
  };

  const handleFullScreen = () => {
    const video = document.querySelector(".video");
    if (!isFullScreen) {
      video.requestFullscreen();
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
        // change that url later: DON'T FORGET TO ADD https://
        src="https://d23jaqdaucwmr3.cloudfront.net/1.mp4"
        autoplay="true"
        muted
        onEnded={videoEnd}
        // controls
      ></video>
      <div className="video-control-container">
        <div className="duration-bar">
          <div className="duration"></div>
        </div>
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
          <HiVolumeUp size="25px" />
        </button>
        <input
          class="volume-slider"
          value="1"
          type="range"
          max="1"
          min="0"
          step="0.01"
        ></input>
        <span className="control title">movie title</span>
        <button className=" control help">
          <FiHelpCircle size="25px" />
        </button>
        <button className=" control next">
          <ImNext size="25px" />
        </button>
        <button className=" control subtitle">
          <MdSubtitles size="25px" />
        </button>
        <button className=" control fullscreen" onClick={handleFullScreen}>
          <RiFullscreenFill size="25px" />
        </button>
      </div>
    </div>
  );
};
export default VideoPlayer;
