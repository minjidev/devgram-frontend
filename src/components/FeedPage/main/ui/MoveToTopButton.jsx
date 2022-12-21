import React from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

function MoveToTopButton() {
    const content = document.querySelector(".drawer-content");

    const scrollUp = () => {
        content.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button className="btn btn-circle" onClick={scrollUp}>
            <ArrowUpIcon className="w-5 h-5" />
        </button>
    );
}

export default MoveToTopButton;
