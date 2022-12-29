import React, { useState, Fragment } from "react";
import { TableContainer } from "@style";
import ReadOnlyRow from "@components/admin/table/ReadOnlyRow";
import EditableRow from "@components/admin/table/EditableRow";
// category_Seq와 product_Seq를 id로 받아서 사용
function EditableTable({
    currentData,
    columns,
    useEditData,
    useDeleteData,
    title,
}) {
    const [editID, setEditID] = useState(null);
    const handleEditClick = (dataID) => {
        setEditID(dataID);
    };
    console.log("set edit id in editable table: ", editID);

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
                {currentData.map((data) => {
                    const dataID =
                        title === "상품" ? data.product_Seq : data.category_Seq;

                    return (
                        <Fragment key={dataID}>
                            {editID === dataID ? (
                                <EditableRow
                                    data={data}
                                    columns={columns}
                                    handleEditClick={handleEditClick}
                                    useEditData={useEditData}
                                    id={dataID}
                                />
                            ) : (
                                <ReadOnlyRow
                                    data={data}
                                    columns={columns}
                                    handleEditClick={handleEditClick}
                                    useDeleteData={useDeleteData}
                                    id={dataID}
                                />
                            )}
                        </Fragment>
                    );
                })}
            </tbody>
        </TableContainer>
    );
}

export default EditableTable;
