import Link from "next/link";
function part(x: number) {
  const data = [
    {
      name: "曲",
      pic: "era-3.png",
      alt: "lipi",
    },
    {
      name: "コール",
      pic: "era-3.png",
      alt: "risa",
    },
    {
      name: "各公式リンク",
      pic: "era-3.png",
      alt: "kuiru",
    },
    {
      name: "各非公式リンク",
      pic: "era-3.png",
      alt: "kuiru",
    },
    {
      name: "スケジュール",
    },
    {
      name: "about",
    },
  ];
  return (
    <>
      <div className="relative flex justify-center">
        {data[x].pic && (
          <img
            src={data[x].pic}
            alt={data[x].alt || "画像"}
            className="h-[180px] w-[180px]"
          />
        )}
        <p className=" text-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-700 text-white whitespace-nowrap p-2 rounded-md">
          {data[x].name}
        </p>
      </div>
    </>
  );
}
export default function Home() {
  return (
    <>
      <main className="h-[100dvh]  items-center">
        <h1 className="text-4xl font-bold pt-[50px] pb-[50px] text-center">
          応援サイト
        </h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-y-[20px]">
          <Link href={`/songs/`}>{part(0)}</Link>
          <Link href={`/call/`}>{part(1)}</Link>
          <Link href={`/officials/`}>{part(2)}</Link>
          <Link href={`/unofficials/`}>{part(3)}</Link>
        </div>
        <Link
          href="http://timetr.ee/p/mousouslave"
          className="text-center flex justify-center h-[100px] w-[80%] mx-auto pt-[100px]"
        >
          {part(4)}
        </Link>
        <Link
          href={`/about/`}
          className="text-center flex justify-center h-[100px] w-[80%] mx-auto pt-[70px]"
        >
          {part(5)}
        </Link>
      </main>
    </>
  );
}
