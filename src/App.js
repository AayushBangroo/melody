import React, { useState, useRef } from "react";
//Styles
import "./styles/app.scss";
//Components
import "./components/Player";
import "./components/Song";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Import song Genres
import data from "./components/Data";

function App() {
  const [Songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(Songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibraryActive, setIsLibraryActive] = useState(false);

  const audioRef = useRef(null);

  //Get current Time and End time of the song
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animateWidth: 0,
  });

  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //code for managinf width of Animate Track
    const currentTime = Math.round(songInfo.currentTime);
    const endTime = Math.round(songInfo.duration);
    const percentageCompleted = Math.round((currentTime / endTime) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animateWidth: percentageCompleted,
    });
  };

  const songEndedHandler = async () => {
    const currentIndex = Songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(Songs[(currentIndex + 1) % Songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      className={`moveLeftTransition ${
        isLibraryActive ? "moveRightTransition" : ""
      }`}
    >
      <Nav
        isLibraryActive={isLibraryActive}
        setIsLibraryActive={setIsLibraryActive}
      />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songInfo={songInfo}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        Songs={Songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        songs={Songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setSongs={setSongs}
        isLibraryActive={isLibraryActive}
      />
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={timeHandler}
        onLoadedMetadata={timeHandler}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
}

export default App;
