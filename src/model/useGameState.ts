import { useEffect, useReducer } from "react";
import {
  type GameStateType,
  initGameState,
  reducerGameState,
} from "@/components/game/model/reducerGameState";
import { GAME_STATE_STORAGE_KEY } from "./constants";

type UseGameStateProps = {
  playersCount: number | undefined;
  fieldSize: number | undefined;
};

const getInitialState = (
  playersCount: number | undefined,
  fieldSize: number | undefined,
): GameStateType => {
  if (typeof window === "undefined") {
    return initGameState(playersCount, fieldSize);
  }

  const stored = localStorage.getItem(GAME_STATE_STORAGE_KEY);
  if (stored) {
    const parsedState = JSON.parse(stored) as GameStateType;
    if (
      parsedState.playersCount === playersCount &&
      parsedState.fieldSize === fieldSize
    ) {
      return parsedState;
    }
  }

  return initGameState(playersCount, fieldSize);
};
export function useGameState({ playersCount, fieldSize }: UseGameStateProps) {
  const [gameState, dispatch] = useReducer(reducerGameState, undefined, () =>
    getInitialState(playersCount, fieldSize),
  );

  useEffect(() => {
    if (typeof window !== "undefined" && playersCount && fieldSize) {
      localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState, playersCount, fieldSize]);

  const resetGame = () => {
    dispatch({ type: "reset" as const });

    if (typeof window !== "undefined") {
      localStorage.removeItem(GAME_STATE_STORAGE_KEY);
    }
  };

  return { gameState, dispatch, resetGame };
}
