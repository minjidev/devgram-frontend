import React from "react";
import Navigation from "./Navigation";
import Drawer from "./Drawer";
import NavigationSub from "./NavigationSub";
import CarouselRanking from "@components/MainPage/Main/CarouselRanking";
import ProductsMain from "@components/products/ProductsMain";
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
                    <div className="drawer-content flex flex-col">
                        {/* 네비게이션 */}
                        <Navigation />
                        {/* 메인 콘텐츠 */}
                        <div className="w-full">
                            <NavigationSub />
                            {page === "main" && <CarouselRanking />}
                            {page === "products" && <ProductsMain />}
                        </div>
                    </div>
                    <Drawer />
                </div>
            </ProductsProvider>
        </CategoriesProvider>
    );
}

export default MainPageHeader;
