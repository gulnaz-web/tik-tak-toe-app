import { PlayerDataSymbolType } from "@/mock/players/mock-players";
import { GAME_SYMBOLS } from "@/components/game/constants";
import { getNextMove } from "./getNextMove";

export type GameStateType = {
  cells: Array<null | PlayerDataSymbolType>;
  currentMove: PlayerDataSymbolType;
  playersCount: number;
  fieldSize: number;
  sequenceSize: number;
};

type ReducerActionType = {
  type: (typeof GAME_STATE_ACTIONS)[keyof typeof GAME_STATE_ACTIONS];
  index?: number;
  playersCount?: number;
};

export const GAME_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TICK: "tick",
  RESET: "reset",
} as const;

export function initGameState(
  playersCount: number | undefined = 2,
  fieldSize: number | undefined = 19,
): GameStateType {
  return {
    cells: new Array(fieldSize * fieldSize).fill(null),
    currentMove: GAME_SYMBOLS.CROSS,
    playersCount,
    fieldSize,
    sequenceSize: fieldSize > 5 ? 5 : 3,
  };
}

export function reducerGameState(
  state: GameStateType,
  actions: ReducerActionType,
) {
  switch (actions.type) {
    case GAME_STATE_ACTIONS.CELL_CLICK: {
      if (actions.index !== undefined && state.cells[actions.index]) {
        return state;
      }

      return {
        ...state,
        currentMove: getNextMove(state.currentMove, state.playersCount),
        cells: state.cells.map((cell, i) =>
          i === actions.index ? state.currentMove : cell,
        ),
      };
    }
    case GAME_STATE_ACTIONS.RESET: {
      return initGameState(state.playersCount, state.fieldSize);
    }
    default: {
      return state;
    }
  }
}
