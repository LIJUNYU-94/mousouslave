import { useState, useEffect } from "react";

export function SmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerHeight <= 680); // iPhone SE の高さ
    };

    checkScreenSize(); // 初回チェック
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isSmallScreen;
}
