"use client";
import { useState } from "react";
import data from "@/src/mousouslave.json";
// import { useEffect } from "react";
import Menu from "../components/menu";
import { SongProvider } from "../components/SongContext";
import { useSong } from "../components/SongContext";
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
  mix: string[];
  mixtext: string[];
  isOpen: boolean;
  onToggle: () => void;
}
function CallItem({ mix, mixtext, isOpen, onToggle }: CallItemProps) {
  return (
    <>
      <div className="w-[90%] mt-[1vh] mb-[0.5vh] mx-auto border-white overflow-y-scroll">
        <p className="relative" onClick={onToggle}>
          {mix}
          <span className="absolute right-[0]">{isOpen ? "-" : "+"}</span>
        </p>
        {isOpen && (
          <div className="text-xl overflow-y-scroll max-h-[50vh]">
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
    mix: mix,
    mixtext: mixtext[index] || [],
  }));
  const [active, setActive] = useState<number | null>(null);
  const handleToggle = (index: number) =>
    setActive((prev) => (prev === index ? null : index));
  return (
    <>
      <p className="absolute text-white">{now}</p>
      <div className="w-full h-full flex items-center justify-center bg-slate-700">
        <Menu />
        <div className="h-[80vh] w-full bg-black mt-[2vh] text-white ">
          {mix.map((item, index) => (
            <CallItem
              key={index}
              mix={item.mix}
              mixtext={item.mixtext}
              isOpen={active === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
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
