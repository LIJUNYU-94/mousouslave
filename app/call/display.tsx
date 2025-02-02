import { useEffect, useState } from "react";

const CallDisplay = ({
  song,
  elapsedTime,
}: {
  song: string;
  elapsedTime: number;
}) => {
  const [callText, setCallText] = useState("");

  const songData: { [key: string]: { time: number; text: string }[] } = {
    song1: [
      { time: 5, text: "オイ！オイ！オイ！" },
      { time: 10, text: "HEY! HEY! HEY!" },
    ],
    song2: [
      { time: 3, text: "Woo~!" },
      { time: 8, text: "Jump! Jump!" },
    ],
  };

  useEffect(() => {
    const checkTime = () => {
      const callEntry = songData[song]?.find(
        (entry) => Math.abs(elapsedTime - entry.time) < 0.5
      );
      if (callEntry) {
        setCallText(callEntry.text);
      } else {
        setCallText("");
      }
    };

    const interval = setInterval(checkTime, 500);
    return () => clearInterval(interval);
  }, [song, elapsedTime]);

  return <h1 className="text-red-500 text-4xl">{callText}</h1>;
};

export default CallDisplay;
