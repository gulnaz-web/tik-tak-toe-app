import { Button } from "@/ui-components";

type GameActionsProps = {
  isWinner: boolean;
  playAgain: () => void;
};

export function GameActions({ isWinner, playAgain }: GameActionsProps) {
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
}
