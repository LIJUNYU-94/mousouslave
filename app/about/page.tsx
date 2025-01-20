import Link from "next/link";
export default function about() {
  return (
    <>
      <div className="h-[100dvh]">
        <h1 className="h-[10dvh] text-center pt-[5dvh] item-center text-3xl font-bold">
          about
        </h1>
        <div className="h-[25dvh] pt-[5dvh] flex flex-col text-left">
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
        <div className="h-[50dvh]  flex flex-col text-left">
          <dt className="text-2xl ml-[10%] text-bold pb-[1vh]">更新履歴：</dt>
          <dd className="ml-[15%]">1.20:制作開始</dd>
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
