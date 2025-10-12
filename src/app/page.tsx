import { Game, Header } from "@/components";

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      <main className="pt-6 mx-auto max-w-[616px]">
        <Game />
      </main>
    </div>
  );
}
