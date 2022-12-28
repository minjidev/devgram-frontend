import React, { useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TextInput } from "@style";

function EditableRow({ data, columns, handleEditClick, useEditData, id }) {
    // console.log("data in editable row: ", data);

    const { mutate } = useEditData();
    const init = {};
    const [editedData, setEditedData] = useState(() => {
        columns.forEach((col) => (init[col.field] = data[col.field]));
        return init;
    });

    const getInputData = (e) => {
        const newData = { ...editedData };
        newData[e.target.id] = e.target.value;
        setEditedData(newData);
    };

    const handleEdit = () => {
        mutate({
            id: id,
            editedData: editedData,
            cateogory_Seq: data.cateogory_Seq,
        });
        handleEditClick(-1);
    };

    const handleCancel = () => {
        handleEditClick(-1);
    };

    return (
        <tr>
            {columns.map(
                (col, index) =>
                    !col.invisible && (
                        <td key={index}>
                            <TextInput
                                type="text"
                                id={col.field}
                                name={col.field}
                                placeholder={`${col.header} 입력`}
                                onChange={(e) => getInputData(e)}
                                value={editedData[col.field]}
                                className="break-word whitespace-normal"
                            />
                        </td>
                    )
            )}
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
                <button
                    type="button"
                    className="btn btn-squre btn-xs"
                    onClick={handleCancel}
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
}

export default EditableRow;
