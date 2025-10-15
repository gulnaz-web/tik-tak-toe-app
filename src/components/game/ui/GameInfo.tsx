import { UserIcon } from "@/icon-components";

type GameInfoProps = {
  isLoading: boolean;
  playersCount: number;
};

export function GameInfo({ isLoading, playersCount }: GameInfoProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <UserIcon /> Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-xs text-slate-400">
      <div className="flex items-center gap-1">
        <UserIcon /> {playersCount} игрока
      </div>
    </div>
  );
}
