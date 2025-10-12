import { HistoryIcon, StarIcon, UserIcon } from "@/icon-components";

type GameTitleType = {
  playersCount: number;
};

export const GameTitle = ({ playersCount }: GameTitleType) => {
  return (
    <div className="pl-2">
      <h1 className="text-4xl leading-tight">Крестики нолики</h1>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <StarIcon />
        <div className="flex items-center gap-1">
          <UserIcon /> {playersCount}
        </div>
        <div className="flex items-center gap-1">
          <HistoryIcon /> 1 мин на ход
        </div>
      </div>
    </div>
  );
};
