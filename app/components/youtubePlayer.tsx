import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: typeof YT;
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
  const [player, setPlayer] = useState<YT.Player | null>(null);

  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current && window.YT) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: "100%",
          width: "100%",
          videoId,
          playerVars: { autoplay: 0, controls: 1 },
          events: {
            onReady: (event: YT.PlayerEvent) => {
              setPlayer(event.target); // プレイヤーを保存
            },
          },
        });
        setPlayer(newPlayer);
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
              onReady: (event: YT.PlayerEvent) => {
                console.log("✅ New Player Ready!");
                setPlayer(event.target);
              },
            },
          });
          setPlayer(newPlayer);
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
