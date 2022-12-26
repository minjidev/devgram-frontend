import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import ProductsCards from "./ui/ProductsCards";
import Loader from "./ui/Loader";
import { useProducts } from "@context/ProductsContext";

function ProductsAll() {
    const { ref: targetRef, inView: visible } = useInView();
    const [page, setPage] = useState(0);
    const [productsData, setProductsData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    // const [lastPage, setLastPage] = useState(0);
    const products = useProducts();
    const lastPage = Math.ceil(20 / 5);

    /* prodcuts 로드 */
    const fetchProducts = (page) => {
        setShowLoader(true);
        return (
            axios
                .get(
                    `http://52.194.161.226:8080/api/products/list?_page=${page}`
                )
                .then((res) => {
                    console.log("res: ", res);
                    setProductsData((prev) => [...prev, ...res.data]);
                })
                // .then(setLastPage(res.data.length))
                .catch((error) => console.log(error))
                .finally(setShowLoader(false))
        );
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
    console.log("page: ", page);
    console.log("producsData in all : ", productsData);

    return (
        <div className="flex flex-col items-center">
            <ProductsCards products={productsData} />
            {showLoader && <Loader />}
            <div className="h-1 w-1" ref={targetRef}></div>
        </div>
    );
}

export default ProductsAll;
