"use client";
import { useState, useReducer } from "react";
import data from "@/src/mousouslave.json";
import Menu from "../components/menu";
import { SongProvider } from "../components/SongContext";
import { useSong } from "../components/SongContext";
import { SmallScreen } from "../components/smallscreen";
import LiveCallSystem from "./livecall";
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
            className="tracking-wide overflow-y-scroll max-h-[30dvh] bg-slate-600 ml-[15px] pl-[5px] pt-[2px] [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            {mixtext.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
function SongsContent() {
  const [mode, dispatch] = useReducer(reducer, "check");
  const smallscreen = SmallScreen();
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
  return (
    <>
      {/* <p className="absolute text-white">{now}</p> */}

      <div className="max-w-[500px] h-[100dvh] flex items-end justify-end bg-black/80 relative mx-auto ">
        <Menu mode={mode} dispatch={dispatch} />
        <div
          className={`${
            smallscreen ? "h-[87dvh]" : "h-[91dvh]"
          } w-full bg-black mt-[2dvh] text-white overflow-y-scroll [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
        >
          <h2 className="text-2xl mt-[2dvh] text-center ">
            {data[now]?.name || "曲を選んでください"}
          </h2>
          {mode === "check" &&
            mix.map((item, index) => (
              <CallItem
                key={index}
                position={
                  Array.isArray(item.position) ? item.position : [item.position]
                }
                mix={item.mix}
                mixtext={item.mixtext}
                isOpen={active === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          {mode === "practice" && <p>🎤 練習モードの画面 開発中～</p>}
          {mode === "live" && (
            <>
              <p>🔥 LIVEモードの画面 開発中～</p>
              <LiveCallSystem />
            </>
          )}
          {mode === "practicevideo" && <p>🔥 練習動画 開発中～</p>}
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
      <main className="h-[100dvh]">
        <SongsContent />
      </main>
    </SongProvider>
  );
}
