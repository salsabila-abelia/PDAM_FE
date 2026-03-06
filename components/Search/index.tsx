"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

type Props = {
  search: string;
};

const Search = ({ search }: Props) => {
  const [keyword, setKeyword] = useState<string>(search);
  const router = useRouter();

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const params = new URLSearchParams(window.location.search);
      if (keyword.trim()) {
        params.set("search", keyword);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="w-full relative">
      <input
        id="keyword"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="keyword or search"
        onKeyUp={(event) => handleSearch(event)}
        className="w-full rounded-xl border border-white/40 bg-white/80 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
      />
    </div>
  );
};

export default Search;