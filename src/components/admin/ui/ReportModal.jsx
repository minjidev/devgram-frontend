import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ModalContainer, TableContainer } from "@style";

function ReportModal({ visible, modalData, onClose }) {
    if (!visible) return null;
    console.log("modalData: ", modalData);

    return (
        <ModalContainer>
            <div className="sm:max-w-fit-content min-h-1/4 bg-white p-2 rounded-[5px] flex flex-col">
                <button
                    className="place-self-end p-1"
                    onClick={() => onClose()}
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>

                <TableContainer className="table-auto">
                    <thead>
                        <tr>
                            <th>신고자</th>
                            <th>신고 내용</th>
                            <th>신고 일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modalData.map((report) => (
                            <tr>
                                <td>{report.createdBy}</td>
                                <td>{report.accuseReason}</td>
                                <td>{report.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </TableContainer>
            </div>
        </ModalContainer>
    );
}

export default ReportModal;
