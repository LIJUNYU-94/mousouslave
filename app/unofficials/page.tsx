import Link from "next/link";
export default function unofficials() {
  return (
    <>
      <div className="h-[100dvh]">
        <h1 className="h-[10dvh] text-center pt-[5dvh] item-center text-3xl font-bold">
          各非公式リンク
        </h1>
        <div className="h-[75dvh] pt-[5dvh] flex flex-col justify-around text-left">
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            りさちのコンカフェ屋さん
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            りぴコンカフェ
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            妄想slave応援X
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            youtube:おやじぃで
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            youtube:みくちゃん
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            youtube:NOVA
          </Link>
          <p className="text-2xl text-center">関連Xタグ</p>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            りさちをりさーち
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            指田とサシ飲み
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            にゃごちゅーるだよ
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            泥酔slave
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            妄スレ脱法MIX
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
