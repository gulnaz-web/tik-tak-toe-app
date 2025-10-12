import {
  CrossIcon,
  SquareIcon,
  TringleIcon,
  ZeroIcon,
} from "@/icon-components";
import { GAME_SYMBOLS } from "@/mock/players/constants";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";

type GameSymbolType = {
  className?: string;
  symbol: PlayerDataSymbolType;
};

export const GameSymbol = ({ symbol, className }: GameSymbolType) => {
  const Icon =
    {
      [GAME_SYMBOLS.CROSS]: CrossIcon,
      [GAME_SYMBOLS.ZERO]: ZeroIcon,
      [GAME_SYMBOLS.TRINGLE]: TringleIcon,
      [GAME_SYMBOLS.SQUARE]: SquareIcon,
    }[symbol] ?? CrossIcon;

  return <Icon className={className} />;
};
