import React from "react";
import { TableContainer } from "@style";
import SelectStatus from "./SelectStatus";

function Table({ currentData, columns }) {
    return (
        <TableContainer>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map((data) => (
                    <tr key={data.id}>
                        {columns.map((col, index) => (
                            <td key={index}>{data[col.field]}</td>
                        ))}
                        <td>
                            <SelectStatus />
                        </td>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
}

export default Table;
