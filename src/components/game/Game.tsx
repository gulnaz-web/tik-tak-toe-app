"use client";

import { useReducer } from "react";
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

// КОМПОЗИЦИЯ (соединение нескольких компонентов)
export const Game = () => {
  const [gameState, dispatch] = useReducer(reducerGameState, initGameState());

  const nextMove = getNextMove(gameState.currentMove, gameState.playersCount);
  const winnerSequence = computeWinner(gameState);
  const winnerSymbol = computeWinnerSymbol({
    gameState,
    winnerSequence,
    nextMove,
  });

  const handleCellClick = (index: number) => {
    dispatch({
      type: GAME_STATE_ACTIONS.CELL_CLICK,
      index,
    });
  };

  const resetGame = () => {
    dispatch({ type: GAME_STATE_ACTIONS.RESET });
  };

  return (
    <>
      <GameLayout
        title={<GameTitle />} // ВЕРСТКА
        gameInfo={<GameInfo playersCount={gameState.playersCount} />} // ВЕРТСКА и ЛОГИКА ОТОБРАЖЕНИЯ
        playersList={PLAYERS.slice(0, gameState.playersCount).map(
          (player, index) => (
            <PlayerInfo
              key={player.id}
              playerInfo={player}
              isRight={index % 2 === 1}
            />
          ),
        )}
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
          <GameActions isWinner={!!winnerSymbol} playAgain={resetGame} /> // ВЕРТСКА и ЛОГИКА ОТОБРАЖЕНИЯ
        }
        fieldSize={gameState.fieldSize}
      >
        {gameState.cells.map((symbol, index) => (
          <GameCell
            key={index}
            onCellClick={() => handleCellClick(index)}
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
