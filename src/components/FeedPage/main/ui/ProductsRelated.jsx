import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function ProductsRelated({ product }) {
    return (
        <Link to={`/products/${product.id}`}>
            <div className="flex py-3">
                <img
                    src={product.img_url}
                    alt={product.title}
                    className="rounded-lg w-1/3 mr-2"
                />

                <div className="text-sm">
                    <p>{product.title}</p>
                    <p className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {product.hits}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ProductsRelated;
