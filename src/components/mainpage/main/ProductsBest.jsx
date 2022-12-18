import React from "react";
import { useProductsBestData } from "@hooks/useMainData";
import ProductsBestTop from "@components/MainPage/Main/ProductsBestTop";
import ProductsBestBottom from "@components/MainPage/Main/ProductsBestBottom";

function ProductsBest() {
    const API_URL_REVIEWS_RECENT = "http://localhost:3000/best";
    const { data, error, isSuccess } = useProductsBestData(
        API_URL_REVIEWS_RECENT
    );

    if (error) return <div>{error}</div>;
    if (isSuccess) {
        const topData = data.slice(0, 3);
        const bottomData = data.slice(3, 8);

        return (
            <div className="flex flex-col py-3 px-10 lg:px-32">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold">BEST 상품</h2>
                </div>
                <div className="hidden sm:block">
                    <ProductsBestTop data={topData} />
                    <ProductsBestBottom data={bottomData} />
                </div>

                <div className="sm:hidden">
                    <ProductsBestTop data={data} />
                </div>
            </div>
        );
    }
}

export default ProductsBest;
