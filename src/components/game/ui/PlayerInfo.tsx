import clsx from "clsx";
import { useState } from "react";
import { Profile } from "@/components/profile/Profile";
import { PlayerDataType } from "@/mock/players/mock-players";
import { GameSymbol } from "./GameSymbol";

type PlayerInfoType = {
  isTimerRunning: boolean;
  isRight: boolean;
  player: PlayerDataType;
};

export const PlayerInfo = ({
  isRight,
  isTimerRunning,
  player,
}: PlayerInfoType) => {
  const [seconds, setSeconds] = useState(6);

  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const isDanger = seconds < 10;

  const getTimerColor = () => {
    if (isTimerRunning) {
      return isDanger ? "text-orange-600" : "text-slate-900";
    }
    return "text-slate-200";
  };

  return (
    <div className={clsx("flex gap-3 items-center", isRight && "justify-self-end")}>
      <div className={clsx("relative", isRight && "order-3")}>
        <Profile
          name={player.name}
          rating={player.rating}
          avatar={player.avatar}
        />

        <div className="w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={player.symbol} />
        </div>
      </div>
      <div className={clsx("h-6 w-px bg-slate-200", isRight && "order-2")} />
      <div
        className={clsx(
          " text-lg font-semibold w-[60px]",
          isRight && "order-1",
          getTimerColor(),
        )}
      >
        {minutesString}:{secondsString}
      </div>
    </div>
  );
};
