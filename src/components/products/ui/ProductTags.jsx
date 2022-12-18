import React, { useState } from "react";
import { TagLabel } from "@style";
import { useProducts } from "@context/ProductsContext";
import ProductsCards from "./ProductsCards";
import ProductsAll from "../ProductsAll";

function ProductTags({ categories }) {
    const init = {};
    const [checkedItems, setCheckedItems] = useState(() => {
        categories.map((ctg) => (init[ctg.name] = false));
        return init;
    });
    const productsAll = useProducts();

    // 해당 카테고리에 checked인지 저장
    const checkClicked = (e) => {
        const { name, checked } = e.target;
        setCheckedItems({ ...checkedItems, [name]: checked });
    };

    // 상품의 카테고리가 checked된 카테고리에 해당하면 보여주기
    const categoriesChecked = Object.keys(checkedItems).filter(
        (category) => checkedItems[category]
    );
    const productsFiltered = productsAll.filter((product) =>
        categoriesChecked.includes(product.category)
    );

    return (
        <>
            <ul className="flex justify-center p-5 flex-wrap">
                {categories.map((category) => (
                    <li key={category.id}>
                        <input
                            className="sr-only peer"
                            type="checkbox"
                            value={category.name}
                            name={category.name}
                            id={category.id}
                            onChange={checkClicked}
                        />

                        <TagLabel key={category.id} htmlFor={category.id}>
                            {category.name}
                        </TagLabel>
                    </li>
                ))}
            </ul>
            {categoriesChecked.length ? (
                <ProductsCards products={productsFiltered} />
            ) : (
                <ProductsAll />
            )}
        </>
    );
}

export default ProductTags;
