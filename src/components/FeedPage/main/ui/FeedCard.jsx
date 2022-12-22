import React from "react";
import {
    HeartIcon,
    ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ProductsRelated from "./ProductsRelated";

function FeedCard({ feed }) {
    return (
        <div
            className="w-full bg-white border-gray-200 rounded-lg"
            key={feed.id}
        >
            <Link to={`/social/feed/${feed.id}`}>
                <img
                    className="rounded-t-lg"
                    src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt={feed.title}
                />
            </Link>
            <div className="p-2">
                <h3 className="mb-2 text-xl font-bold tracking-tight text-ellipsis whitespace-nowrap overflow-hidden text-gray-900 dark:text-white">
                    {feed.title}
                </h3>

                {/* 아이콘 */}
                <div className="flex">
                    <p className="flex mb-3 font-normal text-gray-700 items-center mr-2">
                        <span className="mr-1 flex">
                            <HeartIcon className="w-5 h-5" />
                        </span>
                        {feed.like_count}
                    </p>
                    <p className="flex items-center mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <span className="mr-1 flex">
                            <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                        </span>
                        {feed.comments}
                    </p>
                </div>
                {/* 관련 상품 */}
                <div className="w-full">
                    {feed.products.map((product) => (
                        <ProductsRelated product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeedCard;
