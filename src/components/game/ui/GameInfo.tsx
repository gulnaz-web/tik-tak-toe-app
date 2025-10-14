import { UserIcon } from "@/icon-components";

type GameInfoType = {
  playersCount: number;
};

export function GameInfo({ playersCount }: GameInfoType) {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-400">
      <div className="flex items-center gap-1">
        <UserIcon /> {playersCount} игрока
      </div>
    </div>
  );
}
