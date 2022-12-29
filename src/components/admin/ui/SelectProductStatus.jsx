import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { useEditProductsStatusData } from "@hooks/useCategoriesData";

function SelectProductStatus({ data }) {
    const [selected, setSelected] = useState("");
    const isInitialMount = useRef(true);

    const [openOptions, setOpenOptions] = useState(false);
    const status = ["CHECK", "ACCUSE", "REJECT"];

    const { mutate } = useEditProductsStatusData();
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            mutate({
                data: data,
                status: selected,
            });
        }
    }, [selected]);
    console.log("checked: ", selected);
    return (
        <div className="max-w-[150px] font-medium h-10 p-2">
            <div
                className={`bg-white w-full flex items-center justify-between rounded text-sm ${
                    !selected && "text-gray-700"
                }`}
                onClick={() => setOpenOptions(!openOptions)}
            >
                {selected ? selected : data.status}
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
    );
}

export default SelectProductStatus;
