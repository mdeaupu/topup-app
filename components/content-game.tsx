import React from "react";
import Image from "next/image";
import Link from "next/link";

interface GameItemProps {
  name: string;
  imageUrl: string;
  topupUrl: string;
}

const GameItem: React.FC<GameItemProps> = ({ name, imageUrl, topupUrl }) => {
  return (
    <Link
      href={topupUrl}
      className="block rounded-lg shadow-2xl hover:shadow-lg transition duration-300"
    >
      <div className="relative w-32 h-20 md:w-48 md:h-30 lg:w-64 lg:h-40 overflow-hidden rounded-t-lg mx-auto mt-6">
        {" "}
        {/* Ubah nilai h */}
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4 text-center bg-[#5b6c8f] rounded-b-lg">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
    </Link>
  );
};

interface ContentProps {
  games: {
    name: string;
    imageUrl: string;
    topupUrl: string;
  }[];
}

const ContentGame: React.FC<ContentProps> = ({ games }) => {
  return (
    <div className="bg-[#333330] py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          {games.map((game, index) => (
            <GameItem
              key={index}
              name={game.name}
              imageUrl={game.imageUrl}
              topupUrl={game.topupUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentGame;
