import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import ProductsCards from "./ui/ProductsCards";
import Loader from "./ui/Loader";
import { useProducts } from "@context/ProductsContext";

function ProductsAll() {
    const { ref: targetRef, inView: visible } = useInView();
    const [page, setPage] = useState(1);
    const [productsData, setProductsData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const products = useProducts();
    const lastPage = Math.ceil(products.length / 8);

    /* prodcuts 로드 */
    const fetchProducts = (page) => {
        setShowLoader(true);
        return axios
            .get(`http://localhost:3000/products?_page=${page}&_limit=10`)
            .then((res) => setProductsData((prev) => [...prev, ...res.data]))
            .catch((error) => console.log(error))
            .finally(setShowLoader(false));
    };

    useEffect(() => {
        if (visible) {
            setPage((prev) => prev + 1);
        }
    }, [visible]);

    useEffect(() => {
        if (page < lastPage) {
            fetchProducts(page);
        }
    }, [page]);

    return (
        <div className="flex flex-col items-center">
            <ProductsCards products={productsData} />
            {showLoader && <Loader />}
            <div className="h-1" ref={targetRef}></div>
        </div>
    );
}

export default ProductsAll;
