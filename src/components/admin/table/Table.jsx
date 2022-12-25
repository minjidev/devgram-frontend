import React, { useState } from "react";
import { TableContainer } from "@style";
import SelectStatus from "@components/admin/SelectStatus";
import ReportModal from "@components/admin/ui/ReportModal";
import axios from "axios";

function Table({ currentData, columns, toggledTab }) {
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItems] = useState([]);
    const baseURL = "http://52.194.161.226:8080/api";
    // 신고보기 버튼 클릭 시 해당 리뷰/댓글 관련 신고 내역 표시
    const handleClick = ({ id, toggledTab }) => {
        const API_URL_REPORTED = `${baseURL}/${
            toggledTab === 1
                ? "reviews/accuse/detail"
                : "comments/accuse/detail"
        }`;

        axios
            .get(API_URL_REPORTED, {
                params: {
                    commentSeq: id,
                },
            })
            .then((res) => setModalItems(res.data))
            .catch((err) => console.error(err));
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
                                    currentStatus={data.commentStatus}
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
