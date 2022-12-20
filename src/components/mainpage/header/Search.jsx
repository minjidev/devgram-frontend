import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Search() {
    return (
        <div className="flex items-center justify-center p-5 w-full">
            <SearchBar />
            <button className="btn btn-active ml-3">
                <Link to="/home">취소</Link>
            </button>
        </div>
    );
}

export default Search;
