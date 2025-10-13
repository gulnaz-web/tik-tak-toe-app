import { useState } from "react";
import { GAME_SYMBOLS } from "@/components/game/constants";
import { getNextMove } from "@/components/game/model/getNextMove";
import { computeWinner } from "@/components/game/model/computeWinner";
import { computeWinnerSymbol } from "@/components/game/model/computeWinnerSymbol";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";

export type GameStateType = {
  cells: Array<null | PlayerDataSymbolType>;
  currentMove: PlayerDataSymbolType;
};

export const useGameState = (playersCount: number, cellSize: number = 19) => {
  const [{ cells, currentMove }, setGameState] = useState<GameStateType>(() => {
    return {
      cells: new Array(cellSize * cellSize).fill(null),
      currentMove: GAME_SYMBOLS.CROSS,
    };
  });

  const nextMove = getNextMove(currentMove, playersCount);

  const winnerSequence = computeWinner(cells);

  const winnerSymbol = computeWinnerSymbol({
    cells,
    currentMove,
    winnerSequence,
    nextMove,
  });

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

  const resetGame = () => {
    setGameState({
      cells: new Array(cellSize * cellSize).fill(null),
      currentMove: GAME_SYMBOLS.CROSS,
    });
  };

  return {
    cells,
    currentMove,
    nextMove,
    winnerSequence,
    winnerSymbol,
    cellClick,
    resetGame,
  };
};
