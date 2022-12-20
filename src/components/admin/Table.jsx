import React, { useState, useEffect, useCallback } from "react";
import { TableContainer } from "@style";
import SelectStatus from "./SelectStatus";
import ReportModal from "@components/admin/ReportModal";
import axios from "axios";

function Table({ currentData, columns, toggledTab }) {
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItems] = useState([]);

    const handleClick = ({ id, toggledTab }) => {
        const API_URL_REPORTED = `http://localhost:3000/${
            toggledTab === 1 ? "reviews" : "comments"
        }/${id}`;

        axios
            .get(API_URL_REPORTED)
            .then((res) => setModalItems(res.data))
            .catch((err) => console.err(err));
    };

    return (
        <>
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
                        <tr key={data.id}>
                            {columns.map((col, index) => (
                                <td key={index}>{data[col.field]}</td>
                            ))}
                            <td>
                                <SelectStatus
                                    currentStatus={data.status}
                                    id={data.id}
                                    toggledTab={toggledTab}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => {
                                        setShowModal(true);
                                        handleClick({
                                            id: data.id,
                                            toggledTab: toggledTab,
                                        });
                                    }}
                                >
                                    신고 보기
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableContainer>

            <ReportModal
                visible={showModal}
                modalData={modalItem}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default Table;
