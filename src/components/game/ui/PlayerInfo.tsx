import clsx from "clsx";
import { Profile } from "@/components/profile/Profile";
import { PlayerDataType } from "@/mock/players/mock-players";
import { GameSymbol } from "./GameSymbol";

type PlayerInfoType = {
  isRight: boolean;
  playerInfo: PlayerDataType;
};

export const PlayerInfo = ({ isRight, playerInfo }: PlayerInfoType) => {
  return (
    <div
      className={clsx("flex gap-3 items-center", isRight && "justify-self-end")}
    >
      <div className={clsx("relative", isRight && "order-3")}>
        <Profile
          name={playerInfo.name}
          rating={playerInfo.rating}
          avatar={playerInfo.avatar}
        />

        <div className="w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={playerInfo.symbol} />
        </div>
      </div>
    </div>
  );
};
