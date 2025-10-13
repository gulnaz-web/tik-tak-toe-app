import clsx from "clsx";
import { players } from "@/mock/players/mock-players";
import { PlayerInfo } from "./PlayerInfo";

type GameInfoType = {
  className?: string;
  playersCount: number;
};

export const GameInfo = ({ className, playersCount }: GameInfoType) => {
  return (
    <div
      className={clsx(
        className,
        "bg-white rounded-2xl shadow-md px-8 py-4 justify-between grid grid-cols-2 gap-3",
      )}
    >
      {players.slice(0, playersCount).map((player, index) => (
        <PlayerInfo
          key={player.id}
          playerInfo={player}
          isRight={index % 2 === 1}
        />
      ))}
    </div>
  );
};
