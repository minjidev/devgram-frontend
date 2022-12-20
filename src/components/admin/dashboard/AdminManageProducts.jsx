import React from "react";
import AdminManage from "@components/admin/dashboard/AdminManage";
import {
    useProductsData,
    useAddProductData,
    useEditProductData,
    useDeleteProductData,
} from "@hooks/useCategoriesData";

function AdminManageProducts(props) {
    const productColumns = [
        { field: "title", header: "상품명", initialVal: "" },
        { field: "content", header: "상품 설명", initialVal: "" },
        {
            field: "img_url",
            header: "상품 사진 url",
            initialVal: "",
            invisible: true,
        },
        { field: "price", header: "가격", initialVal: 0 },
    ];
    return (
        <AdminManage
            title={"상품"}
            columns={productColumns}
            useData={() => useProductsData()}
            useAddData={useAddProductData}
            useEditData={useEditProductData}
            useDeleteData={useDeleteProductData}
        />
    );
}

export default AdminManageProducts;
