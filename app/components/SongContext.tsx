"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// コンテキストの型
const SongContext = createContext<{
  selectedSongName: string | null;
  setSelectedSongName: (name: string) => void;
} | null>(null);

// Provider を作成
export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSongName, setSelectedSongName] = useState<string | null>(null);

  return (
    <SongContext.Provider value={{ selectedSongName, setSelectedSongName }}>
      {children}
    </SongContext.Provider>
  );
};

// フックで簡単に使えるようにする
export const useSong = () => {
  const context = useContext(SongContext);
  if (!context) throw new Error("useSong must be used within a SongProvider");
  return context;
};
