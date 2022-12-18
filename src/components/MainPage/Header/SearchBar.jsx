import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBar() {
    return (
        <form className="flex items-center">
            <label htmlFor="product-search" className="sr-only">
                상품 검색
            </label>
            <div className="relative flex items-center">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-2" />
                <input
                    type="text"
                    id="product-search"
                    className="h-12 min-w-120 sm:h-8 bg-gray-100 rounded pl-8"
                    placeholder="검색"
                />
            </div>
        </form>
    );
}

export default SearchBar;
