import React from "react";
import { Link } from "react-router-dom";

function ProductsRecentCards({ card }) {
    return (
        <div className="min-w-[200px] sm:min-w-0 sm:w-full rounded overflow-hidden shadow-lg grow shrink basis-auto">
            <Link to={`products/detail/${card.product_Seq}`} className="block">
                <img
                    className="w-full"
                    src={
                        card.img_url ||
                        "https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-46591.jpg?w=2000&t=st=1672071766~exp=1672072366~hmac=abdc1e04eab04e697ebbcaf788683283f9e122f124ed23f9e1f040add41e0da5"
                    }
                    alt={card.title}
                />
                <div className="px-3 py-4">
                    <p className="text-sm font-bold md:text-lg mb-2 text-ellipsis overflow-hidden">
                        {card.title}
                    </p>
                    <p className="text-xs text-gray-700 md:text-base text-ellipsis overflow-hidden">
                        {card.content}
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default ProductsRecentCards;
