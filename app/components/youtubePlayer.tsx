import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type YouTubePlayerProps = {
  videoId: string;
  onTimeUpdate: (time: number) => void;
};

export default function YouTubePlayer({
  videoId,
  onTimeUpdate,
}: YouTubePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current && window.YT) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: "100%",
          width: "100%",
          videoId,
          playerVars: { autoplay: 0, controls: 1 },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target); // プレイヤーを保存
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // 🔹 videoId が変更されたら新しい動画をロード
  // useEffect(() => {
  //   if (player) {
  //     player.cueVideoById(videoId);
  //   }
  // }, [videoId]);
  useEffect(() => {
    if (player) {
      player.destroy(); // 🎯 既存のプレイヤーを削除
      setTimeout(() => {
        if (playerRef.current && window.YT) {
          console.log("🎥 Recreating Player for new video...");
          const newPlayer = new window.YT.Player(playerRef.current, {
            height: "100%",
            width: "100%",
            videoId,
            playerVars: { autoplay: 0, controls: 1 },
            events: {
              onReady: (event: any) => {
                console.log("✅ New Player Ready!");
                setPlayer(event.target);
              },
            },
          });
        }
      }, 500); // 🎯 少し遅延を入れて新しいプレイヤーを作成
    }
  }, [videoId]);

  useEffect(() => {
    const updateTime = () => {
      if (player) {
        const newTime = Math.floor(player.getCurrentTime());
        console.log("⏳ Updated Current Time from YouTubePlayer:", newTime);
        onTimeUpdate(newTime); // 🎯 `currentTime` を `SongsContent.tsx` に送る
      }
    };

    if (player) {
      console.log("🔄 Starting time update interval...");
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [player]);

  return (
    <div className="mt-[2dvh] relative w-full pb-[56.25%]">
      <div
        id="youtube-player"
        ref={playerRef}
        className="absolute top-0 left-0 w-full h-full"
      ></div>
    </div>
  );
}

// import { useEffect, useRef } from "react";

// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// type YouTubePlayerProps = { videoId: string };

// export default function YouTubePlayer({ videoId }: YouTubePlayerProps) {
//   const playerRef = useRef<HTMLDivElement>(null);
//   const playerInstance = useRef<any>(null); // 🎯 プレイヤーのインスタンスを保持

//   useEffect(() => {
//     const createPlayer = () => {
//       if (playerRef.current && window.YT) {
//         playerInstance.current = new window.YT.Player(playerRef.current, {
//           height: "100%",
//           width: "100%",
//           videoId,
//           playerVars: { autoplay: 0, controls: 1 },
//           events: {
//             onReady: (event: any) => {
//               console.log("✅ YouTube Player is ready!");
//               playerInstance.current = event.target; // 🎯 `playerInstance` にセット
//             },
//           },
//         });
//       }
//     };

//     if (window.YT && window.YT.Player) {
//       createPlayer();
//     } else {
//       window.onYouTubeIframeAPIReady = createPlayer;
//       const script = document.createElement("script");
//       script.src = "https://www.youtube.com/iframe_api";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   // 🎯 `videoId` が変更されたら動画をロード
//   useEffect(() => {
//     if (playerInstance.current) {
//       console.log("🔄 Changing Video:", videoId);
//       playerInstance.current.loadVideoById(videoId); // 🎯 ここを `cueVideoById` から `loadVideoById` に変更
//     }
//   }, [videoId]);

//   return (
//     <div className="mt-[5dvh] relative w-full pb-[56.25%]">
//       <div ref={playerRef} className="absolute top-0 left-0 w-full h-full"></div>
//     </div>
//   );
// }
