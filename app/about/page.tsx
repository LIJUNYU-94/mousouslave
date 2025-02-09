"use client";
import Link from "next/link";
import { SmallScreen } from "../components/smallscreen";
export default function about() {
  const isScreenSmall = SmallScreen();
  return (
    <>
      <div
        className={`${
          isScreenSmall ? "h-[800px]" : "h-[100dvh]"
        } max-w-[500px] bg-slate-300/80 relative`}
      >
        <h1 className="text-4xl font-bold text-center py-[10dvh] text-white bg-[url('/header.png')] bg-cover bg-center">
          about me
        </h1>
        <div className=" py-[3dvh] flex flex-col text-left">
          <p className="text-2xl text-center">作者：リ グンウ</p>
          <p className="text-xl w-[80%] mx-auto pt-[5dvh]">
            22.4～日本。
            <br /> Webデザイン科 在学1年生。
            <br /> アイドル現場・mix初心者。
            <br />
            主現場：妄想slave💛 <br /> <br />
          </p>
        </div>
        <div
          className={`flex flex-col text-left ${
            isScreenSmall ? "pb-[100px]" : ""
          }`}
        >
          <dt className="text-xl ml-[10%] font-bold pb-[1vh]">更新履歴：</dt>
          <dd className="ml-[15%]">1.20:制作開始</dd>
          <dd className="ml-[15%]">1.21:コールチェック機能</dd>
          <dd className="ml-[15%]">1.30:歌詞をチェック機能</dd>
          <dd className="ml-[15%]">1.30:MVとライブ映像を見る機能</dd>
          <dd className="ml-[15%]">2.8:動画の使用許可取得済、全ページ公開</dd>
          <dd className="ml-[15%]">2.9:練習モード機能</dd>
        </div>
        <div className="absolute bottom-[50px] w-full">
          <Link href="/">
            <p className="w-fit mx-auto text-center bg-slate-700 text-white whitespace-nowrap px-4 py-2 rounded-md">
              back
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
