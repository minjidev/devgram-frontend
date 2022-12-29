import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import SelectProductStatus from "../ui/SelectProductStatus";

function ReadOnlyRow({
    data,
    columns,
    handleEditClick,
    useDeleteData,
    id,
    title,
}) {
    const { mutate } = useDeleteData();
    const handleDelete = () => {
        mutate({ id: id });
    };
    return (
        <tr>
            {columns.map(
                (col, index) =>
                    !col.invisible &&
                    (col.field === "status" ? (
                        <td
                            key={index}
                            className="break-word whitespace-normal"
                        >
                            <SelectProductStatus data={data} />
                        </td>
                    ) : (
                        <td
                            key={index}
                            className="break-word whitespace-normal"
                        >
                            {data[col.field]}
                        </td>
                    ))
            )}
            <td>
                <button type="button" onClick={() => handleEditClick(id)}>
                    <PencilSquareIcon className="w-5 h-5 hover:text-gray-500" />
                </button>
            </td>
            {title !== "상품" && (
                <td>
                    <button type="button" onClick={handleDelete}>
                        <TrashIcon className="w-5 h-5 text-error" />
                    </button>
                </td>
            )}
        </tr>
    );
}

export default ReadOnlyRow;
