import { StarIcon, UserIcon } from "@/icon-components";

type GameInfoType = {
  playersCount: number;
};

export const GameInfo = ({ playersCount }: GameInfoType) => {
  return (
    <>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <StarIcon />
        <div className="flex items-center gap-1">
          <UserIcon /> {playersCount}
        </div>
      </div>
    </>
  );
};
