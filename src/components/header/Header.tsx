import Image from "next/image";
import Logo from "./logo.png";
import { Profile } from "@/components";
import { Button } from "@/ui-components";
import { ArrowIcon } from "@/icon-components";

export const Header = () => {
  return (
    <header className="flex h-24 items-center px-8 bg-white shadow-lg">
      <div className="flex items-center text-start text-gray-600">
        <Image src={Logo} alt="logo" />
        <span className="ml-4">Tic-Tac-Toe game</span>
        <div className="w-px h-8 bg-slate-200 mx-4" />
        <Button className="w-44 cursor-pointer" variant="primary" size="md">
          Играть
        </Button>
      </div>

      <div className="ml-auto flex items-center gap-2 text-start text-sky-600 ">
        <Profile name="Hacker" rating={1230} />
        <ArrowIcon />
      </div>
    </header>
  );
};
