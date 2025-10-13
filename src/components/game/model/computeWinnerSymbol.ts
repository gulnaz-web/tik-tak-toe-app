import { PlayerDataSymbolType } from "@/mock/players/mock-players";
import { GameStateType } from "@/components/game/hooks/useGameState";

type ComputeWinnerSymbolType = {
  cells: GameStateType["cells"];
  currentMove: GameStateType["currentMove"];
  winnerSequence: number[] | undefined;
  nextMove: PlayerDataSymbolType;
};

export function computeWinnerSymbol({
  cells,
  currentMove,
  winnerSequence,
  nextMove,
}: ComputeWinnerSymbolType) {
  if (!winnerSequence) return null;

  return nextMove === currentMove ? currentMove : cells[winnerSequence?.[0]];
}
