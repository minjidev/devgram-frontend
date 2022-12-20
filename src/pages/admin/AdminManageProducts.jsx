import React from "react";
import AdminManage from "@components/Admin/AdminManage";
import {
    useProductsData,
    useAddProductData,
    useEditProductData,
    useDeleteProductData,
} from "@hooks/useCategoriesData";

function AdminManageProducts(props) {
    const API_URL_PRODUCT = "http://localhost:3000/product";
    const productColumns = [
        { field: "title", header: "상품명", initialVal: "" },
        { field: "content", header: "상품 설명", initialVal: "" },
        { field: "hits", header: "조회수", initialVal: 0 },
        { field: "rating", header: "별점", initialVal: 0 },
        { field: "like_count", header: "좋아요", initialVal: 0 },
        { field: "price", header: "가격", initialVal: 0 },
    ];
    return (
        <AdminManage
            title={"상품"}
            columns={productColumns}
            useData={() => useProductsData(API_URL_PRODUCT)}
            useAddData={useAddProductData}
            useEditData={useEditProductData}
            useDeleteData={useDeleteProductData}
        />
    );
}

export default AdminManageProducts;
