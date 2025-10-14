import {
  CrossIcon,
  SquareIcon,
  TringleIcon,
  ZeroIcon,
} from "@/icon-components";
import { GAME_SYMBOLS } from "@/components/game/constants";
import { PlayerDataSymbolType } from "@/mock/players/mock-players";

type GameSymbolProps = {
  className?: string;
  symbol: PlayerDataSymbolType;
};

export function GameSymbol({ symbol, className }: GameSymbolProps) {
  const Icon =
    {
      [GAME_SYMBOLS.CROSS]: CrossIcon,
      [GAME_SYMBOLS.ZERO]: ZeroIcon,
      [GAME_SYMBOLS.TRINGLE]: TringleIcon,
      [GAME_SYMBOLS.SQUARE]: SquareIcon,
    }[symbol] ?? CrossIcon;

  return <Icon className={className} />;
}
