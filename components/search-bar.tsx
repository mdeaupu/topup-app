"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const gameList = [
    { name: "mobile legends", path: "/mobilelegends" },
    { name: "arena breakout", path: "/arenabreakout" },
    { name: "free fire", path: "/freefire" },
  ];

  const filteredGames = gameList.filter((game) =>
    game.name.includes(query.toLowerCase())
  );

  const handleSearch = (gamePath: string) => {
    router.push(gamePath);
    setQuery("");
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Search Input */}
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari game (Mobile Legends, Arena Breakout, Free Fire)..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {query && filteredGames.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-xl bg-white shadow-lg overflow-hidden border border-gray-200">
          {filteredGames.map((game, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center"
              onClick={() => handleSearch(game.path)}
            >
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800 capitalize">
                  {game.name}
                </p>
                <p className="text-xs text-gray-500">
                  Klik untuk membuka halaman
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
