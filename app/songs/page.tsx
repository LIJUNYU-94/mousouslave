"use client";
import Head from "next/head";
import { useReducer } from "react";
import Menu from "../components/menu";
import { SongProvider } from "../components/SongContext";
import data from "../../src/mousouslave.json";
import { useSong } from "../components/SongContext";
import { SmallScreen } from "../components/smallscreen";
import YoutubeEmbed from "../components/youtubeEmbed";
const reducer = (state: string, action: { type: string; payload: string }) => {
  switch (action.type) {
    case "SET_MODE":
      return action.payload;
    default:
      return state;
  }
};
function SongsContent() {
  const [mode, dispatch] = useReducer(reducer, "video");
  const smallscreen = SmallScreen();
  const { selectedSongName } = useSong();
  const lyrics = selectedSongName
    ? data.find((song) => song.name === selectedSongName)?.lyrics ||
      "歌詞が見つかりません"
    : "";
  const now = selectedSongName
    ? data.findIndex((song) => song.name === selectedSongName)
    : -1; // 該当する曲がなければ -1 を返す
  /*
  表示させること：上：公式動画
                下：ライブ動画
*/
  const mv = selectedSongName
    ? data.find((song) => song.name === selectedSongName)?.mv ||
      "MVが見つかりません"
    : "";
  const live = selectedSongName
    ? data.find((song) => song.name === selectedSongName)?.live ||
      "liveが見つかりません"
    : "";
  return (
    <>
      <Head>
        <title>妄想slave応援非公式</title>
      </Head>
      <div
        className={`max-w-[500px] h-[100dvh] flex items-center justify-center bg-black/80 
      relative mx-auto ${
        mode === "video"
          ? "overflow-y-scroll [&::-webkit-scrollbar]:w-2[&::-webkit-scrollbar-track]:bg-gray-100[&::-webkit-scrollbar-thumb]:bg-gray-400dark:[&::-webkit-scrollbar-track]:bg-neutral-700dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          : ""
      }  `}
      >
        <Menu mode={mode} dispatch={dispatch} />
        <div
          className={`${
            smallscreen ? "h-[75dvh]" : "h-[80dvh]"
          } w-full bg-black mt-[2dvh] text-white ${
            mode === "lyrics"
              ? "overflow-y-scroll [&::-webkit-scrollbar]:w-2[&::-webkit-scrollbar-track]:bg-gray-100[&::-webkit-scrollbar-thumb]:bg-gray-400dark:[&::-webkit-scrollbar-track]:bg-neutral-700dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              : ""
          } 
          `}
        >
          <h2 className="text-2xl pt-[3dvh] text-center ">
            {data[now]?.name || "曲を選んでください"}
          </h2>
          {mode === "lyrics" && (
            <p className="whitespace-pre-line w-[80%] mx-auto mt-[3dvh] ">
              {lyrics}
            </p>
          )}
          {mode === "video" && (
            <div className="mt-[2dvh] flex flex-col justify-between">
              <div>
                <p className="text-center text-xl my-[1dvh] bg-slate-200 text-black tracking-widest">
                  公式MV
                </p>
                <div className="relative">
                  {mv === "" ? (
                    <p>曲を選択してください</p>
                  ) : (
                    <YoutubeEmbed videoId={mv} />
                  )}
                </div>
              </div>
              <div>
                <p className="text-center text-xl my-[1dvh] bg-slate-200 text-black tracking-widest">
                  ライブ動画(カメコ)
                </p>
                <div className="relative">
                  {live === "" ? (
                    <p>曲を選択してください</p>
                  ) : (
                    <YoutubeEmbed videoId={live} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Songs() {
  return (
    <SongProvider>
      <SongsContent /> {/* ✅ 別コンポーネントで useSong() を実行 */}
    </SongProvider>
  );
}
