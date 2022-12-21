import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function FeedAddButton(props) {
    return (
        <Link to="/social/feed/write">
            <button className="btn btn-circle ">
                <PlusIcon className="w-6 h-6" />
            </button>
        </Link>
    );
}

export default FeedAddButton;
