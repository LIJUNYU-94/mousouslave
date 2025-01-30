"use client";
import { usePathname } from "next/navigation";
import data from "@/src/mousouslave.json";
import { useSong } from "./SongContext";
import { useState } from "react";
// import { SmallScreen } from "../components/smallscreen";
const songs = data;
const songlist = songs
  .filter((song) => Number(song.rank) >= 1 && Number(song.rank) <= 13) //
  .sort((a, b) => Number(a.rank) - Number(b.rank)); // rank 昇順ソート
// interface Song {
//   id: number;
//   name: string;
//   rank: string;
// }
function MenuBtn() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const handleClick = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName)); // クリックしたボタンのメニューを開閉
  };
  const { setSelectedSongName } = useSong();
  const pathname = usePathname();
  const handleSongSelect = (songName: string) => {
    setSelectedSongName(songName); // 曲をセット
    setActiveMenu(null); // メニューを閉じる
  };
  // const smallscreen = SmallScreen();
  return (
    <>
      <div className="cursor-pointer absolute top-[3dvh] right-[10%] h-[45px] w-[90px] flex flex-col justify-center border-2 border-white rounded-full z-10 bg-violet-500 text-white">
        <p
          onClick={() => handleClick("songlist")}
          className="h-fit text-center tracking-widest"
        >
          曲リスト
        </p>
      </div>

      {pathname === "/call" && (
        <div className="absolute top-[3dvh] left-[10%] h-[45px] w-[90px] flex flex-col justify-center border-2 border-white rounded-full z-10 bg-slate-700 text-white">
          <p
            onClick={() => handleClick("mode")}
            className="h-fit text-center tracking-widest"
          >
            モード
          </p>
        </div>
      )}
      {activeMenu === "songlist" && (
        <div className="absolute top-[11.2dvh] right-[5%] h-[75dvh] w-[90%] bg-purple-700 p-4 shadow-lg rounded text-white z-20 ">
          <p className="tracking-wider">♬妄想slave曲リスト</p>
          <ul className="ml-[25%] mt-[2dvh] tracking-wider flex flex-col justify-between h-[65dvh]">
            {songlist.map((song, index) => (
              <li
                key={song.id}
                onClick={() => handleSongSelect(song.name)}
                className={`transition-all duration-300 `}
              >
                {index + 1}.{song.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeMenu === "mode" && (
        <div className="absolute top-[10dvh] left-[5%] h-[40dvh] w-[90%] bg-gray-200 p-4 shadow-lg rounded text-xl">
          <p>⚙️ モード設定メニュー</p>
        </div>
      )}
    </>
  );
}

export default function Menu() {
  return (
    <>
      <MenuBtn></MenuBtn>
    </>
  );
}
