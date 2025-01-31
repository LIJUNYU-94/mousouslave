import Link from "next/link";
export default function about() {
  return (
    <>
      <div className="h-[100dvh] max-w-[500px] bg-slate-300/80">
        <h1 className="text-4xl font-bold text-center py-[10dvh] text-white bg-[url('/header.png')] bg-cover bg-center">
          about
        </h1>
        <div className="h-[20dvh] py-[3dvh] flex flex-col text-left">
          <p className="text-2xl text-center">作者：リ グンウ</p>
          <Link
            href=""
            className="text-2xl w-[100%] mx-auto whitespace-nowrap text-center"
          >
            x:chiennoir94
          </Link>
          <Link
            href=""
            className="text-2xl w-[100%] mx-auto whitespace-nowrap text-center"
          >
            ins:chiennoir94
          </Link>
        </div>
        <div className="h-[46dvh]  flex flex-col text-left">
          <dt className="text-2xl ml-[10%] text-bold pb-[1vh]">更新履歴：</dt>
          <dd className="ml-[15%]">1.20:制作開始</dd>
          <dd className="ml-[15%]">1.21:コールチェック機能</dd>
          <dd className="ml-[15%]">1.30:歌詞をチェック機能</dd>
          <dd className="ml-[15%]">1.30:MVとライブ映像を見る機能</dd>
        </div>
        <div className="relative h-[5dvh]">
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
