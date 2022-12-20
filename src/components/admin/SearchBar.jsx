import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchInput } from "@style";

function SearchBar({ setQuery }) {
    return (
        <div className="relative w-full mr-6 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 absolute ml-3 pointer-events-none" />
            <SearchInput
                type="search"
                placeholder="검색"
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
