import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminManageCategories from "@components/admin/dashboard/AdminManageCategories";
import AdminManageProducts from "@components/admin/dashboard/AdminManageProducts";
import AdminManageReports from "@components/admin/dashboard/AdminManageReports";
import { CategoriesProvider } from "@context/CategoriesContext";

function AdminDashBoard({ open }) {
    return (
        <div
            className={`p-3 duration-300 ml-20 ${
                open ? "sm:ml-64" : "sm:ml-20"
            }`}
        >
            <CategoriesProvider>
                <Routes>
                    <Route path="/" element={<AdminManageCategories />} />
                    <Route
                        path="/categories"
                        element={<AdminManageCategories />}
                    />
                    <Route path="/products" element={<AdminManageProducts />} />
                    <Route path="/reports" element={<AdminManageReports />} />
                </Routes>
            </CategoriesProvider>
        </div>
    );
}

export default AdminDashBoard;
