"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setError(""); // Hapus pesan error saat pengguna mulai mengetik
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // Bersihkan input setelah submit
    } else {
      setError("Harap masukkan kata kunci pencarian.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center rounded-full shadow-md bg-white overflow-hidden border border-gray-300 focus-within:border-blue-500 transition-all duration-300 w-full"
      >
        <div className="pl-4">
          <BiSearch className="text-gray-500 text-xl" />
        </div>
        <input
          type="text"
          placeholder="Cari..."
          value={searchTerm}
          onChange={handleChange}
          className="py-2 px-4 w-full outline-none text-gray-700 placeholder-gray-400"
        />
        {searchTerm.trim() && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-300"
        >
          Cari
        </button>
      </form>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SearchBar;
