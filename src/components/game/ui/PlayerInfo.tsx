import clsx from "clsx";
import Image from "next/image";
import { PlayerDataType } from "@/mock/players/mock-players";
import { GameSymbol } from "./GameSymbol";

type PlayerInfoType = {
  isRight: boolean;
  playerInfo: PlayerDataType;
};

export function PlayerInfo({ isRight, playerInfo }: PlayerInfoType) {
  return (
    <div
      className={clsx("flex gap-3 items-center", isRight && "justify-self-end")}
    >
      <div className={clsx("relative", isRight && "order-3")}>
        <div className="flex items-center gap-2 text-start text-sky-600">
          <Image
            src={playerInfo.avatar}
            width={48}
            height={48}
            alt="avatar"
            unoptimized
          />
          <div className="overflow-hidden">
            <div className=" text-lg leading-tight truncate ">
              {playerInfo.name}
            </div>
            <div className="text-slate-400 text-xs leading-tight">
              Рейтинг: {playerInfo.rating}
            </div>
          </div>
        </div>

        <div className="w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={playerInfo.symbol} />
        </div>
      </div>
    </div>
  );
}
