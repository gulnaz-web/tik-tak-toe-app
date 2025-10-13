import clsx from "clsx";
import { GameSymbol } from "./GameSymbol";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";

type GameCellType = {
  children: React.ReactNode;
  isWinner: boolean | undefined;
  disabled: boolean;
  onClick: () => void;
};

function GameCell({ children, isWinner, disabled, onClick }: GameCellType) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        disabled ? "bg-gray-50" : "cursor-pointer",
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
  winnerSymbol: null | PlayerDataSymbolType;
  cellSize?: number;
  onCellClick: (index: number) => void;
};

export const GameField = ({
  cells,
  winnerSequence,
  winnerSymbol,
  cellSize = 19,
  onCellClick,
}: GameFieldType) => {
  return (
    <div
      className="grid pl-px pt-px mt-3 w-full max-w-[700px] mx-auto aspect-square"
      style={{
        gridTemplateColumns: `repeat(${cellSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${cellSize}, minmax(0, 1fr))`,
      }}
    >
      {cells.map((symbol, index) => (
        <GameCell
          key={index}
          onClick={() => onCellClick(index)}
          isWinner={winnerSequence?.includes(index)}
          disabled={!!winnerSymbol}
        >
          {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
        </GameCell>
      ))}
    </div>
  );
};
