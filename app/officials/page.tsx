import Link from "next/link";
export default function officials() {
  return (
    <>
      <div className="h-[100dvh]">
        <h1 className="h-[10dvh] text-center pt-[5dvh] item-center text-3xl font-bold">
          妄想slave各公式リンク
        </h1>
        <div className="h-[75dvh] pt-[5dvh] flex flex-col justify-around text-left">
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            妄想slave公式youtube
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            妄想slave公式x
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            指田りさ公式X
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            神凪りぴ公式X
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            先輩（妄想slaveスタッフ）
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            指田りさ instagram
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            神凪りぴ instagram
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            指田りさ tiktok
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            神凪りぴ tiktok
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            妄想slave公式baseshop
          </Link>
          <Link href="" className="w-[50%] mx-auto whitespace-nowrap">
            不定期居酒屋：指田家
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
