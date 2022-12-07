import React from "react";
import AdminManage from "@components/Admin/AdminManage";
import { useReportedCommentsData } from "@hooks/useCategoriesData";

function AdminManageReports(props) {
    const API_URL_REPORT = "http://localhost:3000/report";
    const reportColumns = [
        { field: "comment", header: "댓글 내용", initialVal: "" },
        { field: "created_by", header: "신고자", initialVal: "" },
        { field: "content", header: "신고 내용", initialVal: "" },
        { field: "created_at", header: "신고 일자", initialVal: "" },
    ];
    return (
        <AdminManage
            title={"신고"}
            columns={reportColumns}
            useData={() => useReportedCommentsData(API_URL_REPORT)}
            hasAddButton={false}
            isEditable={false}
        />
    );
}

export default AdminManageReports;
