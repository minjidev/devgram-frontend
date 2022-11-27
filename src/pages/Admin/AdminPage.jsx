import React from "react";
import AdminSidebar from "@components/AdminSidebar";
import AdminDashboard from "@components/AdminDashBoard";

function AdminPage(props) {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="p-7 text-2xl font-semibold flex-1 h-screen">
                <AdminDashboard />
            </div>
        </div>
    );
}

export default AdminPage;
