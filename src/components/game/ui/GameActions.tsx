import { Button } from "@/ui-components";

type GameActionsProps = {
  isLoading: boolean;
  isGameStarted: boolean;
  isWinner: boolean;
  resetGame: () => void;
};

export function GameActions({
  isLoading,
  isGameStarted,
  isWinner,
  resetGame,
}: GameActionsProps) {
  if (isLoading || !isGameStarted) return;

  if (!isWinner) {
    return (
      <Button
        onClick={resetGame}
        className="cursor-pointer"
        size="md"
        variant="outline"
      >
        Сбросить игру
      </Button>
    );
  }

  return (
    <Button
      onClick={resetGame}
      className="cursor-pointer"
      size="md"
      variant="outline"
    >
      Играть заново
    </Button>
  );
}
