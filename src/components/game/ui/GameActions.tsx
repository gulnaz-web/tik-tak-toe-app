import { Button } from "@/ui-components";

type GameActionsType = {
  isWinner: boolean;
  playAgain: () => void;
};

export const GameActions = ({ isWinner, playAgain }: GameActionsType) => {
  if (isWinner) {
    return (
      <Button
        onClick={playAgain}
        className="cursor-pointer"
        size="md"
        variant="primary"
      >
        Играть снова
      </Button>
    );
  }
  return (
    <>
      <Button className="cursor-pointer" size="md" variant="outline">
        Сдаться
      </Button>
    </>
  );
};
