import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

function ReadOnlyRow({ data, onEditClick }) {
    return (
        <tr key={data.id}>
            <td>{data.name}</td>
            <td>{data.color}</td>
            <td>
                <button type="button" onClick={() => onEditClick(data)}>
                    <PencilSquareIcon className="w-5 h-5 hover:text-gray-500" />
                </button>
            </td>
            <td>
                <button>
                    <TrashIcon className="w-5 h-5 text-error" />
                </button>
            </td>
        </tr>
    );
}

export default ReadOnlyRow;
