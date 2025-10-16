import { Button } from "@/ui-components";

type GameActionsProps = {
  isLoading: boolean;
  resetGame: () => void;
};

export function GameActions({
  isLoading,
  resetGame,
}: GameActionsProps) {
  if (isLoading) return;


  return (
    <>
      <Button onClick={resetGame} className="cursor-pointer" size="md" variant="outline">
        Играть заново
      </Button>
    </>
  );
}
