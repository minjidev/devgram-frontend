import React from "react";
import { useCategories } from "@context/CategoriesContext";
import ProductTags from "./ui/ProductTags";

function ProductsMain() {
    const categoriesData = useCategories();

    return (
        <div className="px-10 lg:px-32">
            <ProductTags categories={categoriesData} />
        </div>
    );
}

export default ProductsMain;
