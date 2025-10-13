import { useState } from "react";
import { GAME_SYMBOLS } from "@/components/game/constants";
import { getNextMove } from "@/components/game/model/getNextMove";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";
import { computeWinner } from "../model/computeWinner";

export type GameStateType = {
  cells: Array<null | PlayerDataSymbolType>;
  currentMove: PlayerDataSymbolType;
};

export const useGameState = (playersCount: number) => {
  const [{ cells, currentMove }, setGameState] = useState<GameStateType>(
    () => ({
      cells: new Array(19 * 19).fill(null),
      currentMove: GAME_SYMBOLS.CROSS,
    }),
  );

  const nextMove = getNextMove(currentMove, playersCount);

  const winnerSequence = computeWinner(cells);

  const cellClick = (index: number) => {
    setGameState((gameState) => {
      if (gameState.cells[index]) return gameState;

      return {
        ...gameState,
        cells: gameState.cells.map((cell, i) =>
          i === index ? gameState.currentMove : cell,
        ),
        currentMove: getNextMove(gameState.currentMove, playersCount),
      };
    });
  };

  return { cells, currentMove, nextMove, winnerSequence, cellClick };
};
