import React from "react";
import AdminSidebar from "@components/admin/AdminSidebar";
import AdminDashboard from "@components/admin/dashboard/AdminDashBoard";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

function AdminPage(props) {
    const [open, setOpen] = useState(false);
    const user = useAuth();
    console.log("user: ", user);
    return (
        <div className="flex">
            <AdminSidebar open={open} setOpen={setOpen} />
            <div className="p-7 text-2xl font-semibold flex-1 h-full w-full">
                <AdminDashboard open={open} />
            </div>
        </div>
    );
}

export default AdminPage;
