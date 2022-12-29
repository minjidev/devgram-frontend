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
                ? `review/accuse/detail/admin?reviewSeq=${id}`
                : `comments/accuse/detail/admin?commentSeq=${id}`
        }`;

        axios
            .get(API_URL_REPORTED)
            .then((res) => {
                console.log("url: ", API_URL_REPORTED);
                console.log("res: ", res);
                setModalItems(res.data);
            })
            .catch((err) => console.error(err));
    };
    console.log("curre: ", currentData);
    console.log("detail: ", modalItem);

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
                {toggledTab === 2 ? (
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
                                        toggledTab={toggledTab}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() => {
                                            setShowModal(true);
                                            handleClick({
                                                id: data.commentSeq,
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
                ) : (
                    <tbody>
                        {currentData.map((data) => (
                            <tr key={data.reviewSeq}>
                                {columns.map((col, index) => (
                                    <td key={index}>{data[col.field]}</td>
                                ))}
                                <td>
                                    <SelectStatus
                                        currentStatus={data.status}
                                        id={data.reviewSeq}
                                        toggledTab={toggledTab}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() => {
                                            setShowModal(true);
                                            handleClick({
                                                id: data.reviewSeq,
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
                )}
            </TableContainer>

            <ReportModal
                visible={showModal}
                modalData={modalItem}
                onClose={() => setShowModal(false)}
                toggledTab={toggledTab}
            />
        </>
    );
}

export default Table;
