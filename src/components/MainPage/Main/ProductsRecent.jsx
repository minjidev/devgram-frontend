import React from "react";
import { useNewReviewsData } from "@hooks/useMainData";
import ProductsRecentCards from "./ProductsRecentCards";

function ProductsRecent() {
    const API_URL_REVIEWS_RECENT = "http://localhost:3000/new";
    const { data, error, isSuccess } = useNewReviewsData(
        API_URL_REVIEWS_RECENT
    );

    if (error) return <div>{error}</div>;
    if (isSuccess)
        return (
            <div className="flex flex-col py-3 px-10 lg:px-32">
                <h2 className="text-lg font-bold">NEW 상품</h2>
                <div className="py-3 flex justify-between w-full gap-x-2 overflow-x-auto">
                    {data.map((card) => (
                        <ProductsRecentCards card={card} key={card.id} />
                    ))}
                </div>
            </div>
        );
}

export default ProductsRecent;
