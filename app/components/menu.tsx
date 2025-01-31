"use client";
import { usePathname } from "next/navigation";
import data from "@/src/mousouslave.json";
import { useSong } from "./SongContext";
import { useState } from "react";
import Link from "next/link";
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

// Props の型定義
interface MenuProps {
  mode: string;
  dispatch: React.Dispatch<{ type: string; payload: string }>; // ✅ `dispatch` を受け取る
}
export default function Menu({ mode, dispatch }: MenuProps) {
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

  type MenuConfigMap = {
    [key: string]: {
      title: string;
      options: { label: string; value: string }[];
    };
  };

  const menuConfig: MenuConfigMap = {
    "/songs": {
      title: "⚙️曲表示モード",
      options: [
        { label: "歌詞", value: "lyrics" },
        { label: "動画", value: "video" },
      ],
    },
    "/call": {
      title: "⚙️コール表示モード",
      options: [
        { label: "全文モード", value: "check" },
        { label: "練習モード", value: "practice" },
        { label: "LIVEモード", value: "live" },
        { label: "簡潔モード", value: "simple" },
      ],
    },
    default: {
      title: "⚙️モード設定メニュー",
      options: [
        { label: "デフォルト", value: "default" },
        { label: "言語設定", value: "language" },
      ],
    },
  };

  const menu = menuConfig[pathname] || menuConfig.default;
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

      <div className="absolute top-[3dvh] left-[10%] h-[45px] w-[90px] flex flex-col justify-center border-2 border-white rounded-full z-10 bg-slate-700 text-white">
        <p
          onClick={() => handleClick("mode")}
          className="h-fit text-center tracking-widest"
        >
          モード
        </p>
      </div>

      {activeMenu === "songlist" && (
        <div className="absolute top-[11.2dvh] right-[5%] h-[75dvh] w-[90%] bg-purple-700 p-4 shadow-lg rounded text-white z-20 ">
          <p className="tracking-wider">♬妄想slave曲リスト</p>
          <ul className="ml-[25%] mt-[2dvh] tracking-wider flex flex-col justify-between h-[65dvh]">
            {songlist.map((song, index) => (
              <li
                key={song.id}
                onClick={() => handleSongSelect(song.name)}
                className={`transition-all duration-300 cursor-pointer`}
              >
                {index + 1}.{song.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeMenu === "mode" && (
        <div className="absolute top-[10dvh] left-[5%] h-[60dvh] w-[90%] bg-slate-200 p-4 shadow-lg rounded text-xl z-20">
          <p className="font-bold mb-[4dvh]">{menu.title}</p>
          <div className="flex flex-col gap-2 mt-[2dvh]">
            {menu.options.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-2 my-2 text-white rounded-lg transition ${
                  mode === option.value
                    ? "bg-purple-600/80 font-bold" //
                    : "bg-slate-500/40 "
                }`}
                onClick={() => {
                  dispatch({ type: "SET_MODE", payload: option.value });
                  setActiveMenu(null);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          <Link
            className="absolute bottom-[1dvh] right-[0%] w-full h-[7dvh]"
            href="/"
          >
            <p className=" text-center absolute  left-1/2  -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-700 text-white whitespace-nowrap px-4 py-2 rounded-md">
              back
            </p>
          </Link>
        </div>
      )}
    </>
  );
}
