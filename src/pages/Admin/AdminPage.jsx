import React from "react";
import AdminSidebar from "@components/AdminSidebar";
import AdminDashboard from "@components/AdminDashBoard";
import { useState } from "react";

function AdminPage(props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex overflow-x-hidden">
            <AdminSidebar open={open} setOpen={setOpen} />
            <div className="p-7 text-2xl font-semibold flex-1 h-full">
                <AdminDashboard open={open} />
            </div>
        </div>
    );
}

export default AdminPage;
