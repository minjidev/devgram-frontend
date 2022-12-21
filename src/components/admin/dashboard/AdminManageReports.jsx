import React, { useState } from "react";
import AdminManage from "@components/admin/dashboard/AdminManage";
import {
    useReportedCommentsData,
    useReportedReivewsData,
} from "@hooks/useCategoriesData";

function AdminManageReports(props) {
    const [toggledTab, setToggledTab] = useState(1);

    const reportCommentsColumns = [
        { field: "id", header: "번호", initialVal: 0 },
        { field: "comment", header: "댓글 내용", initialVal: "" },
        { field: "created_by", header: "댓글 작성자", initialVal: "" },
        { field: "created_at", header: "댓글 작성일", initialVal: "" },
    ];
    const reportReviewsColumns = [
        { field: "id", header: "번호", initialVal: 0 },
        { field: "review", header: "리뷰 내용", initialVal: "" },
        { field: "created_by", header: "리뷰 작성자", initialVal: "" },
        { field: "created_at", header: "리뷰 작성일", initialVal: "" },
    ];

    return (
        <>
            {toggledTab === 1 ? (
                <AdminManage
                    title={"신고"}
                    columns={reportReviewsColumns}
                    useData={() => useReportedReivewsData()}
                    hasAddButton={false}
                    isEditable={false}
                    toggledTab={toggledTab}
                    setToggledTab={setToggledTab}
                />
            ) : (
                <AdminManage
                    title={"신고"}
                    columns={reportCommentsColumns}
                    useData={() => useReportedCommentsData()}
                    hasAddButton={false}
                    isEditable={false}
                    toggledTab={toggledTab}
                    setToggledTab={setToggledTab}
                />
            )}
        </>
    );
}

export default AdminManageReports;
