"use client";
import Link from "next/link";
import { SmallScreen } from "./components/smallscreen";
import mousouslave from "../src/mousouslave.json";
import lisa from "../src/lisa.json";
import { useState } from "react";

function part(x: number) {
  // const data = [
  //   {
  //     name: "オリジナル曲全14曲",
  //     classname: "bg-[linear-gradient(120deg,#dc143c_0%,#ff7f50_100%)]",
  //   },
  //   {
  //     name: "全14曲コール",
  //     classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]",
  //   },
  //   {
  //     name: "各公式リンク",
  //     classname: "bg-[linear-gradient(120deg,#dc143c_0%,#ff7f50_100%)]",
  //   },
  //   {
  //     name: "各非公式リンク",
  //     classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]",
  //   },
  //   {
  //     name: "スケジュール",
  //     classname: "bg-[linear-gradient(120deg,#dc143c_0%,#ff7f50_100%)]",
  //   },
  //   {
  //     name: "about me",
  //     classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]",
  //   },
  // ];
  const data = [
    {
      name: `全${mousouslave.length}曲歌詞/動画`,
      classname: "bg-[linear-gradient(120deg,#dd3744_0%,#ff7f7f_100%)]", // 赤
    },
    {
      name: `全${mousouslave.length}曲コール`,
      classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]", // 黄
    },
    {
      name: "各公式リンク",
      classname: "bg-[linear-gradient(120deg,#1d4c36_0%,#2e7d59_100%)]", // 緑
    },
    {
      name: "各非公式リンク",
      classname: "bg-[linear-gradient(120deg,#c9c9d3_0%,#f0f0f5_100%)]", // 白
    },
    {
      name: "スケジュール",
      classname: "bg-[linear-gradient(120deg,#dd3744_0%,#ff7f7f_100%)]", // 赤
    },
    {
      name: "about me",
      classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]", // 黄
    },
    //lisaモード
    {
      name: `歌詞/動画`,
      classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]", // 黄
    },
    {
      name: `コール`,
      classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]", // 黄
    },
    {
      name: "スケジュール",
      classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]", // 黄
    },
  ];
  return (
    <>
      <div
        className={`relative flex justify-center flex-col ${data[x].classname}`}
      >
        <p className="tracking-widest text-center text-white whitespace-nowrap p-2 rounded-md h-fit w-fit mx-auto px-[20px] text-xl font-bold">
          {data[x].name}
        </p>
      </div>
    </>
  );
}
export default function Home() {
  const smallscreen = SmallScreen();
  const [mode, setMode] = useState("lisa")
  return (
    <>
      <main className="h-[100dvh] bg-slate-400/80 max-w-[500px] mx-auto">
        <div className="relative">
          <h1 className="text-4xl font-bold text-center py-[10dvh] text-white bg-[url('/header.png')] bg-cover bg-center">
            {mode === "lisa"?"指田りさ":"妄想slave"} <br />
            非公式応援アプリ
          </h1>
          <button
  onClick={() => setMode(mode === "lisa" ? "mousou" : "lisa")}
  className="absolute bottom-4 right-4 z-10
             flex items-center gap-2
             bg-black/60 backdrop-blur-md
             text-white text-sm px-3 py-2 rounded-full"
>
  <span className={mode === "mousou" ? "font-bold" : "opacity-50"}>妄想slave</span>
  <div className="w-8 h-4 bg-white/40 rounded-full relative">
    <div
      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all
        ${mode === "lisa" ? "right-0.5" : "left-0.5"}`}
    />
  </div>
  <span className={mode === "lisa" ? "font-bold" : "opacity-50"}>りさち</span>
</button>
        </div>
        <div
          className={`grid gap-[0.5vh] 
            ${smallscreen ? "h-[65dvh]" : "h-[68dvh]"} ${mode === "lisa"?"grid-rows-3":"grid-rows-6"}`}
          >
          <Link className="relative grid" href={`/songs/`}>
            {mode === "lisa"? part(6) :part(0)}
          </Link>
          <Link className="relative grid" href={`/call/`}>
             {mode === "lisa"? part(7) :part(1)}
          </Link>
          {mode==="mousou"&&<Link className="relative grid" href={`/officials/`}>
            {part(2)}
          </Link>}
          {mode === "mousou"&&<Link className="relative grid" href={`/unofficials/`}>
            {part(3)}
          </Link>}
          <Link className="relative grid" href={mode === "lisa"
              ? "http://timetr.ee/p/risa_0305_"
              : "http://timetr.ee/p/mousouslave"}>
             {mode === "lisa"? part(8) :part(4)}
          </Link>
          {mode === "mousou" &&<Link className="relative grid" href={`/about/`}>
            {part(5)}
          </Link>}
        </div>
      </main>
    </>
  );
}
