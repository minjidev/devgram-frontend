import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    useEditReportedCommentsData,
    useEditReportedReviewsData,
} from "@hooks/useCategoriesData";

function SelectStatus({ currentStatus, id, toggledTab }) {
    const [selected, setSelected] = useState("");

    const [openOptions, setOpenOptions] = useState(false);
    const status = ["등록", "신고", "삭제"];

    const { mutate } =
        toggledTab === 1
            ? useEditReportedReviewsData()
            : useEditReportedCommentsData();
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            mutate({ id: id, status: selected });
        }
    }, [selected]);

    return (
        <>
            <div className="max-w-[150px] font-medium h-10 p-2">
                <div
                    className={`bg-white w-full flex items-center justify-between rounded text-sm ${
                        !selected && "text-gray-700"
                    }`}
                    onClick={() => setOpenOptions(!openOptions)}
                >
                    {selected ? selected : currentStatus}
                    <ChevronDownIcon className="w-4 h-4 mx-2" />
                </div>
                <ul
                    className={`bg-white mt-2 z-10 relative rounded shadow-md border ${
                        openOptions ? "min-h-fit" : "hidden max-h-0"
                    }`}
                >
                    {status.map((st, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSelected(`${st}`);
                                setOpenOptions(false);
                            }}
                            className="p-2 text-sm hover:text-white hover:bg-gray-400 rounded-sm"
                        >
                            {st}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SelectStatus;
