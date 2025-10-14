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
};

export const GAME_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TICK: "tick",
  RESET: "reset",
} as const;

export const initGameState = (): GameStateType => {
  const fieldSize = 19;

  return {
    cells: new Array(fieldSize * fieldSize).fill(null),
    currentMove: GAME_SYMBOLS.CROSS,
    playersCount: 2,
    fieldSize,
    sequenceSize: fieldSize > 5 ? 5 : 3,
  };
};

export const reducerGameState = (
  state: GameStateType,
  actions: ReducerActionType,
) => {
  switch (actions.type) {
    case GAME_STATE_ACTIONS.CELL_CLICK: {
      if (actions.index && state.cells[actions.index]) {
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
      return initGameState();
    }
    default: {
      return state;
    }
  }
};
