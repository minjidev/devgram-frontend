import React from "react";

function Pagination({ totalPosts, itemsPerPage, setCurrentPage }) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="btn-group">
            {pages.map((page, index) => (
                <button
                    key={index}
                    className="btn btn-sm btn-outline"
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
