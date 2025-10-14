import clsx from "clsx";

type GameCellType = {
  children: React.ReactNode;
  isWinner: boolean | undefined;
  disabled: boolean;
  onCellClick: () => void;
};

export function GameCell({
  children,
  isWinner,
  disabled,
  onCellClick,
}: GameCellType) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        disabled ? "bg-gray-50" : "cursor-pointer",
        isWinner && "bg-orange-600/10",
      )}
      onClick={onCellClick}
    >
      {children}
    </button>
  );
}
