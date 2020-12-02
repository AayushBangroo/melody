import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playSong } from "./Util";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  audioRef,
  setSongInfo,
  Songs,
  setSongs,
}) => {
  const activeSongHandler = (newSong) => {
    const newSongs = Songs.map((eachSong) => {
      if (eachSong.id === newSong.id) {
        //Make the current selected song active and rest of the songs non-active in the state song array(songs)
        return {
          ...eachSong,
          active: true,
        };
      } else {
        return {
          ...eachSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  //Handling play and pause
  const audioHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    ); //Avoid 3 digits after :
  };

  const dragHandler = (e) => {
    //Handling event when user drags the song
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipSong = (direction) => {
    //skip songs left or right functionality
    let currentIndex = Songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "right") {
      const nextSong = Songs[(currentIndex + 1) % Songs.length];
      setCurrentSong(nextSong);
      activeSongHandler(nextSong);
    } else if (direction === "left") {
      const prevSong = Songs[(currentIndex - 1 + Songs.length) % Songs.length];
      setCurrentSong(prevSong);
      activeSongHandler(prevSong);
    }

    playSong(isPlaying, audioRef);
  };

  const animateTrackWidth = {
    transform: `translateX(${songInfo.animateWidth}%)`,
  };

  return (
    <div className="player">
      <div className="player__slider">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0} //fix NaN
            value={songInfo.currentTime}
            onChange={dragHandler}
            style={{
              background: `linear-gradient(to right,${currentSong.background[0]},${currentSong.background[1]})`,
            }}
          />
          <div className="animate-track" style={animateTrackWidth}></div>
        </div>

        <p>{songInfo.duration ? formatTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="player__buttons">
        <FontAwesomeIcon
          size="2x"
          className="player__buttons--left"
          icon={faAngleLeft}
          onClick={() => skipSong("left")}
        />
        <FontAwesomeIcon
          size="2x"
          className="player__buttons--play"
          onClick={audioHandler}
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          size="2x"
          className="player__buttons--right"
          icon={faAngleRight}
          onClick={() => skipSong("right")}
        />
      </div>
    </div>
  );
};

export default Player;
