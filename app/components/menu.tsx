"use client";
import { usePathname } from "next/navigation";
import data from "@/src/mousouslave.json";
import { useSong } from "./SongContext";
import { useState, useEffect } from "react";
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
  // const isScreenSmall = SmallScreen();
  const handleSongSelect = (songName: string | null) => {
    if (songName === null) {
      setSelectedSongName(""); // 未選択状態を `""` にする
      setActiveMenu(null);
      return;
    }
    setSelectedSongName(songName); // 曲をセット
    setActiveMenu(null); // メニューを閉じる
  };
  // 3.7試しで追加
  const { selectedSongName } = useSong();
  const now = selectedSongName
    ? data.findIndex((song) => song.name === selectedSongName)
    : -1; // 該当する曲がなければ -1 を返す
  // 3.7試しで追加
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
        { label: "練習動画", value: "practicevideo" },
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
  const [isOpen, setIsOpen] = useState(false);
  const menu = menuConfig[pathname] || menuConfig.default;
  useEffect(() => {
    setActiveMenu("mode"); // ページを開いたらモードメニューを開く
  }, []);
  return (
    <>
      <div className="relative z-[200]">
        {/* ハンバーガーボタン */}
        <div
          className={`absolute top-[18px] right-[18px] w-11 h-11 ${
            isOpen ? "border-[1.5px]" : "border-[3px]"
          } border-white rounded-full bg-black/50 
                   flex items-center justify-center cursor-pointer transition-all duration-300`}
          onClick={() => {
            setIsOpen(!isOpen);
            setActiveMenu(null);
            if (
              (pathname === "/call" && mode === "practice") ||
              (pathname === "/songs" && mode === "video") ||
              (pathname === "/call" && mode === "practicevideo")
            ) {
              handleSongSelect(null);
            }
          }}
        >
          {/* ハンバーガーアイコン */}
          <div
            className={`flex flex-col justify-between w-6 h-4 transition-all duration-300 ${
              isOpen ? "translate-y-[2px]" : ""
            }`}
          >
            <div
              className={`w-6  bg-white rounded transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[6px] h-[3px]" : "h-[2px]"
              }`}
            ></div>
            <div
              className={`w-6 h-[2px] bg-white rounded transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6  bg-white rounded transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[7px] h-[3px]" : "h-[2px]"
              }`}
            ></div>
          </div>
        </div>
  {/* 3.7追加、コールモードの左上にボタンを付ける*/}
  {pathname === "/call"&& now!==-1&&<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" className="absolute top-[20px] left-[20px]" onClick={()=>{handleSongSelect(null);handleClick("songlist");}}>
  <path d="M3.99994 7.99997L3.29294 8.70697L2.58594 7.99997L3.29294 7.29297L3.99994 7.99997ZM8.99994 20C8.73472 20 8.48037 19.8946 8.29283 19.7071C8.10529 19.5195 7.99994 19.2652 7.99994 19C7.99994 18.7348 8.10529 18.4804 8.29283 18.2929C8.48037 18.1053 8.73472 18 8.99994 18V20ZM8.29294 13.707L3.29294 8.70697L4.70694 7.29297L9.70694 12.293L8.29294 13.707ZM3.29294 7.29297L8.29294 2.29297L9.70694 3.70697L4.70694 8.70697L3.29294 7.29297ZM3.99994 6.99997H14.4999V8.99997H3.99994V6.99997ZM14.4999 20H8.99994V18H14.4999V20ZM20.9999 13.5C20.9999 15.2239 20.3151 16.8772 19.0961 18.0962C17.8771 19.3151 16.2238 20 14.4999 20V18C15.0909 18 15.676 17.8836 16.222 17.6574C16.768 17.4313 17.2641 17.0998 17.6819 16.6819C18.0998 16.2641 18.4312 15.768 18.6574 15.222C18.8835 14.6761 18.9999 14.0909 18.9999 13.5H20.9999ZM14.4999 6.99997C16.2238 6.99997 17.8771 7.68479 19.0961 8.90377C20.3151 10.1228 20.9999 11.7761 20.9999 13.5H18.9999C18.9999 12.909 18.8835 12.3239 18.6574 11.7779C18.4312 11.2319 18.0998 10.7359 17.6819 10.318C17.2641 9.90012 16.768 9.56866 16.222 9.34251C15.676 9.11636 15.0909 8.99997 14.4999 8.99997V6.99997Z" fill="white"/>
</svg>}
  
        <ul
          className={`absolute right-[15px] w-[120px] top-[77px] h-fit flex flex-col items-center 
                    rounded-[5px] text-xl bg-black/50 transition-all duration-500 origin-top-right z-[200]
                    ${
                      isOpen
                        ? "translate-y-0 opacity-100 scale-100"
                        : "-translate-y-10 opacity-0 scale-0"
                    }`}
        >
          <li
            className="cursor-pointer w-[120px] py-[15px] bg-slate-600 text-white text-center transition-all duration-300 "
            onClick={() => {
              setIsOpen(false);
              handleClick("mode");
            }}
          >
            モード選択
          </li>
          <li
            className="cursor-pointer text-center w-[120px] py-[15px] bg-slate-700 text-white transition-all duration-300 "
            onClick={() => {
              setIsOpen(false);
              handleClick("songlist");
            }}
          >
            曲リスト
          </li>
          <li className="relative z-[200] bg-slate-600  w-[120px] py-[15px] ">
            <Link
              className="block text-center z-[200] text-white whitespace-nowrap transition-all duration-300"
              href="/"
            >
              TOPページ
            </Link>
          </li>
        </ul>
      </div>

      {activeMenu === "songlist" && (
        <div className="absolute top-[77px] right-[5%] h-[75dvh] w-[90%] bg-purple-700 p-4 shadow-lg rounded text-white z-20 ">
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
        <div className="absolute top-[77px] left-[5%] h-[80dvh] w-[90%] bg-slate-200 p-4 shadow-lg rounded text-xl z-20">
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
                  setActiveMenu("songlist");
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div
            className={`absolute bottom-[5dvh] flex justify-center gap-[80px] h-[46.5px] w-[90%]`}
          >
            <p
              className="text-center w-[80px] bg-slate-700 text-white whitespace-nowrap px-4 py-2 rounded-md"
              onClick={() => setActiveMenu(null)}
            >
              close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
