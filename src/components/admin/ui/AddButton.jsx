import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

function AddButton({ setShowModal }) {
    return (
        <>
            <button
                className="hidden sm:block btn cursor-pointer text-white text-base p-3"
                onClick={() => setShowModal(true)}
            >
                <span className="flex items-center justify-between text-xs">
                    추가하기
                    <PlusIcon className="w-4 h-4 ml-1 text-white" />
                </span>
            </button>
            <button
                className="btn btn-square btn-xs sm:hidden"
                onClick={() => setShowModal(true)}
            >
                <PlusIcon className="w-5 h-5" />
            </button>
        </>
    );
}

export default AddButton;
