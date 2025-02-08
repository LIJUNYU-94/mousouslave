"use client";
import { useState, useReducer, useEffect } from "react";
import data from "@/src/mousouslave.json";
import Menu from "../components/menu";
import { SongProvider } from "../components/SongContext";
import { useSong } from "../components/SongContext";
import YouTubePlayer from "../components/youtubePlayer";

const reducer = (state: string, action: { type: string; payload: string }) => {
  switch (action.type) {
    case "SET_MODE":
      return action.payload;
    default:
      return state;
  }
};
const callMapping: Record<string, string> = {
  Introduction: "開幕",
  PreChorus: "サビ前",
  Chorus: "サビ",
  PostChorus: "サビ後",
  Verse: "Aメロ",
  PreChorus2: "2サビ前",
  Interlude: "間奏",
  Bridge: "落ちサビ",
  Outro: "終幕",
};
interface CallItemProps {
  position: string[] | string[];
  mix: string[];
  mixtext: string[];
  isOpen: boolean;
  onToggle: () => void;
}
interface CallLiveProps {
  position: string[] | string[];
  mixtext: string[];
}
function CallItem({ position, mix, mixtext, isOpen, onToggle }: CallItemProps) {
  return (
    <>
      <div className="w-[90%] mt-[2dvh] mb-[1dvh] mx-auto border-white ">
        <p className="text-xl tracking-widest text-bold">{position}</p>
        <p
          className="relative tracking-wider text-bold ml-[15px] mt-[1dvh]"
          onClick={onToggle}
        >
          {mix}
          <span className="absolute right-[0]">{isOpen ? "-" : "+"}</span>
        </p>
        {isOpen && (
          <div
            className="tracking-wide overflow-y-scroll max-h-[30dvh] bg-slate-600 ml-[15px] pl-[10px] py-[5px] [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            {mixtext.map((text, i) => (
              <p className="tracking-wider" key={i}>
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
function LiveCall({ position, mixtext }: CallLiveProps) {
  return (
    <div className="mt-[2dvh]  overflow-y-scroll scrollbar-none">
      <p className="mt-[2dvh] text-center">{position}</p>
      <div className="w-[80%] mx-auto text-xl tracking-wider overflow-y-scroll max-h-[120dvh] pb-[10dvh] scrollbar-none">
        {mixtext.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
}
function SongsContent() {
  const [mode, dispatch] = useReducer(reducer, "check");
  const [currentTime, setCurrentTime] = useState(0);
  const handleTimeUpdate = (time: number) => {
    console.log("🎵 Received Time Update:", time);
    setCurrentTime(time);
  };

  const { selectedSongName } = useSong();
  // const lyrics = selectedSongName
  //   ? data.find((song) => song.name === selectedSongName)?.lyrics ||
  //     "歌詞が見つかりません"
  //   : "";
  const now = selectedSongName
    ? data.findIndex((song) => song.name === selectedSongName)
    : -1; // 該当する曲がなければ -1 を返す
  const call: Partial<Record<string, string>> =
    now !== -1 ? data[now]?.call || {} : {};
  const live = selectedSongName
    ? data.find((song) => song.name === selectedSongName)?.live ||
      "liveが見つかりません"
    : "";
  const mixlist: string[][] = Object.entries(callMapping)
    .filter(([key]) => typeof call[key] === "string") // `call[key]` が `string` の場合のみ取得
    .map(([key]) => [call[key] as string]); // `mixname` の値をリスト形式にする
  const positions = data[now]?.call
    ? Object.keys(data[now].call)
        .filter((call): call is keyof typeof callMapping => call in callMapping)
        .map((call) => callMapping[call])
    : [];
  const callfull: Record<string, string[]> =
    now !== -1
      ? Object.fromEntries(
          Object.entries(data[now]?.callfull || {}).map(([key, value]) => [
            key,
            value ?? [],
          ])
        )
      : {};

  const mixtext: string[][] = Object.values(callfull);
  const mix = mixlist.map((mix, index) => ({
    name: data[now].name,
    position: positions[index] || [],
    mix: mix,
    mixtext: mixtext[index] || [],
  }));
  const [active, setActive] = useState<number | null>(null);
  const handleToggle = (index: number) =>
    setActive((prev) => (prev === index ? null : index));

  useEffect(() => {
    if (mode !== "practice") return;
    let player: YT.Player | null = null;

    const updateTime = () => {
      if (!player || typeof player.getCurrentTime !== "function") return;
      const newTime = Math.floor(player.getCurrentTime());
      console.log("Updated Current Time:", newTime);
      setCurrentTime(newTime);
    };

    const checkYouTubePlayer = () => {
      if (window.YT && window.YT.Player) {
        console.log("YouTube API is loaded!");

        player = new window.YT.Player("youtube-player", {
          events: {
            onReady: () => {
              console.log("YouTube Player is ready!");
            },
            onStateChange: (event: YT.OnStateChangeEvent) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                console.log("Video is playing!");
                setInterval(updateTime, 1000); //  動画が再生されたら `updateTime()` を開始
              }
            },
          },
        });
      } else {
        console.warn("YouTube API is not yet loaded, retrying...");
        setTimeout(checkYouTubePlayer, 500);
      }
    };

    console.log("Starting YouTube API load check...");
    checkYouTubePlayer();

    return () => {
      if (player) {
        player.stopVideo();
      }
    };
  }, []);

  const getCurrentSongSection = (currentTime: number): string | null => {
    const roundedTime = Math.floor(currentTime);
    const sectionTimes: Record<string, number> = data[now]?.calllive
      ? (Object.fromEntries(
          Object.entries(data[now].calllive).filter(
            ([, value]) => typeof value === "number"
          )
        ) as Record<string, number>)
      : {};

    const foundSection = Object.keys(sectionTimes)
      .sort((a, b) => sectionTimes[b] - sectionTimes[a]) // **時間の大きい順に並び替え**
      .find((section) => roundedTime >= sectionTimes[section]);

    console.log("Found Section Before Mapping:", foundSection);

    return foundSection ? callMapping[foundSection] : null;
  };

  return (
    <>
      {/* <p className="absolute text-white">{now}</p> */}

      <div className="max-w-[500px] relative mx-auto ">
        <Menu mode={mode} dispatch={dispatch} />
        <div
          className={`h-[100dvh] w-full bg-black text-white overflow-y-scroll scrollbar-none`}
        >
          <h2 className="text-2xl pt-[20px] text-center ">
            {data[now]?.name || "曲を選んでください"}
          </h2>

          {mode === "check" && (
            <div className="mb-[20dvh] overflow-y-scroll scrollbar-none">
              {mix.map((item, index) => (
                <CallItem
                  key={index}
                  position={
                    Array.isArray(item.position)
                      ? item.position
                      : [item.position]
                  }
                  mix={item.mix}
                  mixtext={item.mixtext}
                  isOpen={active === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
          )}

          {mode === "practice" && (
            <>
              {now !== -1 && (
                <YouTubePlayer videoId={live} onTimeUpdate={handleTimeUpdate} />
              )}
              {/* {now !== -1 &&
                mix.map((item, index) => (
                  <LiveCall
                    key={index}
                    position={
                      Array.isArray(item.position)
                        ? item.position
                        : [item.position]
                    }
                    mixtext={item.mixtext}
                  />
                ))} */}
              {now !== -1 &&
                (() => {
                  const currentSection = getCurrentSongSection(currentTime);
                  const item = mix.find((item) => {
                    console.log("Checking Item Position:", item.position);
                    console.log(
                      "Comparing with Current Section:",
                      currentSection
                    );
                    return item.position === currentSection;
                  });
                  return item ? (
                    <LiveCall
                      position={
                        Array.isArray(item.position)
                          ? item.position
                          : [item.position]
                      }
                      mixtext={item.mixtext}
                    />
                  ) : null;
                })()}
            </>
          )}
          {mode === "live" && (
            <>
              <p>LIVEモードの画面 開発中～</p>
            </>
          )}
          {mode === "practicevideo" && <p> 練習動画 開発中～</p>}
        </div>
      </div>
    </>
  );
}
export default function call() {
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 640);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <SongProvider>
      <SongsContent />
    </SongProvider>
  );
}
