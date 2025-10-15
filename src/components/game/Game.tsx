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

type GameProps = {
  playersCount: number | undefined;
  fieldSize: number | undefined;
};

export function Game({ playersCount, fieldSize }: GameProps) {
  const [gameState, dispatch] = useReducer(
    reducerGameState,
    initGameState(playersCount, fieldSize),
  );
  const isLoading = Boolean(!playersCount || !fieldSize);

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
    if (isLoading) {
      return (
        <div className="text-slate-400 pb-10 text-xs leading-tight">
          Загрузка...
        </div>
      );
    }

    return PLAYERS.slice(0, gameState.playersCount).map((player, index) => (
      <PlayerInfo
        key={player.id}
        playerInfo={player}
        isRight={index % 2 === 1}
      />
    ));
  }, [gameState.playersCount, isLoading]);

  return (
    <>
      <GameLayout
        title={<GameTitle />}
        gameInfo={
          <GameInfo
            isLoading={isLoading}
            playersCount={gameState.playersCount}
          />
        }
        playersList={playersList}
        gameMoveInfo={
          <GameMoveInfo
            isLoading={isLoading}
            winnerPlayer={PLAYERS.find(
              (player) => player.symbol === winnerSymbol,
            )}
            winnerSymbol={winnerSymbol}
            currentMove={gameState.currentMove}
            nextMove={nextMove}
          />
        }
        actions={
          <GameActions
            isLoading={isLoading}
            isWinner={!!winnerSymbol}
            playAgain={resetGame}
          />
        }
        fieldSize={gameState.fieldSize}
      >
        {!isLoading &&
          gameState.cells.map((symbol, index) => (
            <GameCell
              key={index}
              index={index}
              onCellClick={handleCellClick}
              isWinner={Boolean(winnerSequence?.includes(index))}
              disabled={!!winnerSymbol}
            >
              {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
            </GameCell>
          ))}
      </GameLayout>
    </>
  );
}
