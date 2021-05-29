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
  // const [videoEnded, setVideoEnded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const dispatch = useDispatch();
  const video = document.querySelector(".video");
  const videoContainer = document.querySelector(".c-video");
  useEffect(() => {
    video.addEventListener("timeupdate", () => {
      let durationPos = video.currentTime / video.duration;
      let duration = document.querySelector(".duration");
      duration.style.width = durationPos * 100 + "%";
      if (video.ended) {
        dispatch(videoActions.setVideoEnd());
      }
    });
  });

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

  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      await video.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleFastFoward = () => {
    video.currentTime += 5;
  };

  const handleRewind = () => {
    video.currentTime -= 5;
  };
  return (
    <div className="c-video">
      <video
        className="video"
        // change that url later: DON'T FORGET TO ADD https://
        src="https://d23jaqdaucwmr3.cloudfront.net/1.mp4"
        autoplay="true"
        muted
        // controls
      ></video>
      <div className="video-control-container">
        <div className="duration-bar">
          <div className="duration"></div>
        </div>
        <button className="control play" onClick={togglePlay}>
          {videoIsActive ? <FaPause /> : <FaPlay />}
        </button>
        <button className="control rewind" onClick={handleRewind}>
          <FaFastBackward />
        </button>
        <button className=" control fastfoward" onClick={handleFastFoward}>
          <FaFastForward />
        </button>
        <button className=" control volume" id="volume">
          {isMute ? <HiVolumeOff /> : <HiVolumeUp />}
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
          <FiHelpCircle />
        </button>
        <button className=" control next">
          <ImNext />
        </button>
        <button className=" control subtitle">
          <MdSubtitles />
        </button>
        <button className=" control fullscreen" onClick={toggleFullScreen}>
          {fullscreen ? <RiFullscreenExitFill /> : <RiFullscreenFill />}
        </button>
      </div>
    </div>
  );
};
export default VideoPlayer;
