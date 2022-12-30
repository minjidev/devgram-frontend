import React from "react";
import { Link } from "react-router-dom";

function ProductsBestBottom({ data }) {
    return (
        <div className="py-6 flex justify-between w-full gap-x-2 overflow-x-auto">
            {data.map((card, index) => (
                <div
                    key={card.product_Seq}
                    className="relative min-w-[120px] bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                    <Link to={`products/detail/${card.product_Seq}`}>
                        <img
                            className="rounded-lg"
                            src={
                                card.img_url ||
                                "https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_1280.jpg"
                            }
                            alt={card.title}
                        />
                    </Link>
                    <div className="absolute -top-3 text-xs left-3 w-6 h-6 md:w-9 md:h-9 sm:text-base font-bold bg-gray-600 text-white flex justify-center items-center rounded">
                        {index + 4}
                    </div>
                    <div className="p-2">
                        <p className="mb-2 text-md sm:text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                            {card.title}
                        </p>
                        <span
                            className="text-black text-xs font-bold sm:text-sm mr-2 px-2.5 py-0.5 rounded-full opacity-80"
                            style={{ backgroundColor: `${card.categoryColor}` }}
                        >
                            {card.categoryName}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductsBestBottom;
