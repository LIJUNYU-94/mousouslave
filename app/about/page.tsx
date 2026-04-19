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
          <p className="text-2xl text-center">制作者：リ グンウ</p>
          <p className="text-xl w-[80%] mx-auto pt-[5dvh]">
            22.4～日本
            <br /> 社会人1年目
          </p>
        </div>
        <div
          className={`flex flex-col text-left ${
            isScreenSmall ? "pb-[100px]" : ""
          }`}
        >
          <dt className="text-xl ml-[10%] font-bold pb-[1vh]">更新履歴：</dt>
          <dd className="ml-[15%]">25.1.20:制作開始</dd>
          <dd className="ml-[15%]">25.2.8:動画の使用許可取得済、全ページ公開</dd>
          <dd className="ml-[15%]">25.3.14:新曲「宴日和」追加</dd>
          <dd className="ml-[15%]">25.5.5:新体制更新</dd>
          <dd className="ml-[15%]">26.2.3:りさちソロモード追加</dd>
          <dd className="ml-[15%]">26.3.16:新曲「恋をした堕天使」追加</dd>
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
