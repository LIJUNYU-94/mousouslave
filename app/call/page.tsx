"use client";
import { useState, useReducer, useEffect, Suspense } from "react";
import mousouData from "@/src/mousouslave.json";
import risaData from "@/src/risa.json";
import { useSearchParams } from "next/navigation";
import Menu from "../components/menu";
import { SongProvider } from "../components/SongContext";
import { useSong } from "../components/SongContext";
import YouTubePlayer from "../components/youtubePlayer";
// import { Truculenta } from "next/font/google";
// import { DiVim } from "react-icons/di";

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
  Versea:"1A後",
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
          <div className="tracking-wide h-fit bg-slate-600 ml-[15px] pl-[10px] py-[5px] ">
            {mixtext.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
function LiveCall({ position, mixtext }: CallLiveProps) {
  return (
    <div className="mt-[2dvh] overflow-y-scroll scrollbar-none">
      <p className="my-[1dvh] text-center">{position}</p>
      <div className="w-[90%] mx-auto overflow-y-scroll max-h-[120dvh] pb-[10dvh] scrollbar-none">
        {mixtext.map((text, i) => (
          <p className="break-keep" key={i}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function LiveMode({ position, mixtext }: CallLiveProps) {
  return (
    <div className="mt-[2dvh] overflow-y-scroll scrollbar-none">
      <p className="my-[1dvh] text-center text-xl font-bold">{position}</p>
      <div className="w-[90%] mx-auto overflow-y-scroll max-h-[120dvh] pb-[10dvh] scrollbar-none">
        {mixtext.map((text, i) => (
          <p
            key={i}
            className="text-4xl lg:text-5xl font-extrabold text-center leading-tight break-keep"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function SongsContent() {
  const searchParams = useSearchParams();
  const appMode = searchParams.get("mode");
  const data = appMode === "risa" ? risaData : mousouData;

  const [mode, dispatch] = useReducer(reducer, "check");
  const [currentTime, setCurrentTime] = useState(0);
  const handleTimeUpdate = (time: number) => {
    console.log("🎵 Received Time Update:", time);
    setCurrentTime(time);
  };

  const { selectedSongName } = useSong();
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
  const videoList = now !== -1 ? data[now]?.jide || [] : [];
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
  //3.7追加ボタン　自動手動の切り替え
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [manualSection, setManualSection] = useState<string | null>(
    Object.keys(callMapping)[0] || null
  );
  const sectionTimes: Record<string, number> = data[now]?.calllive
  ? (Object.fromEntries(
      Object.entries(data[now].calllive).filter(
        ([, value]) => typeof value === "number"
      )
    ) as Record<string, number>)
  : {};

// セクションを時間の小さい順にソート
const sections = Object.keys(sectionTimes).sort(
  (a, b) => sectionTimes[a] - sectionTimes[b]
);
  
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

  const [elapsedTime, setElapsedTime] = useState(0); // 経過時間（秒）
  const [manualOffset, setManualOffset] = useState(0);
  useEffect(() => {
    if (!isAutoMode) {
      setManualSection(getCurrentSongSection(elapsedTime) || Object.keys(callMapping)[0] || null);
    }
  }, [isAutoMode]);
  
  useEffect(() => {
    setElapsedTime(0);
    setManualOffset(0);
  }, [now]);
  useEffect(() => {
    const startTime = Date.now(); // ページを開いた瞬間の時間を記録
    const interval = setInterval(() => {
      setElapsedTime(
        Math.floor((Date.now() - startTime) / 1000) + manualOffset
      ); // 🔹 manualOffset を適用
    }, 1000); // 1秒ごとに更新

    return () => clearInterval(interval); // アンマウント時にクリーンアップ
  }, [now, manualOffset]);
  const adjustTime = (amount: number) => {
    setManualOffset((prev) => prev + amount);
  };
  // 分と秒に変換
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
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
          {mode === "live" &&
            now !== -1 &&
            (() => {
              const currentSection = isAutoMode
  ? getCurrentSongSection(elapsedTime)
  : callMapping[manualSection||""];

const item = mix.find((item) => item.position === currentSection);
console.log("現在の manualSection:", callMapping[manualSection||""]);
console.log(getCurrentSongSection(elapsedTime))

              return (
                <>
                <button
  className="px-4 bg-blue-600 text-white rounded"
  onClick={() => {setIsAutoMode((prev) => !prev)}}
>
  {isAutoMode ? "手動モードへ切替" : "自動モードへ切替"}
</button>

                  {isAutoMode?(<div>
                    <p>
                      時間: {minutes}分 {seconds}秒
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        className="px-4 bg-gray-700 text-white rounded"
                        onClick={() => adjustTime(-5)}
                      >
                        -5秒
                      </button>
                      <button
                        className="px-4 bg-gray-700 text-white rounded"
                        onClick={() => adjustTime(5)}
                      >
                        +5秒
                      </button>
                    </div>
                    {item ? (
                      <LiveMode
                        position={
                          Array.isArray(item.position)
                            ? item.position
                            : [item.position]
                        }
                        mixtext={item.mixtext}
                      />
                    ) : (
                      <p className="text-gray-500">表示する内容がありません</p>
                    )}
                  </div>):
                 (
                  <div>
                     <div className="flex flex-wrap justify-center gap-2 mt-4">
        {sections.map((section) => (
          <button
            key={section}
            className={`px-4 py-2 rounded ${
              manualSection === section ? "bg-green-500 text-white" : "bg-gray-700 text-white"
            }`}
            onClick={() =>{setManualSection(section)} }
          >
            {callMapping[section]}
          </button>
        ))}
      </div>
                    {item ? (
                      <LiveMode
                        position={
                          Array.isArray(item.position)
                            ? item.position
                            : [item.position]
                        }
                        mixtext={item.mixtext}
                      />
                    ) : (
                      <p className="text-gray-500">表示する内容がありません</p>
                    )}
                  </div>)}
                </>
              );
            })()}

          {mode === "practicevideo" && (
            <>
              <p className="w-[90%] mx-auto mt-[5dvh]">
                動画ソース： <br />
                みんなの師匠じぃでさん <br /> X:おやじぃで(@kusocameko)
              </p>
              <p className="w-[90%] mx-auto my-[1dvh]">
                本人の許可を得て掲載しています
              </p>

              <div className="flex flex-col items-center">
                {videoList.length > 0 ? (
                  videoList.map((video, index) => (
                    <video key={index} className="w-[90%] my-2" controls loop>
                      <source src={`/videos/${video}`} type="video/mp4" />
                      お使いのブラウザは video タグをサポートしていません。
                    </video>
                  ))
                ) : (
                  <p className="text-gray-400 text-center my-4">
                    この曲はまだコール動画がありません
                  </p>
                )}
              </div>

              <p className="w-[90%] mx-auto my-[2dvh]">
                Xで見る
                <a
                  className=" font-bold underline text-xl"
                  href="https://x.com/search?q=%23%E5%A6%84%E3%82%B9%E3%83%AC%E8%84%B1%E6%B3%95MIX&src=hashtag_click"
                >
                  #妄スレ脱法MIX
                </a>
              </p>
            </>
          )}
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
      <Suspense fallback={<div>Loading...</div>}>
        <SongsContent />
      </Suspense>
    </SongProvider>
  );
}
