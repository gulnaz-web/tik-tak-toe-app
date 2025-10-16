import React from "react";
import { GameStateType } from "@/components/game/model/reducerGameState";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";

type GameLayoutProps = {
  gameState: GameStateType;
  title: React.ReactNode;
  gameInfo: React.ReactNode;
  playersList: React.ReactNode;
  gameMoveInfo: React.ReactNode;
  actions: React.ReactNode;
  renderCell: (
    symbol: PlayerDataSymbolType | null,
    index: number,
  ) => React.ReactNode;
};

export function GameLayout({
  gameState,
  title,
  gameInfo,
  playersList,
  gameMoveInfo,
  actions,
  renderCell,
}: GameLayoutProps) {
  return (
    <div className="pb-10">
      <div className="pl-2">
        {title}
        {gameInfo}
      </div>

      <div className="mt-4 bg-white rounded-2xl shadow-md px-8 py-4 justify-between grid grid-cols-2 gap-3">
        {playersList}
      </div>

      <div className="bg-white rounded-2xl shadow-md px-8 pt-5 pb-7 mt-6">
        <div className="flex gap-3 items-center">
          <div className="mr-auto">
            <div className="flex gap-3 items-center">{gameMoveInfo}</div>
          </div>
          {actions}
        </div>

        <div
          className="grid pl-px pt-px mt-3 w-full max-w-[700px] mx-auto aspect-square"
          style={{
            gridTemplateColumns: `repeat(${gameState?.fieldSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gameState?.fieldSize}, minmax(0, 1fr))`,
          }}
        >
          {gameState?.cells?.map((symbol, index) => (
            <React.Fragment key={index}>
              {renderCell(symbol, index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
