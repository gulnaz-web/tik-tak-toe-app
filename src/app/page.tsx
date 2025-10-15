"use client";

import { useState } from "react";
import { Game, Header } from "@/components";
import { GameSettingsModal } from "@/components/game/ui";
import { useGameSettings } from "@/model/useGameSettings";

export default function Home() {
  const { key, gameSettings, handleSettingsSave } = useGameSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />

      <main className="pt-6 mx-auto max-w-[731px]">
        <Game
          key={key}
          playersCount={gameSettings?.playersCount}
          fieldSize={gameSettings?.fieldSize}
        />
      </main>

      <GameSettingsModal
        key={key}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        playersCount={gameSettings?.playersCount}
        fieldSize={gameSettings?.fieldSize}
        onSave={handleSettingsSave}
      />

      <div id="modals" />
    </div>
  );
}
