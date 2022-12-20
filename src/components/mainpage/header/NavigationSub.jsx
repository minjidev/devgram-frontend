import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function NavigationSub() {
    return (
        <>
            <ul className="hidden sm:flex sm:flex-row items-center h-12 px-10 py-3 lg:px-32">
                <li className="btn btn-xs px-3 btn-ghost text-xs rounded-full">
                    <button>
                        <Link to="/products">PRODUCTS</Link>
                    </button>
                </li>
                <li className="btn btn-xs px-3 btn-ghost text-xs rounded-full">
                    <button>
                        <Link to="/social/feed">FEED</Link>
                    </button>
                </li>
                <li className="ml-auto">
                    <SearchBar />
                </li>
            </ul>
            <hr className="h-px bg-gray-100 border-0 dark:bg-gray-600" />
        </>
    );
}

export default NavigationSub;
