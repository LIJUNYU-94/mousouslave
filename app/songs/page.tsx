"use client";
import Menu from "../components/menu";
import { SongProvider, useSong } from "../components/SongContext";
import data from "../../src/mousouslave.json";

function SongsContent() {
  const { selectedSongName } = useSong();
  // const lyrics = selectedSongName
  //   ? data.find((song) => song.name === selectedSongName)?.lyrics ||
  //     "歌詞が見つかりません"
  //   : "";
  // const now = selectedSongName
  //   ? data.findIndex((song) => song.name === selectedSongName)
  //   : -1; // 該当する曲がなければ -1 を返す

  return (
    <div>
      <Menu />
    </div>
  );
}

export default function Songs() {
  return (
    <SongProvider>
      {" "}
      {/* ✅ ここで Provider をラップ */}
      <SongsContent /> {/* ✅ 別コンポーネントで useSong() を実行 */}
    </SongProvider>
  );
}
