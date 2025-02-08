"use client";
import Link from "next/link";
import { BsYoutube } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { HiShoppingCart } from "react-icons/hi";
import { SmallScreen } from "../components/smallscreen";
export default function officials() {
  const smallscreen = SmallScreen();
  return (
    <>
      <div className="h-[100dvh] max-w-[500px] bg-slate-300/80">
        <h1 className="text-4xl font-bold text-center py-[10dvh] text-white bg-[url('/header.png')] bg-cover bg-center">
          妄想slave
          <br />
          各公式リンク
        </h1>
        <div
          className={`${
            smallscreen ? "h-[55dvh]" : "h-[60dvh] text-xl"
          } pt-[3dvh] flex flex-col justify-around text-left font-bold tracking-wide`}
        >
          <Link
            href="https://www.youtube.com/@slave9370"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center "
          >
            <BsYoutube />
            公式youtube
          </Link>
          <Link
            href="https://x.com/mousou_slave
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter />
            妄想slave公式x
          </Link>
          <Link
            href="https://x.com/risa_0305_
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 指田りさ 公式X
          </Link>
          <Link
            href="https://www.instagram.com/risa__0305_/
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaInstagramSquare />
            指田りさ ins
          </Link>
          <Link
            href="https://www.tiktok.com/@risa_2003_0305
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <AiFillTikTok />
            指田りさ tiktok
          </Link>
          <Link
            href="https://x.com/ripitanebi
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 神凪りぴ 公式X
          </Link>
          <Link
            href="https://www.instagram.com/ripitantanmen/
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaInstagramSquare /> 神凪りぴ ins
          </Link>
          <Link
            href="https://www.tiktok.com/@ripiripitan
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <AiFillTikTok />
            神凪りぴ tiktok
          </Link>
          <Link
            href="https://x.com/chekisutayasan
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter />
            先輩(スタッフ)
          </Link>
          <Link
            href="https://risatishop.base.shop/
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <HiShoppingCart />
            公式baseshop
          </Link>
          <Link
            href="https://x.com/SASHIDAKE
"
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            {" "}
            <FaSquareXTwitter />
            指田家
          </Link>
        </div>
        <div className="relative h-[5dvh] mt-[2dvh]">
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
