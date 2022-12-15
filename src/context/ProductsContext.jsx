import React, { createContext, useContext } from "react";
import { useProductsData } from "@hooks/useAdminData";

const ProductsContext = createContext();

// productsContext에 접근하는 함수
export function useProducts() {
    return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
    const API_URL_PRODUCTS = "http://localhost:3000/products";
    const {
        data: productsData,
        isLoading,
        error,
    } = useProductsData(API_URL_PRODUCTS);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <ProductsContext.Provider value={productsData}>
            {children}
        </ProductsContext.Provider>
    );
}
