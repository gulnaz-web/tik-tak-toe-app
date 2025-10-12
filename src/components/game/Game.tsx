"use client";

import { useState } from "react";
import { GameTitle, GameInfo, GameField, GameMoveInfo, GameLayout } from "./ui";
import { Button } from "@/ui-components";
import { useGameState } from "./hooks/useGameState";

const actions = (
  <>
    <Button className="cursor-pointer" size="md" variant="primary">
      Ничья
    </Button>
    <Button className="cursor-pointer" size="md" variant="outline">
      Сдаться
    </Button>
  </>
);

const PLAYERS_COUNT = 2;

export const Game = () => {
  const [playersCount, setPlayersCount] = useState<number>(PLAYERS_COUNT);

  const { cells, currentMove, nextMove, cellClick } =
    useGameState(playersCount);

  const [isWinner, setIsWinner] = useState(false);

  return (
    <>
      <GameLayout
        title={
          <GameTitle playersCount={playersCount} timeMode="1 мин на ход" />
        }
        gameInfo={<GameInfo playersCount={playersCount} isWinner={isWinner} />}
        gameMoveInfo={
          <GameMoveInfo currentMove={currentMove} nextMove={nextMove} />
        }
        actions={actions}
      >
        <GameField cells={cells} onCellClick={cellClick} />
      </GameLayout>
    </>
  );
};
