import React, { createContext, useContext } from "react";
// import { useProductsData } from "@hooks/useAdminData";
import { useProductsDataAll } from "@hooks/useCategoriesData";
import Loader from "@components/products/ui/Loader";

const ProductsContext = createContext();

// productsContext에 접근하는 함수
export function useProducts() {
    return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
    const { data: productsData, isLoading, error } = useProductsDataAll();
    if (isLoading)
        return (
            <div className="flex justify-center">
                <Loader />
            </div>
        );
    if (error) return <div>{error}</div>;
    return (
        <ProductsContext.Provider value={productsData}>
            {children}
        </ProductsContext.Provider>
    );
}
