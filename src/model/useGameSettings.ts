import { useEffect, useState } from "react";
import type { GameStateType } from "@/components/game/model/reducerGameState";
import { GAME_STATE_STORAGE_KEY } from "./constants";

type GameSettings = {
  playersCount: number;
  fieldSize: number;
};

const initialGameSettings: GameSettings = {
  playersCount: 2,
  fieldSize: 3,
};

export const useGameSettings = () => {
  const [key, setKey] = useState<number>(1);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(GAME_STATE_STORAGE_KEY);
      if (stored) {
        const gameState = JSON.parse(stored) as GameStateType;
        setGameSettings({
          playersCount: gameState.playersCount,
          fieldSize: gameState.fieldSize,
        });
      } else {
        setGameSettings(initialGameSettings);
      }

      setKey((key) => key + 1);
    } catch {
      setGameSettings(initialGameSettings);
      setKey((key) => key + 1);
    }
  }, []);

  const handleSettingsSave = (settings: GameSettings) => {
    setGameSettings(settings);

    if (typeof window !== "undefined") {
      localStorage.removeItem(GAME_STATE_STORAGE_KEY);
    }

    setKey((key) => key + 1);
  };

  return { key, gameSettings, handleSettingsSave };
};
