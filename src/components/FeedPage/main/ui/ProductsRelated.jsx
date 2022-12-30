import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function ProductsRelated({ product }) {
    return (
        <Link to={`/products/detail/${product.id}`}>
            <div className="flex py-3">
                <img
                    src={
                        product.img_url ||
                        "https://img.freepik.com/free-photo/brown-white-basenji-dog-with-eyes-open-wide-wearing-large-black-wireless-headset-close-up-shot-isolated-white_346278-1667.jpg?w=2000&t=st=1672077704~exp=1672078304~hmac=065c8940cdadd1b8c794b9b9d847b51dbca46a5f45fe888ae278374bd94ff27a"
                    }
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
