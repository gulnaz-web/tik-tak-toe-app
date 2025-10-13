"use client";

import {
  GameTitle,
  GameInfo,
  GameField,
  GameMoveInfo,
  GameLayout,
  GameActions,
  PlayerInfo,
} from "./ui";
import { useGameState } from "./hooks/useGameState";
import { PLAYERS } from "@/mock/players/mock-players";

const PLAYERS_COUNT = 2;
const CELL_SIZE = 19;

export const Game = () => {
  const {
    cells,
    currentMove,
    nextMove,
    winnerSequence,
    winnerSymbol,
    cellClick,
    resetGame,
  } = useGameState(PLAYERS_COUNT, CELL_SIZE);

  return (
    <>
      <GameLayout
        title={<GameTitle />}
        gameInfo={<GameInfo playersCount={PLAYERS_COUNT} />}
        playersList={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
          <PlayerInfo
            key={player.id}
            playerInfo={player}
            isRight={index % 2 === 1}
          />
        ))}
        gameMoveInfo={
          <GameMoveInfo
            winnerPlayer={PLAYERS.find(
              (player) => player.symbol === winnerSymbol,
            )}
            winnerSymbol={winnerSymbol}
            currentMove={currentMove}
            nextMove={nextMove}
          />
        }
        actions={
          <GameActions isWinner={!!winnerSymbol} playAgain={resetGame} />
        }
      >
        <GameField
          cells={cells}
          onCellClick={cellClick}
          winnerSequence={winnerSequence}
          winnerSymbol={winnerSymbol}
          cellSize={CELL_SIZE}
        />
      </GameLayout>
    </>
  );
};
