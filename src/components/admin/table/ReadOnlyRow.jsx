import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

function ReadOnlyRow({ data, columns, handleEditClick, useDeleteData }) {
    const { mutate } = useDeleteData();
    const handleDelete = (id) => {
        mutate({ id: id });
    };

    return (
        <tr>
            {columns.map(
                (col, index) =>
                    !col.invisible && (
                        <td
                            key={index}
                            className="break-word whitespace-normal"
                        >
                            {data[col.field]}
                        </td>
                    )
            )}
            <td>
                <button type="button" onClick={() => handleEditClick(data)}>
                    <PencilSquareIcon className="w-5 h-5 hover:text-gray-500" />
                </button>
            </td>
            <td>
                <button type="button" onClick={() => handleDelete(data.id)}>
                    <TrashIcon className="w-5 h-5 text-error" />
                </button>
            </td>
        </tr>
    );
}

export default ReadOnlyRow;
