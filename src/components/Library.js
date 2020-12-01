import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
  isLibraryActive,
}) => {
  return (
    <div
      className={`library-container ${isLibraryActive ? "active-library" : ""}`}
    >
      <h1>Library</h1>
      <div className="library-container__songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            song={song}
            key={song.id}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            audioRef={audioRef}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
