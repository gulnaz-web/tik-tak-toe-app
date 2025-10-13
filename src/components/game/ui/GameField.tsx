import clsx from "clsx";
import { GameSymbol } from "./GameSymbol";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";

type GameCellType = {
  children: React.ReactNode;
  isWinner: boolean | undefined;
  onClick: () => void;
};

function GameCell({ children, isWinner, onClick }: GameCellType) {
  return (
    <button
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        isWinner && "bg-orange-600/10",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type GameFieldType = {
  cells: Array<null | PlayerDataSymbolType>;
  winnerSequence: Array<number> | undefined;
  onCellClick: (index: number) => void;
};

export const GameField = ({
  cells,
  winnerSequence,
  onCellClick,
}: GameFieldType) => {
  return (
    <div className="grid grid-cols-[repeat(19,_35px)] grid-rows-[repeat(19,_35px)] pl-px pt-px mt-3">
      {cells.map((symbol, index) => (
        <GameCell
          key={index}
          onClick={() => onCellClick(index)}
          isWinner={winnerSequence?.includes(index)}
        >
          {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
        </GameCell>
      ))}
    </div>
  );
};
