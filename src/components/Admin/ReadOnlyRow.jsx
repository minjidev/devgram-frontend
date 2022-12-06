import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDeletecategoryData } from "@hooks/useCategoriesData";

function ReadOnlyRow({ data, columns, handleEditClick }) {
    const { mutate } = useDeletecategoryData();
    const handleDelete = (id) => {
        mutate({ id: id });
    };
    return (
        <tr key={data.id}>
            {/* <td>{data.name}</td>
            <td>{data.color}</td> */}
            {columns.map((col, index) => (
                <td key={index}>{data[col.field]}</td>
            ))}
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
