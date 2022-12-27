import React, { useState } from "react";
import { useAddProductData } from "@hooks/useCategoriesData";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddModal from "@components/admin/ui/AddModal";

function ProductAddButton(props) {
    const [showModal, setShowModal] = useState(false);
    const productColumns = [
        { field: "title", header: "상품명", initialVal: "" },
        {
            field: "category_Seq",
            header: "카테고리",
            initialVal: "카테고리 선택",
        },
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
        <>
            <button
                className="btn btn-circle fixed bottom-10 right-14 "
                onClick={() => setShowModal(true)}
            >
                <PlusIcon className="w-6 h-6" />
            </button>
            <AddModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                columns={productColumns}
                useAddData={useAddProductData}
            />
        </>
    );
}

export default ProductAddButton;
