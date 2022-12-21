import React from "react";

function Pagination({ totalPosts, itemsPerPage, currentPage, setCurrentPage }) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pt-6">
            {pages.map((page, index) => (
                <button
                    key={index}
                    className={`btn-ghost btn-sm rounded-md mx-1/2 sm:mx-1 ${
                        currentPage === page && "btn-active"
                    }`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
