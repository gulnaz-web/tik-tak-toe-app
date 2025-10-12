type GameLayoutType = {
  title: React.ReactNode;
  gameInfo: React.ReactNode;
  gameMoveInfo: React.ReactNode;
  actions: React.ReactNode;
  children: React.ReactNode;
};

export const GameLayout = ({
  title,
  gameInfo,
  gameMoveInfo,
  actions,
  children,
}: GameLayoutType) => {
  return (
    <div className="pb-10">
      <div className="pl-2 flex flex-col gap-4">
        {title}
        {gameInfo}
      </div>

      <div className="bg-white rounded-2xl shadow-md px-8 pt-5 pb-7 mt-6">
        <div className="flex gap-3 items-center">
          <div className="mr-auto">{gameMoveInfo}</div>
          {actions}
        </div>
        {children}
      </div>
    </div>
  );
};
