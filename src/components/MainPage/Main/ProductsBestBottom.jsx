import React from "react";

function ProductsBestBottom({ data }) {
    return (
        <div className="py-6 flex justify-between w-full gap-x-2 overflow-x-auto">
            {data.map((card) => (
                <div
                    key={card.id}
                    className="relative min-w-[120px] bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                    <img
                        className="rounded-lg"
                        src={card.img_url}
                        alt={card.name}
                    />
                    <div className="absolute -top-3 text-xs left-3 w-6 h-6 md:w-9 md:h-9 sm:text-base font-bold bg-gray-600 text-white flex justify-center items-center rounded">
                        {card.id}
                    </div>
                    <div className="p-2">
                        <p className="mb-2 text-md sm:text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
                            {card.name}
                        </p>
                        <span
                            className="text-white text-xs font-medium sm:text-sm mr-2 px-2.5 py-0.5 rounded-full opacity-80"
                            style={{ backgroundColor: `${card.color}` }}
                        >
                            {card.category}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductsBestBottom;
