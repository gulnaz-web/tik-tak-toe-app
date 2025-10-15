import { useEffect, useState } from "react";

type GameSettings = {
  playersCount: number;
  fieldSize: number;
};

const STORAGE_KEY = "tic-tac-toe-settings";

const initialGameSettings: GameSettings = {
  playersCount: 2,
  fieldSize: 19,
};

export const useGameSettings = () => {
  const [key, setKey] = useState<number>(1);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setGameSettings(JSON.parse(stored));
      } else {
        setGameSettings(initialGameSettings);
      }

      setKey((key) => key + 1);
    } catch {}
  }, []);

  const handleSettingsSave = (settings: GameSettings) => {
    setGameSettings(settings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    setKey((key) => key + 1);
  };

  return { key, gameSettings, handleSettingsSave };
};
