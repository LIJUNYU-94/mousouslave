import { useState } from "react";
import AudioRecognition from "./webAudio";
import CallDisplay from "./display";

const LiveCallSystem = () => {
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const handleSongDetected = (song: string, time: number) => {
    setCurrentSong(song);
    setElapsedTime(time);
  };

  return (
    <div className="flex flex-col items-center">
      <AudioRecognition onSongDetected={handleSongDetected} />
      {currentSong && (
        <CallDisplay song={currentSong} elapsedTime={elapsedTime} />
      )}
    </div>
  );
};

export default LiveCallSystem;
