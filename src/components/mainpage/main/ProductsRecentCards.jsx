import React from "react";
import { Link } from "react-router-dom";

function ProductsRecentCards({ card }) {
    return (
        <div className="min-w-[200px] sm:min-w-0 sm:w-full rounded overflow-hidden shadow-lg grow shrink basis-auto">
            <Link to={`products/${card.id}`} className="block">
                <img className="w-full" src={card.img_url} alt={card.title} />
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
