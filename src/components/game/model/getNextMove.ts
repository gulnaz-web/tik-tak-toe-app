import { PlayerDataSymbolType } from "@/mock/players/mock-players";
import { MOVE_ORDER } from "@/components/game/constants";

export function getNextMove(
  currentMove: PlayerDataSymbolType,
  playersCount: number,
): PlayerDataSymbolType {
  const slicedMoveOrder = MOVE_ORDER.slice(0, playersCount);

  const nextMoveIndex = slicedMoveOrder.indexOf(currentMove) + 1;
  return slicedMoveOrder[nextMoveIndex] ?? slicedMoveOrder[0];
}
