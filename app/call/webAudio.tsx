import { useState } from "react";

const AudioRecognition = ({
  onSongDetected,
}: {
  onSongDetected: (song: string, elapsedTime: number) => void;
}) => {
  const [isListening, setIsListening] = useState(false);
  let audioContext: AudioContext | null = null;
  let analyser: AnalyserNode | null = null;
  let dataArray: Uint8Array | null = null;
  let detectionStartTime: number | null = null;

  // 🎵 **イントロ音声特徴量（簡易版）**
  const songFingerprints: { [key: string]: number[] } = {
    song1: [20, 35, 60, 100],
    song2: [18, 40, 55, 120],
    song3: [22, 38, 70, 110],
  };

  const startListening = async () => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    detectionStartTime = audioContext.currentTime;
    setIsListening(true);

    setTimeout(() => detectSong(), 5000); // 5秒間の録音
  };

  const detectSong = () => {
    if (!analyser || !dataArray) return;
    analyser.getByteFrequencyData(dataArray);
    const detectedFingerprint = Array.from(dataArray).slice(0, 4);
    let bestMatch = "unknown";
    let bestScore = Infinity;

    Object.keys(songFingerprints).forEach((song) => {
      const diff = songFingerprints[song].reduce(
        (acc, val, i) => acc + Math.abs(val - detectedFingerprint[i]),
        0
      );
      if (diff < bestScore) {
        bestScore = diff;
        bestMatch = song;
      }
    });

    if (bestMatch !== "unknown" && detectionStartTime) {
      const elapsedTime = audioContext!.currentTime - detectionStartTime;
      onSongDetected(bestMatch, elapsedTime);
    }
  };

  return (
    <div>
      <button
        onClick={startListening}
        disabled={isListening}
        className="p-2 m-2 rounded border-2 border-white"
      >
        🎤 ライブ音声認識...
      </button>
      {isListening && <p>取得中</p>}
    </div>
  );
};

export default AudioRecognition;
