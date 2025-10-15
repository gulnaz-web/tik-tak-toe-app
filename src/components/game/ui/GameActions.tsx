import { Button } from "@/ui-components";

type GameActionsProps = {
  isLoading: boolean;
  isWinner: boolean;
  playAgain: () => void;
};

export function GameActions({
  isLoading,
  isWinner,
  playAgain,
}: GameActionsProps) {
  if (isLoading) return;

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
