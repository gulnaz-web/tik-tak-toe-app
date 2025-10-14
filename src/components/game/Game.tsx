"use client";

import { useCallback, useMemo, useReducer } from "react";
import {
  GameTitle,
  GameInfo,
  GameMoveInfo,
  GameLayout,
  GameActions,
  PlayerInfo,
  GameCell,
  GameSymbol,
} from "./ui";
import {
  getNextMove,
  computeWinner,
  computeWinnerSymbol,
  initGameState,
  reducerGameState,
  GAME_STATE_ACTIONS,
} from "./model";
import { PLAYERS } from "@/mock/players/mock-players";

export const Game = () => {
  const [gameState, dispatch] = useReducer(reducerGameState, initGameState());

  const nextMove = getNextMove(gameState.currentMove, gameState.playersCount);
  const winnerSequence = computeWinner(gameState);
  const winnerSymbol = computeWinnerSymbol({
    gameState,
    winnerSequence,
    nextMove,
  });

  const handleCellClick = useCallback((index: number) => {
    dispatch({
      type: GAME_STATE_ACTIONS.CELL_CLICK,
      index,
    });
  }, []);

  const resetGame = () => {
    dispatch({ type: GAME_STATE_ACTIONS.RESET });
  };

  const playersList = useMemo(() => {
    return PLAYERS.slice(0, gameState.playersCount).map((player, index) => (
      <PlayerInfo
        key={player.id}
        playerInfo={player}
        isRight={index % 2 === 1}
      />
    ));
  }, [gameState.playersCount]);

  return (
    <>
      <GameLayout
        title={<GameTitle />}
        gameInfo={<GameInfo playersCount={gameState.playersCount} />}
        playersList={playersList}
        gameMoveInfo={
          <GameMoveInfo
            winnerPlayer={PLAYERS.find(
              (player) => player.symbol === winnerSymbol,
            )}
            winnerSymbol={winnerSymbol}
            currentMove={gameState.currentMove}
            nextMove={nextMove}
          />
        }
        actions={
          <GameActions isWinner={!!winnerSymbol} playAgain={resetGame} />
        }
        fieldSize={gameState.fieldSize}
      >
        {gameState.cells.map((symbol, index) => (
          <GameCell
            key={index}
            index={index}
            onCellClick={handleCellClick}
            isWinner={winnerSequence?.includes(index)}
            disabled={!!winnerSymbol}
          >
            {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
          </GameCell>
        ))}
      </GameLayout>
    </>
  );
};
