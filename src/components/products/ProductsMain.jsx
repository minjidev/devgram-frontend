import React from "react";
import { useCategories } from "@context/CategoriesContext";
import ProductTags from "./ui/ProductTags";

function ProductsMain() {
    const categoriesData = useCategories();

    return (
        <div className="px-10 lg:px-32">
            {/* 카테고리 태그 */}
            <ProductTags categories={categoriesData} />
        </div>
    );
}

export default ProductsMain;
