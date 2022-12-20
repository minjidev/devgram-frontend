import React, { useState, Fragment } from "react";
import { TableContainer } from "@style";
import ReadOnlyRow from "@components/admin/table/ReadOnlyRow";
import EditableRow from "@components/admin/table/EditableRow";

function EditableTable({ currentData, columns, useEditData, useDeleteData }) {
    const [editID, setEditID] = useState(null);
    const handleEditClick = (data) => {
        setEditID(data.id);
    };

    return (
        <TableContainer>
            <thead>
                <tr>
                    {columns.map(
                        (col, index) =>
                            !col.invisible && <th key={index}>{col.header}</th>
                    )}
                    <th>수정</th>
                    <th>{editID > 0 ? "취소" : "삭제"}</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map((data) => (
                    <Fragment key={data.id}>
                        {editID === data.id ? (
                            <EditableRow
                                data={data}
                                columns={columns}
                                handleEditClick={handleEditClick}
                                useEditData={useEditData}
                            />
                        ) : (
                            <ReadOnlyRow
                                data={data}
                                columns={columns}
                                handleEditClick={handleEditClick}
                                useDeleteData={useDeleteData}
                            />
                        )}
                    </Fragment>
                ))}
            </tbody>
        </TableContainer>
    );
}

export default EditableTable;
