import React, { useState } from "react";
import { TableContainer } from "@style";
import SelectStatus from "@components/admin/SelectStatus";
import ReportModal from "@components/admin/ui/ReportModal";
import axios from "axios";

import React from "react";

function TableProduct({ currentData, columns }) {
    return (
        <TableContainer>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                    <th>상태</th>
                    <th>신고 보기</th>
                </tr>
            </thead>

            <tbody>
                {currentData.map((data) => (
                    <tr key={data.commentSeq}>
                        {columns.map((col, index) => (
                            <td key={index}>{data[col.field]}</td>
                        ))}
                        <td>
                            <SelectStatus
                                currentStatus={data.commentStatus}
                                id={data.commentSeq}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
}

export default TableProduct;
