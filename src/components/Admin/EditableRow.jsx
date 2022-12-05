import React, { useState } from "react";
import { useEditCategoryData } from "@hooks/useCategoriesData";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

function EditableRow({ editID, onEditClick }) {
    const { mutate } = useEditCategoryData();
    const [editedData, setEditedData] = useState({
        id: 0,
        category: "",
        color: "",
    });

    const getInputData = (e) => {
        const newData = { ...editedData };
        newData[e.target.id] = e.target.value;
        setEditedData(newData);
        console.log(editedData);
    };

    const handleEdit = (e) => {
        mutate({ id: editID, editedData: editedData });
        onEditClick(-1);
    };

    return (
        <tr>
            <td>
                <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    placeholder="카테고리 입력"
                    className="h-10 text-thin text-sm border rounded w-full p-3 mt-2 outfocus:outline-0 focus:outline-gray-300"
                    onChange={(e) => getInputData(e)}
                    value={editedData.category}
                />
            </td>
            <td>
                <input
                    type="text"
                    id="color"
                    name="color"
                    required
                    placeholder="색상 입력"
                    className="h-10 text-thin text-sm border rounded w-full p-3 mt-2 outfocus:outline-0 focus:outline-gray-300"
                    onChange={(e) => getInputData(e)}
                    value={editedData.color}
                />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-squre btn-xs btn-outline"
                    onClick={handleEdit}
                >
                    <CheckIcon className="w-5 h-5" />
                </button>
            </td>
            <td>
                <button type="button" className="btn btn-squre btn-xs">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
}

export default EditableRow;
