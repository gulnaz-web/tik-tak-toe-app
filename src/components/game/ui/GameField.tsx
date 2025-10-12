import { useState } from "react";
import { GameSymbol } from "./GameSymbol";

type GameCellType = {
  children: React.ReactNode;
};

function GameCell({ children }: GameCellType) {
  return (
    <button className="border border-slate-200 -ml-px -mt-px flex items-center justify-center">
      {children}
    </button>
  );
}

export const GameField = () => {
  const [{ cells }, setGameState] = useState(() => ({
    cells: new Array(19 * 19).fill(null),
  }));
  return (
    <div className="grid grid-cols-[repeat(19,_35px)] grid-rows-[repeat(19,_35px)] pl-px pt-px mt-3">
      {cells.map((symbol, index) => (
        <GameCell key={index}>
          {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
        </GameCell>
      ))}
    </div>
  );
};
