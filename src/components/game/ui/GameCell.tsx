import clsx from "clsx";
import { memo } from "react";

type GameCellProps = {
  children: React.ReactNode;
  index: number;
  isWinner: boolean;
  disabled: boolean;
  onCellClick: (index: number) => void;
};

export const GameCell = memo(function GameCell({
  children,
  index,
  isWinner,
  disabled,
  onCellClick,
}: GameCellProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        disabled ? "bg-gray-50" : "cursor-pointer",
        isWinner && "bg-orange-600/10",
      )}
      onClick={() => onCellClick(index)}
    >
      {children}
    </button>
  );
});
