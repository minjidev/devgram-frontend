import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminManageCategories from "@pages/Admin/AdminManageCategories";
import AdminManageProducts from "@pages/Admin/AdminManageProducts";
import AdminManageReports from "@pages/Admin/AdminManageCategories";

function AdminDashBoard() {
    return (
        <div>
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
