import React from "react";
import { playSong } from "./Util";

const LibrarySong = ({
  songs,
  song,
  currentSong,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
}) => {
  const setSongHandler = (e) => {
    setCurrentSong(song);
    playSong(isPlaying, audioRef);

    const newSongs = songs.map((eachSong) => {
      if (eachSong.id === song.id) {
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
    setSongs(newSongs); //update the new state array
  };

  return (
    <div
      onClick={setSongHandler}
      className={`librarySong-container ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="LibrarySong Thumbnail"></img>
      <div className="librarySong-container--description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
