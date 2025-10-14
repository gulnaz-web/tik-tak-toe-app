import { PlayerDataSymbolType } from "@/mock/players/mock-players";
import { GameStateType } from "./reducerGameState";

type ComputeWinnerSymbolType = {
  gameState: GameStateType;
  winnerSequence: number[] | undefined;
  nextMove: PlayerDataSymbolType;
};

export function computeWinnerSymbol({
  gameState,
  winnerSequence,
  nextMove,
}: ComputeWinnerSymbolType) {
  if (!winnerSequence) return null;

  return nextMove === gameState.currentMove
    ? gameState.currentMove
    : gameState.cells[winnerSequence?.[0]];
}
