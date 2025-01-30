import Link from "next/link";
import { BsYoutube } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
export default function unofficials() {
  return (
    <>
      <div className="h-[100dvh] max-w-[500px] bg-slate-300/80">
        <h1 className="text-4xl font-bold text-center py-[10dvh] text-white bg-[url('/header.png')] bg-cover bg-center ">
          妄想slave
          <br />
          各非公式リンク
        </h1>
        <div className="h-[60dvh] pt-[3dvh] flex flex-col justify-around text-left text-xl font-bold tracking-wide">
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter />
            りさちのコンカフェ屋さん
          </Link>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter />
            りぴコンカフェ
          </Link>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 妄想slave応援X
          </Link>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <BsYoutube />
            youtube:おやじぃで
          </Link>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <BsYoutube />
            youtube:みくちゃん
          </Link>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <BsYoutube />
            youtube:NOVA
          </Link>
          <p className="text-2xl text-center py-[1dvh]">関連Xタグ</p>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> りさちをりさーち
          </Link>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 指田とサシ飲み
          </Link>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> にゃごちゅーるだよ
          </Link>
          <Link
            href=""
            className="w-[50%] mx-auto whitespace-nowrap inline-flex items-center"
          >
            <FaSquareXTwitter /> 泥酔slave
          </Link>
          <Link
            href=""
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
