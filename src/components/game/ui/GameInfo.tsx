import clsx from "clsx";
import { players } from "@/mock/players/mock-players";
import { PlayerInfo } from "./PlayerInfo";

type GameInfoType = {
  className?: string;
  playersCount: number;
  currentMove: string;
  isWinner: boolean;
};

export const GameInfo = ({
  className,
  playersCount,
  currentMove,
  isWinner,
}: GameInfoType) => {
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
          player={player}
          isRight={index % 2 === 1}
          isTimerRunning={currentMove === player.symbol && !isWinner}
        />
      ))}
    </div>
  );
};
