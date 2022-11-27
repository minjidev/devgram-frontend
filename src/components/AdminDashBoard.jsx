import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminManageCategories from "../views/AdminManageCategories";
import AdminManageProducts from "../views/AdminManageProducts";
import AdminManageReports from "../views/AdminManageCategories";

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
