import { GameInfo } from "./GameInfo";
import { GameLayout } from "./GameLayout";
import { GameTitle } from "./GameTitle";

export const Game = () => {
  return (
    <>
      <GameLayout
        title={<GameTitle playersCount={2} />}
        gameInfo={<GameInfo />}
      />
    </>
  );
};
