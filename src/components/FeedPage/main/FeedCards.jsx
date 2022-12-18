import React from "react";
import { useFeedData } from "@hooks/useFeedData";
import {
    HeartIcon,
    ChatBubbleBottomCenterTextIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function FeedCards() {
    const API_URL_FEED = "http://localhost:3000/feed";
    const {
        data: feedData,
        isSuccess,
        isError,
        error,
    } = useFeedData(API_URL_FEED);

    if (isError) return <div>{error}</div>;

    if (isSuccess)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-10 p-10">
                {feedData.map((feed) => (
                    <div
                        key={feed.id}
                        className="w-full bg-white border-gray-200 rounded-lg"
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
                                    <div key={product.id} className="flex py-3">
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
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
}

export default FeedCards;
