import { useState, useEffect } from "react";

export function useSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerHeight <= 700); // iPhone SE の高さ
    };

    checkScreenSize(); // 初回チェック
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isSmallScreen;
}
