import React from "react";
import { useCategoriesData } from "@hooks/useAdminData";
import Navigation from "./Navigation";
import Drawer from "./Drawer";
import NavigationSub from "./NavigationSub";
import CarouselRanking from "@components/mainpage/main/CarouselRanking";
import ProductsRecent from "@components/mainpage/main/ProductsRecent";
import ProductsBest from "@components/mainpage/main/ProductsBest";
import FeedBest from "@components/mainpage/main/FeedBest";

function MainPageHeader() {
    const API_URL_CAT = "http://localhost:3000/categories";
    const { data, isLoading, error, isSuccess } =
        useCategoriesData(API_URL_CAT);

    // if (isLoading) return <div>Loading...</div>;
    if (error) console.error(error);
    if (isSuccess)
        return (
            <div className="drawer">
                <input
                    id="my-drawer-3"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col overflow-hidden">
                    {/* 네비게이션 */}
                    <Navigation />
                    {/* 메인 콘텐츠 */}
                    <div className="w-full">
                        <NavigationSub />
                        <CarouselRanking />
                        <ProductsRecent />
                        <ProductsBest />
                        <FeedBest />
                    </div>
                </div>
                <Drawer data={data} />
            </div>
        );
}

export default MainPageHeader;
