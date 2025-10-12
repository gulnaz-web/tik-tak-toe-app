import { GAME_SYMBOLS } from "@/components/game/constants";
import avatarHacker from "./images/avatarHacker.png";

export const players = [
  {
    id: 1,
    name: "Hacker",
    rating: 1230,
    avatar: avatarHacker,
    symbol: GAME_SYMBOLS.CROSS,
  },
  {
    id: 2,
    name: "Maksim",
    rating: 850,
    avatar: avatarHacker,
    symbol: GAME_SYMBOLS.ZERO,
  },
  {
    id: 3,
    name: "Lara",
    rating: 1400,
    avatar: avatarHacker,
    symbol: GAME_SYMBOLS.TRINGLE,
  },
  {
    id: 4,
    name: "Anne",
    rating: 760,
    avatar: avatarHacker,
    symbol: GAME_SYMBOLS.SQUARE,
  },
] as const;

export type PlayerDataType = (typeof players)[number];
export type PlayerDataSymbolType =
  (typeof GAME_SYMBOLS)[keyof typeof GAME_SYMBOLS];
