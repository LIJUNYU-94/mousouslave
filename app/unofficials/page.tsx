"use client";
import Link from "next/link";
import { BsYoutube } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SmallScreen } from "../components/smallscreen";
export default function unofficials() {
  const smallscreen = SmallScreen();
  return (
    <>
      <div className="h-[100dvh] max-w-[500px] bg-slate-300/80">
        <h1 className="text-4xl font-bold text-center py-[10dvh] text-white bg-[url('/header.png')] bg-cover bg-center ">
          妄想slave
          <br />
          各非公式リンク
        </h1>
        <div
          className={`${
            smallscreen ? "h-[55dvh]" : "h-[60dvh] text-xl"
          } pt-[3dvh] flex flex-col justify-around text-left font-bold tracking-wide`}
        >
          <Link
            href="https://x.com/risa_ConCafe
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter />
            りさちのコンカフェ屋さん
          </Link>
          <Link
            href="https://x.com/nyagonyancoo
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter />
            りぴコンカフェ
          </Link>
          <Link
            href="https://x.com/SlaveDelusion
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 妄想slave応援X
          </Link>
          <Link
            href="https://www.youtube.com/@coco-nut-y
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <BsYoutube />
            youtube:おやじぃで
          </Link>
          <Link
            href="https://www.youtube.com/@%E3%81%BF%E3%81%8F%E3%81%A1%E3%82%83%E3%82%93-i8y
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <BsYoutube />
            youtube:みくちゃん
          </Link>
          <Link
            href="https://www.youtube.com/@_a_v_0_z_-md7zy
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <BsYoutube />
            youtube:NOVA
          </Link>
          <p className="text-2xl text-center py-[1dvh]">関連Xタグ</p>
          <Link
            href="https://x.com/search?q=%23%E3%82%8A%E3%81%95%E3%81%A1%E3%82%92%E3%82%8A%E3%81%95%E3%83%BC%E3%81%A1&src=hashtag_click
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> りさちをりさーち
          </Link>
          <Link
            href="https://x.com/search?q=%23%E6%8C%87%E7%94%B0%E3%81%A8%E3%82%B5%E3%82%B7%E9%A3%B2%E3%81%BF&src=hashtag_click
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 指田とサシ飲み
          </Link>
          <Link
            href="https://x.com/hashtag/%E3%81%AB%E3%82%83%E3%81%94%E3%81%A1%E3%82%85%E3%83%BC%E3%82%8B%E3%81%A0%E3%82%88?src=hashtag_click
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> にゃごちゅーるだよ
          </Link>
          <Link
            href="https://x.com/hashtag/%E6%B3%A5%E9%85%94slave?src=hashtag_click
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 泥酔slave
          </Link>
          <Link
            href="https://x.com/search?q=%23%E5%A6%84%E3%82%B9%E3%83%AC%E8%84%B1%E6%B3%95MIX&src=hashtag_click
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 妄スレ脱法MIX
          </Link>
        </div>
        <div className="relative h-[5dvh] mt-[3dvh]">
          <Link href="/">
            <p className=" text-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-700 text-white whitespace-nowrap px-4 py-2 rounded-md">
              back
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
