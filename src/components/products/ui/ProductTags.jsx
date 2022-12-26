import React, { useState, useEffect } from "react";
import { TagLabel } from "@style";
import { useProducts } from "@context/ProductsContext";
import ProductsCards from "./ProductsCards";
import ProductsAll from "../ProductsAll";

function ProductTags({ categories }) {
    // 클릭한 카테고리(카테고리명)에 해당하는 상품(카테고리 id -> 카테고리 이름)만 보여주기
    const init = {};
    // 카테고리 id 각각 false로 기본 상태 지정
    const [checkedItems, setCheckedItems] = useState(() => {
        categories.forEach((ctg) => (init[ctg.category_Seq] = false));
        return init;
    });
    const [categoriesChecked, setCategoriesChecked] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const productsAll = useProducts();

    // 해당 카테고리 id가 checked인지 저장
    const checkClicked = (e) => {
        const { id, checked } = e.target;
        setCheckedItems({ ...checkedItems, [id]: checked });
    };
    // 카테고리 선택하면 선택된 카테고리 업데이트
    useEffect(() => {
        setCategoriesChecked(() =>
            Object.keys(checkedItems).filter(
                (category) => checkedItems[category]
            )
        );
    }, [checkedItems]);
    // 카테고리 업데이트 시 해당 카테고리 상품 필터링
    useEffect(() => {
        setProductsFiltered(() =>
            productsAll.filter((product) => {
                return Number(categoriesChecked) === product.category_Seq;
            })
        );
    }, [categoriesChecked]);

    return (
        <>
            <ul className="flex justify-center p-5 flex-wrap">
                {categories.map((category) => (
                    <li key={category.category_Seq}>
                        <input
                            className="sr-only peer"
                            type="checkbox"
                            value={category.name}
                            name={category.name}
                            id={category.category_Seq}
                            onChange={checkClicked}
                        />

                        <TagLabel
                            key={category.category_Seq}
                            htmlFor={category.category_Seq}
                        >
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
