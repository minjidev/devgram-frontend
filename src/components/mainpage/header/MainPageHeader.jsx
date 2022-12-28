import React from "react";
import Navigation from "./Navigation";
import Drawer from "./Drawer";
import NavigationSub from "@components/mainpage/header/NavigationSub";
import CarouselRanking from "@components/mainpage/main/CarouselRanking";
import ProductsRecent from "@components/mainpage/main/ProductsRecent";
import ProductsBest from "@components/mainpage/main/ProductsBest";
import FeedBest from "@components/mainpage/main/FeedBest";
import ProductsMain from "@components/products/ProductsMain";
import FeedMain from "@components/FeedPage/main/FeedMain";
import { CategoriesProvider } from "@context/CategoriesContext";
import { ProductsProvider } from "@context/ProductsContext";

function MainPageHeader({ page }) {
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
                        <NavigationSub />
                        {/* 메인 콘텐츠 */}
                        <div className="w-full">
                            {page === "main" && (
                                <>
                                    <CarouselRanking />
                                    <ProductsRecent />
                                    <ProductsBest />
                                    <FeedBest />
                                </>
                            )}
                            {page === "products" && <ProductsMain />}
                            {page === "feed" && <FeedMain />}
                        </div>
                    </div>
                    <Drawer />
                </div>
            </ProductsProvider>
        </CategoriesProvider>
    );
}

export default MainPageHeader;
