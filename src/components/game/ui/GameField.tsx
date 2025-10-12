import { GameSymbol } from "./GameSymbol";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";

type GameCellType = {
  children: React.ReactNode;
  onClick: () => void;
};

function GameCell({ children, onClick }: GameCellType) {
  return (
    <button
      className="border border-slate-200 -ml-px -mt-px flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type GameFieldType = {
  cells: Array<null | PlayerDataSymbolType>;
  onCellClick: (index: number) => void;
};

export const GameField = ({ cells, onCellClick }: GameFieldType) => {
  return (
    <div className="grid grid-cols-[repeat(19,_35px)] grid-rows-[repeat(19,_35px)] pl-px pt-px mt-3">
      {cells.map((symbol, index) => (
        <GameCell key={index} onClick={() => onCellClick(index)}>
          {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
        </GameCell>
      ))}
    </div>
  );
};
