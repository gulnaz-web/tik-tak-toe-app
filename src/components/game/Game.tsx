"use client";

import { useState } from "react";
import { GameTitle, GameInfo, GameField, GameLayout } from "./ui";
import { GAME_SYMBOLS } from "@/mock/players/constants";
import { GameMoveInfo } from "./ui/GameMoveInfo";
import { Button } from "@/ui-components";

export const Game = () => {
  const [playersCount, setPlayersCount] = useState(2);
  const [currentMove, setCurrentMove] = useState(GAME_SYMBOLS.CROSS);
  const [isWinner, setIsWinner] = useState(false);

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

  return (
    <>
      <GameLayout
        title={
          <GameTitle playersCount={playersCount} timeMode="1 мин на ход" />
        }
        gameInfo={
          <GameInfo
            playersCount={playersCount}
            currentMove={currentMove}
            isWinner={isWinner}
          />
        }
        gameMoveInfo={
          <GameMoveInfo
            currentMove={currentMove}
            nextMove={GAME_SYMBOLS.ZERO}
          />
        }
        actions={actions}
      >
        <GameField />
      </GameLayout>
    </>
  );
};
