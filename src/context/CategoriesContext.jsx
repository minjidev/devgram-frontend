import React, { createContext, useContext } from "react";
// import { useCategoriesData } from "@hooks/useAdminData";
import { useCategoriesData } from "@hooks/useCategoriesData";
import Loader from "@components/products/ui/Loader";

const CategoriesContext = createContext();

// categoriesContext에 접근하는 함수
export function useCategories() {
    return useContext(CategoriesContext);
}

export function CategoriesProvider({ children }) {
    const { data: categoriesData, isLoading, error } = useCategoriesData();
    if (isLoading)
        return (
            <div className="flex justify-center">
                <Loader />
            </div>
        );
    if (error) return <div>{error}</div>;

    return (
        <CategoriesContext.Provider value={categoriesData}>
            {children}
        </CategoriesContext.Provider>
    );
}
