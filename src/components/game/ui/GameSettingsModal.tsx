import clsx from "clsx";
import { useState } from "react";
import { Button, Modal } from "@/ui-components";

type GameSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  playersCount: number | undefined;
  fieldSize: number | undefined;
  onSave: (settings: { playersCount: number; fieldSize: number }) => void;
};

const playerCounts = [2, 3, 4];
const fieldSizes = [3, 5, 10, 19];

export function GameSettingsModal({
  isOpen,
  onClose,
  playersCount: initialPlayersCount,
  fieldSize: initialFieldSize,
  onSave,
}: GameSettingsModalProps) {
  const isLoading = !initialPlayersCount || !initialFieldSize;

  const [playersCount, setPlayersCount] = useState<number | undefined>(
    initialPlayersCount,
  );
  const [fieldSize, setFieldSize] = useState<number | undefined>(
    initialFieldSize,
  );

  const handleSave = () => {
    if (!playersCount || !fieldSize) return;
    onSave({ playersCount, fieldSize });
    onClose();
  };

  const handleClose = () => {
    setPlayersCount(initialPlayersCount);
    setFieldSize(initialFieldSize);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Header>Настройки игры</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-md text-slate-400 mr-auto">
              Количество игроков:
            </div>
            <div className="flex gap-2">
              {isLoading ? (
                <>Загрузка...</>
              ) : (
                playerCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setPlayersCount(count)}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      playersCount === count
                        ? "bg-sky-600 text-white shadow-md"
                        : "bg-sky-100 text-slate-500 hover:bg-sky-600 hover:text-white cursor-pointer",
                    )}
                  >
                    {count}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-md text-slate-400 mr-auto">Размер поля:</div>
            <div className="flex gap-2">
              {isLoading ? (
                <>Загрузка...</>
              ) : (
                fieldSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setFieldSize(size)}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",

                      fieldSize === size
                        ? "bg-sky-600 text-white shadow-md"
                        : "bg-sky-100 text-slate-500 hover:bg-sky-600 hover:text-white cursor-pointer",
                    )}
                  >
                    {size}×{size}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          onClick={handleSave}
          variant="primary"
          size="md"
          className="cursor-pointer"
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
