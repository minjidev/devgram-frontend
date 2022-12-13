import React, { useState } from "react";
import { useNewReviewsData } from "@hooks/useMainData";
import ReviewRecentCard from "@components/MainPage/Main/ReviewRecentCard";

function ReviewsRecent(props) {
    const API_URL_REVIEWS_RECENT = "http://localhost:3000/new";
    const { data, isLoading, error } = useNewReviewsData(
        API_URL_REVIEWS_RECENT
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col py-3 px-10 lg:px-32">
            <h2 className="text-lg font-bold">NEW 리뷰</h2>
            <div className="py-3 flex justify-between w-full gap-x-2 overflow-x-auto">
                {data.map((card) => (
                    <ReviewRecentCard card={card} key={card.id} />
                ))}
            </div>
        </div>
    );
}

export default ReviewsRecent;
