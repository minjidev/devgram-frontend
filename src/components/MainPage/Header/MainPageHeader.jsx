import React from "react";
import Navigation from "./Navigation";
import Drawer from "./Drawer";
import NavigationSub from "./NavigationSub";
import CarouselRanking from "@components/mainpage/main/CarouselRanking";
import ProductsRecent from "@components/mainpage/main/ProductsRecent";
import ProductsBest from "@components/mainpage/main/ProductsBest";
import FeedBest from "@components/mainpage/main/FeedBest";
import { CategoriesProvider } from "@context/CategoriesContext";
import { ProductsProvider } from "@context/ProductsContext";

function MainPageHeader() {

        return (
        <CategoriesProvider>
          <ProductsProvider>
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
                <Drawer />
            </div>
        </CategoriesProvider>
    </<ProductsProvider>
        );
}

export default MainPageHeader;
