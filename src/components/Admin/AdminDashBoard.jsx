import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminManageCategories from "@pages/Admin/AdminManageCategories";
import AdminManageProducts from "@pages/Admin/AdminManageProducts";
import AdminManageReports from "@pages/Admin/AdminManageReports";

function AdminDashBoard({ open }) {
    console.log("open in dashboard: ", open);
    return (
        <div
            className={`p-3 duration-300 ml-20 ${
                open ? "sm:ml-64" : "sm:ml-20"
            }`}
        >
            <Routes>
                <Route
                    path="/admin/categories"
                    element={<AdminManageCategories />}
                />
                <Route
                    path="/admin/products"
                    element={<AdminManageProducts />}
                />
                <Route path="/admin/reports" element={<AdminManageReports />} />
            </Routes>
        </div>
    );
}

export default AdminDashBoard;
