"use client";
import Link from "next/link";
import { SmallScreen } from "./components/smallscreen";

function part(x: number) {
  const data = [
    {
      name: "オリジナル曲全14曲",
      classname: "bg-[linear-gradient(120deg,#dc143c_0%,#ff7f50_100%)]",
    },
    {
      name: "全14曲コール",
      classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]",
    },
    {
      name: "各公式リンク",
      classname: "bg-[linear-gradient(120deg,#dc143c_0%,#ff7f50_100%)]",
    },
    {
      name: "各非公式リンク",
      classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]",
    },
    {
      name: "スケジュール",
      classname: "bg-[linear-gradient(120deg,#dc143c_0%,#ff7f50_100%)]",
    },
    {
      name: "about me",
      classname: "bg-[linear-gradient(120deg,#f0e68c_0%,#ffac16_100%)]",
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
  return (
    <>
      <main className="h-[100dvh] bg-slate-400/80 max-w-[500px] mx-auto">
        <h1 className="text-4xl font-bold text-center py-[10dvh] text-white bg-[url('/header.png')] bg-cover bg-center">
          妄想slave <br />
          非公式応援アプリ
        </h1>
        <div
          className={`grid grid-rows-6 gap-[0.5vh] ${
            smallscreen ? "h-[65dvh]" : "h-[68dvh]"
          }`}
        >
          <Link className="relative grid" href={`/songs/`}>
            {part(0)}
          </Link>
          <Link className="relative grid" href={`/call/`}>
            {part(1)}
          </Link>
          <Link className="relative grid" href={`/officials/`}>
            {part(2)}
          </Link>
          <Link className="relative grid" href={`/unofficials/`}>
            {part(3)}
          </Link>
          <Link className="relative grid" href="http://timetr.ee/p/mousouslave">
            {part(4)}
          </Link>
          <Link className="relative grid" href={`/about/`}>
            {part(5)}
          </Link>
        </div>
      </main>
    </>
  );
}
