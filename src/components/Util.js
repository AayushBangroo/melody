export const playSong=(isPlaying,audioRef)=>{
    if (isPlaying) {
      const promise = audioRef.current.play();
      promise.then(() => {
        audioRef.current.play();
      });
    }
}