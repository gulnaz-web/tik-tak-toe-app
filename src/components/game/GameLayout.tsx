type GameLayoutType = {
  title: React.ReactNode;
  gameInfo: React.ReactNode;
};

export const GameLayout = ({ title, gameInfo }: GameLayoutType) => {
  return (
    <div className="pb-10">
      <div className="pl-2">
        {title}
        {gameInfo}
      </div>
    </div>
  );
};
