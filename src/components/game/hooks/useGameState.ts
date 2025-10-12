import { useState } from "react";
import { GAME_SYMBOLS, MOVE_ORDER } from "@/components/game/constants";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";

type GameStateType = {
  cells: Array<null | PlayerDataSymbolType>;
  currentMove: PlayerDataSymbolType;
};

function getNextMove(
  currentMove: PlayerDataSymbolType,
  playersCount: number,
): PlayerDataSymbolType {
  const slicedMoveOrder = MOVE_ORDER.slice(0, playersCount);

  const nextMoveIndex = slicedMoveOrder.indexOf(currentMove) + 1;
  return slicedMoveOrder[nextMoveIndex] ?? slicedMoveOrder[0];
}

export const useGameState = (playersCount: number) => {
  const [{ cells, currentMove }, setGameState] = useState<GameStateType>(
    () => ({
      cells: new Array(19 * 19).fill(null),
      currentMove: GAME_SYMBOLS.CROSS,
    }),
  );

  const nextMove = getNextMove(currentMove, playersCount);

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
  return { cells, currentMove, nextMove, cellClick };
};
