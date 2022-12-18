import React from "react";
import { useFeedData } from "@hooks/useFeedData";
import FeedCard from "./ui/FeedCard";

function FeedCards({ selectedTag, selectedSubTags }) {
    const API_URL_FEED = "http://localhost:3000/feed";
    const {
        data: feedData,
        isSuccess,
        isError,
        error,
    } = useFeedData(API_URL_FEED, selectedTag, selectedSubTags) || [];

    if (isError) return <div>{error}</div>;

    if (isSuccess)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-10 p-10">
                {feedData.map((feed) => (
                    <FeedCard feed={feed} key={feed.id} />
                ))}
            </div>
        );
}

export default FeedCards;
