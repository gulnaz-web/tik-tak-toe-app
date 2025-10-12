import Image, { StaticImageData } from "next/image";
import avatarSrc from "@/mock/players/images/avatarHacker.png";
import clsx from "clsx";

type ProfileType = {
  name: string;
  rating: number;
  className?: string;
  avatar?: StaticImageData;
};

export const Profile = ({
  className,
  name,
  rating,
  avatar = avatarSrc,
}: ProfileType) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 text-start text-sky-600",
        className,
      )}
    >
      <Image src={avatar} width={48} height={48} alt="avatar" unoptimized />
      <div className="overflow-hidden">
        <div className=" text-lg leading-tight truncate ">{name}</div>
        <div className="text-slate-400 text-xs leading-tight">
          Рейтинг: {rating}
        </div>
      </div>
    </div>
  );
};
